const compatData = require('mdn-browser-compat-data');
const ruleConfigs = require('./ruleConfigs');

module.exports = [
  {
    ruleConfig: ruleConfigs.noAsyncIteration,
    compatFeatures: [
      compatData.javascript.statements.for_await_of,
      compatData.javascript.functions.method_definitions.async_generator_methods,
    ],
  },
  {
    ruleConfig: ruleConfigs.noRestSpreadProperties,
    compatFeatures: [
      compatData.javascript.operators.destructuring.rest_in_objects,
      compatData.javascript.operators.spread.spread_in_object_literals,
    ],
  },
  {
    ruleConfig: ruleConfigs.noPromiseFinally,
    compatFeatures: [compatData.javascript.builtins.Promise.finally],
  },
  {
    ruleConfig: ruleConfigs.noRegExpLookBehindAssertions,
    compatFeatures: [compatData.javascript.builtins.RegExp.lookbehind_assertion],
  },
  {
    ruleConfig: ruleConfigs.noRegExpNamedCaptureGroups,
    compatFeatures: [compatData.javascript.builtins.RegExp.named_capture_groups],
  },
  {
    ruleConfig: ruleConfigs.noRegExpDotAllFlag,
    compatFeatures: [compatData.javascript.builtins.RegExp.dotAll],
  },
  {
    ruleConfig: ruleConfigs.noRegExpUnicodePropertyEscapes,
    compatFeatures: [compatData.javascript.builtins.RegExp.property_escapes],
  },
];
