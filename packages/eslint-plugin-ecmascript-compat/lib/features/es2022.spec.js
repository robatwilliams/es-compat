const { RuleTester } = require('eslint');

// Browser that doesn't support any features of this version - see es-versions.md
process.env.BROWSERSLIST = 'Chrome >= 71';
jest.resetModules();

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2022,
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
      code: 'class A { a = 0 }',
      errors: [{ message: 'ES2020 field [a] is forbidden.' }],
    },
    {
      code: 'class A { static { } }',
      errors: [{ message: 'ES2022 class static block is forbidden.' }],
    },
    {
      code: "Object.hasOwn(obj, 'prop');",
      errors: [{ message: "ES2022 'Object.hasOwn' method is forbidden." }],
    },
  ],
});
