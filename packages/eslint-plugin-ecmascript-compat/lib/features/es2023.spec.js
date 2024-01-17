const { RuleTester } = require('eslint');

// Browser that doesn't support any features of this version - see es-versions.md
process.env.BROWSERSLIST = 'Chrome >= 73';
jest.resetModules();

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2023,
  },
});

ruleTester.run('compat', require('../rule'), {
  valid: [
    {
      code: '[].findLast("a");',
      options: [{ polyfills: ['{Array,TypedArray}.prototype.findLast'] }],
    },
    {
      code: '[].toReversed();',
      options: [{ polyfills: ['{Array,TypedArray}.prototype.toReversed'] }],
    },
    {
      code: '[].toSorted();',
      options: [{ polyfills: ['{Array,TypedArray}.prototype.toSorted'] }],
    },
    {
      code: '[].toSpliced(1);',
      options: [{ polyfills: ['Array.prototype.toSpliced'] }],
    },
    {
      code: '[].with(1, "a");',
      options: [{ polyfills: ['{Array,TypedArray}.prototype.with'] }],
    },
  ],
  invalid: [
    {
      // Obvious array, doesn't need aggressive mode
      code: '[].findLast("a");',
      errors: [{ message: "ES2023 'Array.prototype.findLast' method is forbidden." }],
    },
    {
      // Not obvious, needs aggressive mode
      code: 'foo.findLast("a");',
      errors: [{ message: "ES2023 'Array.prototype.findLast' method is forbidden." }],
    },
    {
      // Obvious array, doesn't need aggressive mode
      code: '[].toReversed();',
      errors: [{ message: "ES2023 'Array.prototype.toReversed' method is forbidden." }],
    },
    {
      // Not obvious, needs aggressive mode
      code: 'foo.toReversed();',
      errors: [{ message: "ES2023 'Array.prototype.toReversed' method is forbidden." }],
    },
    {
      // Obvious array, doesn't need aggressive mode
      code: '[].toSorted();',
      errors: [{ message: "ES2023 'Array.prototype.toSorted' method is forbidden." }],
    },
    {
      // Not obvious, needs aggressive mode
      code: 'foo.toSorted();',
      errors: [{ message: "ES2023 'Array.prototype.toSorted' method is forbidden." }],
    },
    {
      // Obvious array, doesn't need aggressive mode
      code: '[].toSpliced(1);',
      errors: [{ message: "ES2023 'Array.prototype.toSpliced' method is forbidden." }],
    },
    {
      // Not obvious, needs aggressive mode
      code: 'foo.toSpliced(1);',
      errors: [{ message: "ES2023 'Array.prototype.toSpliced' method is forbidden." }],
    },
    {
      // Obvious array, doesn't need aggressive mode
      code: '[].with(1, "a");',
      errors: [{ message: "ES2023 'Array.prototype.with' method is forbidden." }],
    },
    {
      // Not obvious, needs aggressive mode
      code: 'foo.with(1, "a");',
      errors: [{ message: "ES2023 'Array.prototype.with' method is forbidden." }],
    },
    {
      code: '#!/usr/bin/env node',
      errors: [{ message: 'ES2023 Hashbang comments are forbidden.' }],
    },
  ],
});
