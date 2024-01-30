const eslint = require('eslint');
const esPlugin = require('eslint-plugin-es-x');
const compatData = require('@mdn/browser-compat-data');

const coreRules = new eslint.Linter().getRules();

module.exports = [
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-properties'),
      options: [{ object: 'Atomics', property: 'notify', message: '(ES2020)' }],
    },
    compatFeatures: [compatData.javascript.builtins.Atomics.notify],
  },
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-properties'),
      options: [{ object: 'Atomics', property: 'wait', message: '(ES2020)' }],
    },
    compatFeatures: [compatData.javascript.builtins.Atomics.wait],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-bigint'] },
    compatFeatures: [compatData.javascript.builtins.BigInt],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-dynamic-import'] },
    compatFeatures: [compatData.javascript.operators.import],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-global-this'] },
    compatFeatures: [compatData.javascript.builtins.globalThis],
    polyfill: 'globalThis',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-import-meta'] },
    compatFeatures: [compatData.javascript.operators.import_meta],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-export-ns-from'] },
    compatFeatures: [compatData.javascript.statements.export.namespace],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-nullish-coalescing-operators'] },
    compatFeatures: [compatData.javascript.operators.nullish_coalescing],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-optional-chaining'] },
    compatFeatures: [compatData.javascript.operators.optional_chaining],
  },
  {
    // Rule requires the ES6 global, Promise
    ruleConfig: { definition: esPlugin.rules['no-promise-all-settled'] },
    compatFeatures: [compatData.javascript.builtins.Promise.allSettled],
    polyfill: 'Promise.prototype.allSettled',
  },
  {
    // May false positive for Cache/Clients.matchAll()
    ruleConfig: {
      definition: esPlugin.rules['no-string-prototype-matchall'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [compatData.javascript.builtins.String.matchAll],
    polyfill: 'String.prototype.matchAll',
  },
];
