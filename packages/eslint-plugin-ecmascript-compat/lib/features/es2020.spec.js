const { RuleTester } = require('eslint');

// Browser that doesn't support any features of this version - see es-versions.md
process.env.BROWSERSLIST = 'Chrome >= 62';
jest.resetModules();

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    // ES2020 global, required by es/no-bigint
    BigInt: 'readonly',

    // ES6 global, required by es/no-promise-all-settled
    Promise: 'readonly',
  },
});

ruleTester.run('compat', require('../rule'), {
  valid: [],
  invalid: [
    {
      code: 'const foo = 100n;',
      errors: [{ message: 'ES2020 BigInt is forbidden.' }],
    },
    {
      code: 'BigInt(100);',
      errors: [{ message: 'ES2020 BigInt is forbidden.' }],
    },
    {
      code: "async function foo() { await import(''); }",
      errors: [{ message: "ES2020 'import()' syntax is forbidden." }],
    },
    {
      code: 'globalThis.foo;',
      errors: [
        {
          message:
            "Unexpected use of 'globalThis'. ES2020 global 'globalThis' is forbidden",
        },
      ],
    },
    {
      code: 'Promise.allSettled();',
      errors: [{ message: "ES2020 'Promise.allSettled' function is forbidden." }],
    },
    {
      code: 'foo.matchAll();',
      errors: [{ message: "ES2020 method 'String.prototype.matchAll' is forbidden" }],
    },
    {
      code: 'String.prototype.matchAll;',
      errors: [{ message: "ES2020 method 'String.prototype.matchAll' is forbidden" }],
    },
  ],
});
