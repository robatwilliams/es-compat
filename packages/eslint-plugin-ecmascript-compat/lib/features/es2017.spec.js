const { RuleTester } = require('eslint');
const rule = require('../rule');

process.env.BROWSERSLIST = 'Chrome >= 53';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2017,
  },
  globals: {
    // ES2017 global, required by es/no-atomics
    Atomics: 'readonly',

    // ES2017 global, required by es/no-shared-array-buffer
    SharedArrayBuffer: 'readonly',
  },
});

ruleTester.run('compat', rule, {
  valid: [],
  invalid: [
    {
      code: 'async function foo() {}',
      errors: [{ message: 'ES2017 async function declarations are forbidden.' }],
    },
    {
      code: 'Atomics.add(buffer, 0, 2);',
      errors: [{ message: "ES2017 'Atomics' class is forbidden." }],
    },
    {
      code: 'Object.getOwnPropertyDescriptors();',
      errors: [
        { message: "ES2017 'Object.getOwnPropertyDescriptors' method is forbidden." },
      ],
    },
    {
      code: 'Object.entries();',
      errors: [{ message: "ES2017 'Object.entries' method is forbidden." }],
    },
    {
      code: 'Object.values();',
      errors: [{ message: "ES2017 'Object.values' method is forbidden." }],
    },
    {
      code: 'new SharedArrayBuffer();',
      errors: [{ message: "ES2017 'SharedArrayBuffer' class is forbidden." }],
    },
    {
      code: 'str.padStart();',
      errors: [{ message: "ES2017 method 'String.prototype.padStart' is forbidden" }],
    },
    {
      code: 'String.prototype.padStart;',
      errors: [{ message: "ES2017 method 'String.prototype.padStart' is forbidden" }],
    },
    {
      code: 'str.padEnd();',
      errors: [{ message: "ES2017 method 'String.prototype.padEnd' is forbidden" }],
    },
    {
      code: 'String.prototype.padEnd;',
      errors: [{ message: "ES2017 method 'String.prototype.padEnd' is forbidden" }],
    },
    {
      code: 'foo(bar,);',
      errors: [
        { message: 'ES2017 trailing commas in parameter/argument lists are forbidden.' },
      ],
    },
  ],
});
