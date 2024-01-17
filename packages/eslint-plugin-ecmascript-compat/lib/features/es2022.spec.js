const { RuleTester } = require('eslint');

// Browser that doesn't support any features of this version - see es-versions.md
process.env.BROWSERSLIST = 'Chrome >= 71';
jest.resetModules();

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module', // top level await can only be used in an ES module
  },
});

ruleTester.run('compat', require('../rule'), {
  valid: [
    {
      code: '[].at(1);',
      options: [{ polyfills: ['{Array,String,TypedArray}.prototype.at'] }],
    },
    {
      code: '"Foo".at(1);',
      options: [{ polyfills: ['{Array,String,TypedArray}.prototype.at'] }],
    },
    {
      code: "new Error('message', { cause: originalError })",
      options: [{ polyfills: ['Error.cause'] }],
    },
    {
      code: "Object.hasOwn(obj, 'prop');",
      options: [{ polyfills: ['Object.hasOwn'] }],
    },
  ],
  invalid: [
    {
      // Obvious array, doesn't need aggressive mode
      code: '[].at(1);',
      errors: [{ message: "ES2022 'Array.prototype.at' method is forbidden." }],
    },
    {
      // Obvious string, doesn't need aggressive mode
      code: '"Foo".at(1);',
      errors: [{ message: "ES2022 'String.prototype.at' method is forbidden." }],
    },
    {
      // Not obvious, needs aggressive mode
      code: 'foo.at(1);',
      errors: [{ message: "ES2022 'Array.prototype.at' method is forbidden." }],
    },
    {
      code: 'class A { #a = 0 }',
      errors: [{ message: 'ES2022 private field #a is forbidden.' }],
    },
    {
      code: 'class A { static { } }',
      errors: [{ message: 'ES2022 class static block is forbidden.' }],
    },
    {
      code: "new Error('message', { cause: originalError })",
      errors: [{ message: 'ES2022 Error Cause is forbidden.' }],
    },
    {
      code: "Object.hasOwn(obj, 'prop');",
      errors: [{ message: "ES2022 'Object.hasOwn' method is forbidden." }],
    },
    {
      code: '/./d;',
      errors: [{ message: "ES2022 RegExp 'd' flag is forbidden." }],
    },
    {
      code: 'await true;',
      errors: [{ message: "ES2022 top-level 'await' is forbidden." }],
    },
    {
      code: 'class A { #field; foo() { #field in this; } }',
      // Browser that supports private fields but not `in` on them - see es-versions.md
      options: [{ overrideBrowserslist: 'Chrome >= 90' }],
      errors: [{ message: 'ES2022 private in (`#field in object`) is forbidden.' }],
    },
  ],
});
