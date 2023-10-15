const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module', // top level await can only be used in an ES module
  },
});

const chrome71Options = { overrideBrowserslist: 'Chrome >= 71' };
const chrome90Options = { overrideBrowserslist: 'Chrome >= 90' };

ruleTester.run('compat', require('../rule'), {
  valid: [
    {
      code: '[].at(1);',
      options: [
        { ...chrome71Options, polyfills: ['{Array,String,TypedArray}.prototype.at'] },
      ],
    },
    {
      code: '"Foo".at(1);',
      options: [
        { ...chrome71Options, polyfills: ['{Array,String,TypedArray}.prototype.at'] },
      ],
    },
    {
      code: "new Error('message', { cause: originalError })",
      options: [{ ...chrome71Options, polyfills: ['Error.cause'] }],
    },
    {
      code: "Object.hasOwn(obj, 'prop');",
      options: [{ ...chrome71Options, polyfills: ['Object.hasOwn'] }],
    },
  ],
  invalid: [
    {
      // Obvious array, doesn't need aggressive mode
      code: '[].at(1);',
      options: [chrome71Options],
      errors: [{ message: "ES2022 'Array.prototype.at' method is forbidden." }],
    },
    {
      // Obvious string, doesn't need aggressive mode
      code: '"Foo".at(1);',
      options: [chrome71Options],
      errors: [{ message: "ES2022 'String.prototype.at' method is forbidden." }],
    },
    {
      // Not obvious, needs aggressive mode
      code: 'foo.at(1);',
      options: [chrome71Options],
      errors: [{ message: "ES2022 'Array.prototype.at' method is forbidden." }],
    },
    {
      code: 'class A { a = 0 }',
      options: [chrome71Options],
      errors: [{ message: "ES2020 field 'a' is forbidden." }],
    },
    {
      code: 'class A { static { } }',
      options: [chrome71Options],
      errors: [{ message: 'ES2022 class static block is forbidden.' }],
    },
    {
      code: "new Error('message', { cause: originalError })",
      options: [chrome71Options],
      errors: [{ message: 'ES2022 Error Cause is forbidden.' }],
    },
    {
      code: "Object.hasOwn(obj, 'prop');",
      options: [chrome71Options],
      errors: [{ message: "ES2022 'Object.hasOwn' method is forbidden." }],
    },
    {
      code: '/./d;',
      options: [chrome71Options],
      errors: [{ message: "ES2022 RegExp 'd' flag is forbidden." }],
    },
    {
      code: 'await true;',
      options: [chrome71Options],
      errors: [{ message: "ES2022 top-level 'await' is forbidden." }],
    },
    {
      code: 'class A { #field; foo() { #field in this; } }',
      options: [chrome90Options],
      errors: [{ message: 'ES2022 private in (`#field in object`) is forbidden.' }],
    },
  ],
});
