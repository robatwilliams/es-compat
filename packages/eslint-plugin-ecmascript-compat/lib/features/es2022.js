const compatData = require('@mdn/browser-compat-data');
const esPlugin = require('eslint-plugin-es-x');

module.exports = [
  {
    ruleConfig: {
      definition: esPlugin.rules['no-array-string-prototype-at'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [
      compatData.javascript.builtins.Array.at,
      compatData.javascript.builtins.TypedArray.at,
      compatData.javascript.builtins.String.at,
    ],
    polyfill: '{Array,String,TypedArray}.prototype.at',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-class-fields'] },
    compatFeatures: [
      compatData.javascript.classes.public_class_fields,
      compatData.javascript.classes.private_class_fields,
      compatData.javascript.classes.static_class_fields,
    ],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-class-static-block'] },
    compatFeatures: [compatData.javascript.classes.static_initialization_blocks],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-object-hasown'] },
    compatFeatures: [compatData.javascript.builtins.Object.hasOwn],
  },
];
