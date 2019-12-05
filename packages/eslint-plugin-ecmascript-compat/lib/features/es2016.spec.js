const { RuleTester } = require('eslint');
const rule = require('../rule');

process.env.BROWSERSLIST = 'Chrome >= 46';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2016,
  },
});

ruleTester.run('compat', rule, {
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
