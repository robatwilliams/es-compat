const eslint = require('eslint');
const esPlugin = require('eslint-plugin-es-x');
const compatData = require('@mdn/browser-compat-data');
const { noRestrictedSyntaxPrototypeMethod } = require('./ruleOptionsUtil');

const coreRules = new eslint.Linter().getRules();

module.exports = [
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('Array.prototype.flat', 'ES2019'),
    },
    compatFeatures: [compatData.javascript.builtins.Array.flat],
    polyfill: 'Array.prototype.flat',
  },
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('Array.prototype.flatMap', 'ES2019'),
    },
    compatFeatures: [compatData.javascript.builtins.Array.flatMap],
    polyfill: 'Array.prototype.flatMap',
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
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('String.prototype.trimStart', 'ES2019'),
    },
    compatFeatures: [compatData.javascript.builtins.String.trimStart],
    polyfill: 'String.prototype.trimStart',
  },
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('String.prototype.trimLeft', 'ES2019'),
    },
    compatFeatures: [compatData.javascript.builtins.String.trimStart], // not a mistake; trimLeft is an alias for trimStart
    polyfill: 'String.prototype.trimLeft',
  },
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('String.prototype.trimEnd', 'ES2019'),
    },
    compatFeatures: [compatData.javascript.builtins.String.trimEnd],
    polyfill: 'String.prototype.trimEnd',
  },
  {
    ruleConfig: {
      definition: coreRules.get('no-restricted-syntax'),
      options: noRestrictedSyntaxPrototypeMethod('String.prototype.trimRight', 'ES2019'),
    },
    compatFeatures: [compatData.javascript.builtins.String.trimEnd], // not a mistake; trimRight is an alias for trimEnd
    polyfill: 'String.prototype.trimRight',
  },
];
