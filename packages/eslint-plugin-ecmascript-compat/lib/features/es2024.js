// Import assertions aren't yet stage 4 so aren't supported by ESLint
import compatData from '@mdn/browser-compat-data/forLegacyNode';
import esPlugin from 'eslint-plugin-es-x';

export default [
  {
    ruleConfig: {
      definition: esPlugin.rules['no-promise-withresolvers'],
    },
    compatFeatures: [compatData.javascript.builtins.Promise.withResolvers],
    polyfill: 'Promise.withResolvers',
  },
  {
    ruleConfig: {
      definition: esPlugin.rules['no-string-prototype-iswellformed-towellformed'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [
      compatData.javascript.builtins.String.isWellFormed,
      compatData.javascript.builtins.String.toWellFormed,
    ],
    polyfill: 'String.prototype.{isWellFormed,toWellFormed}',
  },
  {
    ruleConfig: {
      definition: esPlugin.rules['no-object-map-groupby'],
    },
    compatFeatures: [
      compatData.javascript.builtins.Object.groupBy,
      compatData.javascript.builtins.Map.groupBy,
    ],
    polyfill: '{Object,Map}.groupBy',
  },
  {
    ruleConfig: {
      definition: esPlugin.rules['no-atomics-waitasync'],
    },
    compatFeatures: [compatData.javascript.builtins.Atomics.waitAsync],
  },
  {
    ruleConfig: {
      definition: esPlugin.rules['no-resizable-and-growable-arraybuffers'],
      options: [{ aggressive: true }],
    },
    compatFeatures: [
      compatData.javascript.builtins.ArrayBuffer.resize,
      compatData.javascript.builtins.ArrayBuffer.resizable,
      compatData.javascript.builtins.ArrayBuffer.maxByteLength,
      // TODO: Transfer methods should have a separate rule
      compatData.javascript.builtins.ArrayBuffer.transfer,
      compatData.javascript.builtins.ArrayBuffer.transferToFixedLength,
    ],
  },
  {
    ruleConfig: {
      definition: esPlugin.rules['no-regexp-v-flag'],
    },
    compatFeatures: [compatData.javascript.builtins.RegExp.unicodeSets],
  },
];
