const esPlugin = require('eslint-plugin-es-x');
const compatData = require('@mdn/browser-compat-data');

module.exports = [
  {
    ruleConfig: {
      definition: esPlugin.rules['no-array-prototype-includes'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [compatData.javascript.builtins.Array.includes],
    polyfill: 'Array.prototype.includes',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-exponential-operators'] },
    compatFeatures: [compatData.javascript.operators.exponentiation],
  },
];
