const esPlugin = require('eslint-plugin-es');
const compatData = require('mdn-browser-compat-data');
const ruleConfigs = require('./ruleConfigs');

module.exports = [
  {
    ruleConfig: ruleConfigs.noArrayFlatMethods,
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
    ruleConfig: ruleConfigs.noObjectFromEntries,
    compatFeatures: [compatData.javascript.builtins.Object.fromEntries],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-optional-catch-binding'] },
    compatFeatures: [compatData.javascript.statements.try_catch.optional_catch_binding],
  },
  {
    ruleConfig: ruleConfigs.noStringTrimSideMethods,
    compatFeatures: [
      // trimRight and trimLeft are alternates of these
      compatData.javascript.builtins.String.trimEnd,
      compatData.javascript.builtins.String.trimStart,
    ],
  },
];
