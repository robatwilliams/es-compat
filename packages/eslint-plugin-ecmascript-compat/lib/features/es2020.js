const eslint = require('eslint');
const esPlugin = require('eslint-plugin-es');
const compatData = require('mdn-browser-compat-data');
const { noRestrictedSyntaxPrototypeMethod } = require('./ruleOptionsUtil');

const coreRules = new eslint.Linter().getRules();

module.exports = [
  {
    ruleConfig: { definition: esPlugin.rules['no-bigint'] },
    compatFeatures: [compatData.javascript.builtins.BigInt],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-dynamic-import'] },
    compatFeatures: [compatData.javascript.statements.import.dynamic_import],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-global-this'] },
    compatFeatures: [compatData.javascript.builtins.globalThis],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-import-meta'] },
    compatFeatures: [compatData.javascript.statements.import_meta],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-export-ns-from'] },
    compatFeatures: [compatData.javascript.statements.export.namespace],
  },
  {
    // Rule requires the ES6 global, Promise
    ruleConfig: { definition: esPlugin.rules['no-promise-all-settled'] },
    compatFeatures: [compatData.javascript.builtins.Promise.allSettled],
  },
  {
    // May false positive for Cache/Clients.matchAll()
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('String.prototype.matchAll', 'ES2020'),
    },
    compatFeatures: [compatData.javascript.builtins.String.matchAll],
  },
];
