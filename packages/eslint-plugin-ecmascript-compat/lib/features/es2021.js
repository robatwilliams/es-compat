const eslint = require('eslint');
const compatData = require('@mdn/browser-compat-data');
const esPlugin = require('eslint-plugin-es');
const { noRestrictedSyntaxPrototypeMethod } = require('./ruleOptionsUtil');

const coreRules = new eslint.Linter().getRules();

module.exports = [
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('String.prototype.replaceAll', 'ES2021'),
    },
    compatFeatures: [compatData.javascript.builtins.String.replaceAll],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-logical-assignment-operators'] },
    compatFeatures: [
      compatData.javascript.operators.logical_or_assignment,
      compatData.javascript.operators.logical_and_assignment,
      compatData.javascript.operators.logical_nullish_assignment,
    ],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-numeric-separators'] },
    compatFeatures: [compatData.javascript.grammar.numeric_separators],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-promise-any'] },
    compatFeatures: [compatData.javascript.builtins.Promise.any],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-weakrefs'] },
    compatFeatures: [
      compatData.javascript.builtins.WeakRef,
      compatData.javascript.builtins.FinalizationRegistry,
    ],
  },
];
