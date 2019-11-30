const compatData = require('mdn-browser-compat-data');
const delegateeConfigs = require('./delegateeConfigs');

// TODO incomplete
const es2019 = [
  {
    ruleConfig: delegateeConfigs.noOptionalCatchBinding,
    compatFeatures: [compatData.javascript.statements.try_catch.optional_catch_binding],
  },
  {
    ruleConfig: delegateeConfigs.noArrayFlatMethods,
    compatFeatures: [
      compatData.javascript.builtins.Array.flat,
      compatData.javascript.builtins.Array.flatMap,
    ],
  },
];

// TODO ES 2018, 2017
module.exports = es2019;
