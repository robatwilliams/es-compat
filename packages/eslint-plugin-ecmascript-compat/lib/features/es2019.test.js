const { RuleTester } = require('eslint');

// Browser that doesn't support any features of this version - see es-versions.md
process.env.BROWSERSLIST = 'Chrome >= 65';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2019,
  },
});

ruleTester.run('compat', require('../rule'), {
  valid: [
    {
      code: 'foo.flat();',
      options: [{ polyfills: ['Array.prototype.{flat,flatMap}'] }],
    },
    {
      code: 'foo.flatMap();',
      options: [{ polyfills: ['Array.prototype.{flat,flatMap}'] }],
    },
    {
      code: 'Object.fromEntries();',
      options: [{ polyfills: ['Object.fromEntries'] }],
    },
    {
      code: 'foo.trimLeft();',
      options: [{ polyfills: ['String.prototype.{trimStart,trimEnd}'] }],
    },
    {
      code: 'foo.trimRight();',
      options: [{ polyfills: ['String.prototype.{trimStart,trimEnd}'] }],
    },
    {
      code: 'foo.trimStart();',
      options: [{ polyfills: ['String.prototype.{trimStart,trimEnd}'] }],
    },
    {
      code: 'foo.trimEnd();',
      options: [{ polyfills: ['String.prototype.{trimStart,trimEnd}'] }],
    },
  ],
  invalid: [
    {
      code: 'foo.flat();',
      errors: [{ message: "ES2019 'Array.prototype.flat' method is forbidden." }],
    },
    {
      code: 'Array.prototype.flatMap;',
      errors: [{ message: "ES2019 'Array.prototype.flatMap' method is forbidden." }],
    },
    {
      // eslint-disable-next-line no-irregular-whitespace
      code: `const u2028 = ' ';`, // line separator character \u2028 is in this string
      errors: [{ message: "ES2019 '\\u2028' in string literals is forbidden." }],
    },
    {
      code: 'Object.fromEntries();',
      errors: [{ message: "ES2019 'Object.fromEntries' method is forbidden." }],
    },
    {
      code: 'try {} catch {}',
      errors: [{ message: "ES2019 optional 'catch' binding is forbidden." }],
    },
    {
      code: 'foo.trimLeft();',
      errors: [{ message: "ES2019 'String.prototype.trimLeft' method is forbidden." }],
    },
    {
      code: 'String.prototype.trimRight;',
      errors: [{ message: "ES2019 'String.prototype.trimRight' method is forbidden." }],
    },
    {
      code: 'String.prototype.trimStart;',
      errors: [{ message: "ES2019 'String.prototype.trimStart' method is forbidden." }],
    },
    {
      code: 'foo.trimEnd();',
      errors: [{ message: "ES2019 'String.prototype.trimEnd' method is forbidden." }],
    },
  ],
});
