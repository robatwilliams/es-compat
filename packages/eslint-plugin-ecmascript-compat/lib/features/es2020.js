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
    ruleConfig: {
      definition: coreRules.get('no-restricted-globals'),
      options: [
        {
          name: 'globalThis',
          message: "ES2020 global 'globalThis' is forbidden",
        },
      ],
    },
    compatFeatures: [compatData.javascript.builtins.globalThis],
  },
  // For some reason, this rule doesn't work even standalone outside a unit test
  // {
  //   ruleConfig: { definition: esPlugin.rules['no-promise-all-settled'] },
  //   compatFeatures: [compatData.javascript.builtins.Promise.allSettled],
  // },
  {
    // May false positive for Cache/Clients.matchAll()
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('String.prototype.matchAll', 'ES2020'),
    },
    compatFeatures: [compatData.javascript.builtins.String.matchAll],
  },
];
