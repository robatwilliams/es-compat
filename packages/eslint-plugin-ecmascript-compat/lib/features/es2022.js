import compatData from '@mdn/browser-compat-data';
import esPlugin from 'eslint-plugin-es-x';

export default [
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
      compatData.javascript.classes.private_class_methods,
    ],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-class-static-block'] },
    compatFeatures: [compatData.javascript.classes.static_initialization_blocks],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-error-cause'] },
    compatFeatures: [compatData.javascript.builtins.Error.Error.options_cause_parameter],
    polyfill: 'Error.cause',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-object-hasown'] },
    compatFeatures: [compatData.javascript.builtins.Object.hasOwn],
    polyfill: 'Object.hasOwn',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-private-in'] },
    compatFeatures: [compatData.javascript.classes.private_class_fields_in],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-regexp-d-flag'] },
    compatFeatures: [compatData.javascript.builtins.RegExp.hasIndices],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-top-level-await'] },
    compatFeatures: [compatData.javascript.operators.await.top_level],
  },
];
