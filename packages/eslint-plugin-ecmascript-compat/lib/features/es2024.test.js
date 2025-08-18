import { RuleTester } from 'eslint';
import rule from '../rule.js';

// Browser that doesn't support any features of this version - see es-versions.md
process.env.BROWSERSLIST = 'Chrome >= 85';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2024,
  },
  globals: {
    // ES2024 globals
    Promise: 'readonly',
    Object: 'readonly',
    Map: 'readonly',
    Atomics: 'readonly',
    ArrayBuffer: 'readonly',
    RegExp: 'readonly',
  },
});

ruleTester.run('compat', rule, {
  valid: [
    {
      code: 'Promise.withResolvers();',
      options: [{ polyfills: ['Promise.withResolvers'] }],
    },
    {
      code: '"test".isWellFormed();',
      options: [{ polyfills: ['String.prototype.{isWellFormed,toWellFormed}'] }],
    },
    {
      code: '"test".toWellFormed();',
      options: [{ polyfills: ['String.prototype.{isWellFormed,toWellFormed}'] }],
    },
    {
      code: 'Object.groupBy([], () => {});',
      options: [{ polyfills: ['{Object,Map}.groupBy'] }],
    },
    {
      code: 'Map.groupBy([], () => {});',
      options: [{ polyfills: ['{Object,Map}.groupBy'] }],
    },
  ],
  invalid: [
    {
      code: 'Promise.withResolvers();',
      errors: [{ message: "ES2024 'Promise.withResolvers' is forbidden." }],
    },
    {
      // Obvious string, doesn't need aggressive mode
      code: '"test".isWellFormed();',
      errors: [
        { message: "ES2024 'String.prototype.isWellFormed' method is forbidden." },
      ],
    },
    {
      // Not obvious, needs aggressive mode
      code: 'foo.isWellFormed();',
      errors: [
        { message: "ES2024 'String.prototype.isWellFormed' method is forbidden." },
      ],
    },
    {
      // Obvious string, doesn't need aggressive mode
      code: '"test".toWellFormed();',
      errors: [
        { message: "ES2024 'String.prototype.toWellFormed' method is forbidden." },
      ],
    },
    {
      // Not obvious, needs aggressive mode
      code: 'foo.toWellFormed();',
      errors: [
        { message: "ES2024 'String.prototype.toWellFormed' method is forbidden." },
      ],
    },
    {
      code: 'Object.groupBy([], () => {});',
      errors: [{ message: "ES2024 'Object.groupBy' is forbidden." }],
    },
    {
      code: 'Map.groupBy([], () => {});',
      errors: [{ message: "ES2024 'Map.groupBy' is forbidden." }],
    },
    {
      code: 'Atomics.waitAsync(new Int32Array(1), 0, 0);',
      errors: [{ message: "ES2024 'Atomics.waitAsync' method is forbidden." }],
    },
    {
      code: 'new ArrayBuffer(16, { maxByteLength: 32 });',
      errors: [{ message: 'ES2024 Resizable ArrayBuffer is forbidden.' }],
    },
    {
      code: '/test/v;',
      errors: [{ message: "ES2024 RegExp 'v' flag is forbidden." }],
    },
  ],
});
