const eslint = require('eslint');
const esPlugin = require('eslint-plugin-es-x');
const compatData = require('@mdn/browser-compat-data');
const { noRestrictedSyntaxPrototypeMethod } = require('./ruleOptionsUtil');

const coreRules = new eslint.Linter().getRules();

module.exports = [
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('Array.prototype.includes', 'ES2016'),
    },
    compatFeatures: [compatData.javascript.builtins.Array.includes],
    polyfill: 'Array.prototype.includes',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-exponential-operators'] },
    compatFeatures: [compatData.javascript.operators.exponentiation],
  },
];
