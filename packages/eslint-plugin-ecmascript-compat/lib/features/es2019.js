const eslint = require('eslint');
const esPlugin = require('eslint-plugin-es');
const compatData = require('mdn-browser-compat-data');
const { noRestrictedSyntaxPrototypeMethod } = require('./ruleOptionsUtil');

const coreRules = new eslint.Linter().getRules();

module.exports = [
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: [
        ...noRestrictedSyntaxPrototypeMethod('Array.prototype.flat', 'ES2019'),
        ...noRestrictedSyntaxPrototypeMethod('Array.prototype.flatMap', 'ES2019'),
      ],
    },
    compatFeatures: [
      compatData.javascript.builtins.Array.flat,
      compatData.javascript.builtins.Array.flatMap,
    ],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-json-superset'] },
    compatFeatures: [compatData.javascript.builtins.JSON.json_superset],
  },
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-properties'),
      options: [{ object: 'Object', property: 'fromEntries', message: '(ES2019)' }],
    },
    compatFeatures: [compatData.javascript.builtins.Object.fromEntries],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-optional-catch-binding'] },
    compatFeatures: [compatData.javascript.statements.try_catch.optional_catch_binding],
  },
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: [
        ...noRestrictedSyntaxPrototypeMethod('String.prototype.trimLeft', 'ES2019'),
        ...noRestrictedSyntaxPrototypeMethod('String.prototype.trimRight', 'ES2019'),
        ...noRestrictedSyntaxPrototypeMethod('String.prototype.trimStart', 'ES2019'),
        ...noRestrictedSyntaxPrototypeMethod('String.prototype.trimEnd', 'ES2019'),
      ],
    },
    compatFeatures: [
      // trimRight and trimLeft are alternates of these
      compatData.javascript.builtins.String.trimEnd,
      compatData.javascript.builtins.String.trimStart,
    ],
  },
];
