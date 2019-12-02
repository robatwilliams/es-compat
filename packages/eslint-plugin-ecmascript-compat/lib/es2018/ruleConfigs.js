const eslint = require('eslint');
const esPlugin = require('eslint-plugin-es');
const { noRestrictedSyntaxPrototypeMethod } = require('../ruleOptionsUtil');

const coreRules = new eslint.Linter().getRules();

exports.noAsyncIteration = {
  definition: esPlugin.rules['no-async-iteration'],
};

exports.noRestSpreadProperties = {
  definition: esPlugin.rules['no-rest-spread-properties'],
};

exports.noPromiseFinally = {
  definition: coreRules.get('no-restricted-syntax'),
  options: noRestrictedSyntaxPrototypeMethod('Promise.prototype.finally', 'ES2018'),
};

exports.noRegExpLookBehindAssertions = {
  definition: esPlugin.rules['no-regexp-lookbehind-assertions'],
};

exports.noRegExpNamedCaptureGroups = {
  definition: esPlugin.rules['no-regexp-named-capture-groups'],
};

exports.noRegExpDotAllFlag = {
  definition: esPlugin.rules['no-regexp-s-flag'],
};

/**
 * New values were added in the following ES2019.
 * The rule no-regexp-unicode-property-escapes-2019 accepts these, but is omitted
 * because the compatibility data doesn't distinguish the two.
 */
exports.noRegExpUnicodePropertyEscapes = {
  definition: esPlugin.rules['no-regexp-unicode-property-escapes'],
};