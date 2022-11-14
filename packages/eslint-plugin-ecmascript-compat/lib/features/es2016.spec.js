const { RuleTester } = require('eslint');

// Browser that doesn't support any features of this version - see es-versions.md
process.env.BROWSERSLIST = 'Chrome >= 46';
jest.resetModules();

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2016,
  },
});

ruleTester.run('compat', require('../rule'), {
  valid: [
    {
      code: 'foo.includes();',
      options: [{ polyfills: ['Array.prototype.includes'] }],
    },
  ],
  invalid: [
    {
      code: 'foo.includes();',
      errors: [{ message: "ES2016 method 'Array.prototype.includes' is forbidden" }],
    },
    {
      code: 'Array.prototype.includes;',
      errors: [{ message: "ES2016 method 'Array.prototype.includes' is forbidden" }],
    },
    {
      code: 'foo ** bar',
      errors: [{ message: 'ES2016 exponential operators are forbidden.' }],
    },
  ],
});
