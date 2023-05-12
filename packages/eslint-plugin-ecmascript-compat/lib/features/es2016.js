import eslint from 'eslint';
import esPlugin from 'eslint-plugin-es-x';
import compatData from '@mdn/browser-compat-data';
import { noRestrictedSyntaxPrototypeMethod } from './ruleOptionsUtil.js';

const coreRules = new eslint.Linter().getRules();

export default [
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('Array.prototype.includes', 'ES2016'),
    },
    compatFeatures: [compatData.javascript.builtins.Array.includes],
    polyfill: 'Array.prototype.includes',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-exponential-operators'] },
    compatFeatures: [compatData.javascript.operators.exponentiation],
  },
];
