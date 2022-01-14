const { RuleTester } = require('eslint');

process.env.BROWSERSLIST = 'Chrome >= 46';
jest.resetModules();

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2016,
  },
});

ruleTester.run('compat', require('../rule'), {
  valid: [],
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
