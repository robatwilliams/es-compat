import eslint from 'eslint';
import esPlugin from 'eslint-plugin-es-x';
import compatData from '@mdn/browser-compat-data';
import { noRestrictedSyntaxPrototypeMethod } from './ruleOptionsUtil.js';

const coreRules = new eslint.Linter().getRules();

export default [
  {
    ruleConfig: { definition: esPlugin.rules['no-async-iteration'] },
    compatFeatures: [
      compatData.javascript.statements.for_await_of,
      compatData.javascript.functions.method_definitions.async_generator_methods,
    ],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-rest-spread-properties'] },
    compatFeatures: [
      compatData.javascript.operators.destructuring.rest_in_objects,
      compatData.javascript.operators.spread.spread_in_object_literals,
    ],
  },
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('Promise.prototype.finally', 'ES2018'),
    },
    compatFeatures: [compatData.javascript.builtins.Promise.finally],
    polyfill: 'Promise.prototype.finally',
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-regexp-lookbehind-assertions'] },
    compatFeatures: [compatData.javascript.regular_expressions.lookbehind_assertion],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-regexp-named-capture-groups'] },
    compatFeatures: [compatData.javascript.regular_expressions.named_capturing_group],
  },
  {
    ruleConfig: { definition: esPlugin.rules['no-regexp-s-flag'] },
    compatFeatures: [compatData.javascript.builtins.RegExp.dotAll],
  },
  {
    ruleConfig: {
      /**
       * New values were added in the following ES2019.
       * The rule no-regexp-unicode-property-escapes-2019 accepts these, but is omitted
       * because the compatibility data doesn't distinguish the two.
       */
      definition: esPlugin.rules['no-regexp-unicode-property-escapes'],
    },
    compatFeatures: [
      compatData.javascript.regular_expressions.unicode_character_class_escape,
    ],
  },
];
