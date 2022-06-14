const { RuleTester } = require('eslint');

// Browser that doesn't support any features of this version - see es-versions.md
process.env.BROWSERSLIST = 'Chrome >= 65';
jest.resetModules();

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module', // import.meta and namespace exports can only be used in an ES module
  },
  globals: {
    // ES2021 global, required by es/no-weakrefs
    WeakRef: 'readonly',
    FinalizationRegistry: 'readonly',
    // ES6 global, required by es/no-promise-all-settled
    Promise: 'readonly',
  },
});

ruleTester.run('compat', require('../rule'), {
  valid: [
    {
      code: 'const replaceAll = obj.replaceAll; ',
    },
    {
      code: 'obj.replaceAll = function(){}; ',
    },
  ],
  invalid: [
    {
      code: '"A dog".replaceAll("dog", "monkey") ',
      errors: [{ message: "ES2021 method 'String.prototype.replaceAll' is forbidden" }],
    },
    {
      code: 'const a = b ||= "something"; ',
      errors: [{ message: 'ES2021 logical assignment operators are forbidden.' }],
    },
    {
      code: 'const a = b &&= "something"; ',
      errors: [{ message: 'ES2021 logical assignment operators are forbidden.' }],
    },
    {
      code: 'const a = b ??= "something"; ',
      errors: [{ message: 'ES2021 logical assignment operators are forbidden.' }],
    },
    {
      code: 'const a = 1_000_00; ',
      errors: [{ message: 'ES2021 numeric separators are forbidden.' }],
    },
    {
      code: 'const a = Promise.any(["Primise1", "Promise2"]);',
      errors: [{ message: "ES2021 'Promise.any' is forbidden." }],
    },
    {
      code: 'const a = new WeakRef();',
      errors: [{ message: "ES2021 'WeakRef' class is forbidden." }],
    },
    {
      code: 'const a = new FinalizationRegistry(() => {});',
      errors: [{ message: "ES2021 'FinalizationRegistry' class is forbidden." }],
    },
  ],
});
