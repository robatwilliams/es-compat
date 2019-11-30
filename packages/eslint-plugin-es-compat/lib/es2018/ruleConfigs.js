const eslint = require('eslint');
const esPlugin = require('eslint-plugin-es');

const coreRules = new eslint.Linter().getRules();

exports.noAsyncIteration = {
  definition: esPlugin.rules['no-async-iteration'],
};

exports.noRestSpreadProperties = {
  definition: esPlugin.rules['no-rest-spread-properties'],
};

exports.noPromiseFinally = {
  definition: coreRules.get('no-restricted-syntax'),
  options: [
    {
      selector: 'CallExpression[callee.property.name="finally"]',
      message: "ES2018 method 'Promise.prototype.finally' is forbidden",
    },
  ],
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

exports.noRegExpUnicodePropertyEscapes = {
  definition: esPlugin.rules['no-regexp-unicode-property-escapes'],
};
