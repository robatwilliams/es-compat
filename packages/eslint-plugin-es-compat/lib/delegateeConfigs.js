const eslint = require('eslint');
const esPlugin = require('eslint-plugin-es');

const eslintCoreRules = new eslint.Linter().getRules();

module.exports = [
  {
    definition: eslintCoreRules.get('no-restricted-properties'),
    options: [{ object: 'Object', property: 'fromEntries', message: '(ES2019)' }],
  },
  {
    definition: eslintCoreRules.get('no-restricted-syntax'),
    options: [
      {
        selector: 'CallExpression[callee.property.name="flat"]',
        message: "ES2019 method 'Array.prototype.flat' is forbidden",
      },
      {
        selector: 'CallExpression[callee.property.name="flatMap"]',
        message: "ES2019 method 'Array.prototype.flatMap' is forbidden",
      },
    ],
  },
  {
    definition: eslintCoreRules.get('no-restricted-syntax'),
    options: [
      {
        // It's a read-only accessor, so can safely ignore assignments to namesakes
        selector:
          ':not(AssignmentExpression) > MemberExpression[property.name="description"]',
        message: "ES2019 property 'Symbol.prototype.description' is forbidden",
      },
      {
        selector:
          'AssignmentExpression > MemberExpression.right[property.name="description"]',
        message: "ES2019 property 'Symbol.prototype.description' is forbidden",
      },
    ],
  },
  {
    definition: eslintCoreRules.get('no-restricted-syntax'),
    options: [
      {
        selector: 'CallExpression[callee.property.name="trimLeft"]',
        message: "ES2019 method 'String.prototype.trimLeft' is forbidden",
      },
      {
        selector: 'CallExpression[callee.property.name="trimRight"]',
        message: "ES2019 method 'String.prototype.trimRight' is forbidden",
      },
      {
        selector: 'CallExpression[callee.property.name="trimStart"]',
        message: "ES2019 method 'String.prototype.trimStart' is forbidden",
      },
      {
        selector: 'CallExpression[callee.property.name="trimEnd"]',
        message: "ES2019 method 'String.prototype.trimEnd' is forbidden",
      },
    ],
  },
  { definition: esPlugin.rules['no-json-superset'] },
  { definition: esPlugin.rules['no-optional-catch-binding'] },
  { definition: esPlugin.rules['no-rest-spread-properties'] },
];
