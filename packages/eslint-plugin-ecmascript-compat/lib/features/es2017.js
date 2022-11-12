const eslint = require('eslint');
const esPlugin = require('eslint-plugin-es');
const compatData = require('@mdn/browser-compat-data');
const { noRestrictedSyntaxPrototypeMethod } = require('./ruleOptionsUtil');

const coreRules = new eslint.Linter().getRules();

module.exports = [
  {
    ruleConfig: { definition: esPlugin.rules['no-async-functions'] },
    compatFeatures: [
      compatData.javascript.operators.async_function,
      compatData.javascript.statements.async_function,
    ],
  },
  {
    // Rule requires the ES2017 global, Atomics
    ruleConfig: { definition: esPlugin.rules['no-atomics'] },
    compatFeatures: [compatData.javascript.builtins.Atomics],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-object-getownpropertydescriptors'] },
    compatFeatures: [compatData.javascript.builtins.Object.getOwnPropertyDescriptors],
    polyfill: 'Object.getOwnPropertyDescriptors',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-object-entries'] },
    compatFeatures: [compatData.javascript.builtins.Object.entries],
    polyfill: 'Object.entries'
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-object-values'] },
    compatFeatures: [compatData.javascript.builtins.Object.values],
    polyfill: 'Object.values'
  },
  {
    // Rule requires the ES2017 global, SharedArrayBuffer
    ruleConfig: { definition: esPlugin.rules['no-shared-array-buffer'] },
    compatFeatures: [compatData.javascript.builtins.SharedArrayBuffer],
  },
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('String.prototype.padStart', 'ES2017'),
    },
    compatFeatures: [compatData.javascript.builtins.String.padStart],
    polyfill: 'String.prototype.padStart'
  },
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('String.prototype.padEnd', 'ES2017'),
    },
    compatFeatures: [compatData.javascript.builtins.String.padEnd],
    polyfill: 'String.prototype.padEnd'
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-trailing-function-commas'] },
    compatFeatures: [
      compatData.javascript.functions.arrow_functions.trailing_comma,
      compatData.javascript.operators.function.trailing_comma,
      compatData.javascript.operators.generator_function.trailing_comma,
      compatData.javascript.statements.generator_function.trailing_comma_in_parameters,
      compatData.javascript.statements.function.trailing_comma_in_parameters,
    ],
  },
];
