const compatData = require('@mdn/browser-compat-data');
const esPlugin = require('eslint-plugin-es-x');

module.exports = [
  {
    ruleConfig: {
      definition: esPlugin.rules['no-string-prototype-replaceall'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [compatData.javascript.builtins.String.replaceAll],
    polyfill: 'String.prototype.replaceAll',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-logical-assignment-operators'] },
    compatFeatures: [
      compatData.javascript.operators.logical_or_assignment,
      compatData.javascript.operators.logical_and_assignment,
      compatData.javascript.operators.nullish_coalescing_assignment,
    ],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-numeric-separators'] },
    compatFeatures: [compatData.javascript.grammar.numeric_separators],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-promise-any'] },
    compatFeatures: [compatData.javascript.builtins.Promise.any],
    polyfill: 'Promise.prototype.any',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-weakrefs'] },
    compatFeatures: [
      compatData.javascript.builtins.WeakRef,
      compatData.javascript.builtins.FinalizationRegistry,
    ],
  },
];
