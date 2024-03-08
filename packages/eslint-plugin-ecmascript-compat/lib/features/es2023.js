import compatData from '@mdn/browser-compat-data';
import esPlugin from 'eslint-plugin-es-x';

export default [
  {
    ruleConfig: {
      definition: esPlugin.rules['no-array-prototype-findlast-findlastindex'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [
      compatData.javascript.builtins.Array.findLast,
      compatData.javascript.builtins.Array.findLastIndex,
      compatData.javascript.builtins.TypedArray.findLast,
      compatData.javascript.builtins.TypedArray.findLastIndex,
    ],
    polyfill: '{Array,TypedArray}.prototype.findLast',
  },
  {
    ruleConfig: {
      definition: esPlugin.rules['no-array-prototype-toreversed'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [
      compatData.javascript.builtins.Array.toReversed,
      compatData.javascript.builtins.TypedArray.toReversed,
    ],
    polyfill: '{Array,TypedArray}.prototype.toReversed',
  },
  {
    ruleConfig: {
      definition: esPlugin.rules['no-array-prototype-tosorted'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [
      compatData.javascript.builtins.Array.toSorted,
      compatData.javascript.builtins.TypedArray.toSorted,
    ],
    polyfill: '{Array,TypedArray}.prototype.toSorted',
  },
  {
    ruleConfig: {
      definition: esPlugin.rules['no-array-prototype-tospliced'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [compatData.javascript.builtins.Array.toSpliced],
    polyfill: 'Array.prototype.toSpliced',
  },
  {
    ruleConfig: {
      definition: esPlugin.rules['no-array-prototype-with'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [
      compatData.javascript.builtins.Array.with,
      compatData.javascript.builtins.TypedArray.with,
    ],
    polyfill: '{Array,TypedArray}.prototype.with',
  },
  {
    ruleConfig: {
      definition: esPlugin.rules['no-hashbang'],
    },
    compatFeatures: [compatData.javascript.grammar.hashbang_comments],
  },
];
