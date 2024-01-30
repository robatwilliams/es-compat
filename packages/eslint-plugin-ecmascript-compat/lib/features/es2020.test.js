const { RuleTester } = require('eslint');

// Browser that doesn't support any features of this version - see es-versions.md
process.env.BROWSERSLIST = 'Chrome >= 62';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module', // import.meta and namespace exports can only be used in an ES module
  },
  globals: {
    // ES2020 global, required by es/no-bigint
    BigInt: 'readonly',

    // ES2020 global, required by es/no-global-this
    globalThis: 'readonly',

    // ES6 global, required by es/no-promise-all-settled
    Promise: 'readonly',
  },
});

ruleTester.run('compat', require('../rule'), {
  valid: [
    {
      code: 'globalThis.foo;',
      options: [{ polyfills: ['globalThis'] }],
    },
    {
      code: 'Promise.allSettled();',
      options: [{ polyfills: ['Promise.prototype.allSettled'] }],
    },
    {
      code: 'foo.matchAll();',
      options: [{ polyfills: ['String.prototype.matchAll'] }],
    },
  ],
  invalid: [
    {
      code: 'Atomics.notify();',
      errors: [{ message: "'Atomics.notify' is restricted from being used. (ES2020)" }],
    },
    {
      code: 'Atomics.wait();',
      errors: [{ message: "'Atomics.wait' is restricted from being used. (ES2020)" }],
    },
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
      errors: [{ message: "ES2020 'globalThis' variable is forbidden." }],
    },
    {
      code: 'import.meta;',
      errors: [{ message: "ES2020 'import.meta' meta property is forbidden." }],
    },
    {
      code: 'export * as nmspace from "./other";',
      errors: [{ message: "ES2020 'export * as ns' are forbidden." }],
    },
    {
      code: 'foo ?? fallback',
      errors: [{ message: 'ES2020 nullish coalescing operators are forbidden.' }],
    },
    {
      code: 'fooMaybe?.something',
      errors: [{ message: 'ES2020 optional chaining is forbidden.' }],
    },
    {
      code: 'Promise.allSettled();',
      errors: [{ message: "ES2020 'Promise.allSettled' function is forbidden." }],
    },
    {
      code: 'foo.matchAll();',
      errors: [{ message: "ES2020 'String.prototype.matchAll' method is forbidden." }],
    },
    {
      code: 'String.prototype.matchAll;',
      errors: [{ message: "ES2020 'String.prototype.matchAll' method is forbidden." }],
    },
  ],
});
