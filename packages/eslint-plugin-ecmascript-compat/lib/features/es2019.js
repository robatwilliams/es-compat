const esPlugin = require('eslint-plugin-es-x');
const compatData = require('@mdn/browser-compat-data');

module.exports = [
  {
    ruleConfig: {
      definition: esPlugin.rules['no-array-prototype-flat'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [
      compatData.javascript.builtins.Array.flat,
      compatData.javascript.builtins.Array.flatMap,
    ],
    polyfill: 'Array.prototype.{flat,flatMap}',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-json-superset'] },
    compatFeatures: [compatData.javascript.builtins.JSON.json_superset],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-object-fromentries'] },
    compatFeatures: [compatData.javascript.builtins.Object.fromEntries],
    polyfill: 'Object.fromEntries',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-optional-catch-binding'] },
    compatFeatures: [compatData.javascript.statements.try_catch.optional_catch_binding],
  },
  {
    ruleConfig: {
      definition: esPlugin.rules['no-string-prototype-trimstart-trimend'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [
      compatData.javascript.builtins.String.trimStart,
      compatData.javascript.builtins.String.trimEnd,
    ],
    polyfill: 'String.prototype.{trimStart,trimEnd}',
  },
  {
    ruleConfig: {
      definition: esPlugin.rules['no-string-prototype-trimleft-trimright'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [
      // Not a mistake; trimLeft/trimRight are aliases for trimStart/trimEnd
      compatData.javascript.builtins.String.trimStart,
      compatData.javascript.builtins.String.trimEnd,
    ],
    polyfill: 'String.prototype.{trimLeft,trimRight}',
  },
];
