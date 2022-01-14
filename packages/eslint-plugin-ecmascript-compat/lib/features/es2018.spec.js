const { RuleTester } = require('eslint');

process.env.BROWSERSLIST = 'Chrome >= 59';
jest.resetModules();

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
  },
});

ruleTester.run('compat', require('../rule'), {
  valid: [],
  invalid: [
    {
      code: 'async function* asyncGenerator() {}',
      errors: [{ message: 'ES2018 async iteration is forbidden.' }],
    },
    {
      code: 'async () => { for await (const bar of bar) { } }',
      errors: [{ message: 'ES2018 async iteration is forbidden.' }],
    },
    {
      code: 'const foo = { ...bar };',
      errors: [{ message: 'ES2018 rest/spread properties are forbidden.' }],
    },
    {
      code: 'const { a, ...rest } = foo;',
      errors: [{ message: 'ES2018 rest/spread properties are forbidden.' }],
    },
    {
      code: 'foo.finally();',
      errors: [{ message: "ES2018 method 'Promise.prototype.finally' is forbidden" }],
    },
    {
      code: 'Promise.prototype.finally;',
      errors: [{ message: "ES2018 method 'Promise.prototype.finally' is forbidden" }],
    },
    {
      code: "/(?<=a)b/.test('look-behind assertion');",
      errors: [{ message: 'ES2018 RegExp lookbehind assertions are forbidden.' }],
    },
    {
      code: "/(?<a>b)c/.test('named capture group');",
      errors: [{ message: 'ES2018 RegExp named capture groups are forbidden.' }],
    },
    {
      code: "/./s.test('dotAll flag');",
      errors: [{ message: "ES2018 RegExp 's' flag is forbidden." }],
    },
    {
      code: "/\\p{Script=Hiragana}+/u.test('Unicode property escape');",
      errors: [
        { message: 'ES2018 RegExp Unicode property escape sequences are forbidden.' },
      ],
    },
  ],
});
