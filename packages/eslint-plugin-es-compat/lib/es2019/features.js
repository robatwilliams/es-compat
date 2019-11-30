const compatData = require('mdn-browser-compat-data');
const ruleConfigs = require('./ruleConfigs');

// TODO incomplete
module.exports = [
  {
    ruleConfig: ruleConfigs.noArrayFlatMethods,
    compatFeatures: [
      compatData.javascript.builtins.Array.flat,
      compatData.javascript.builtins.Array.flatMap,
    ],
  },
  {
    ruleConfig: ruleConfigs.noOptionalCatchBinding,
    compatFeatures: [compatData.javascript.statements.try_catch.optional_catch_binding],
  },
];
