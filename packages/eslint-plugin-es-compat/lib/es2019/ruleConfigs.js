const eslint = require('eslint');
const esPlugin = require('eslint-plugin-es');
const { noRestrictedSyntaxPrototypeMethod } = require('../ruleOptionsUtil');

const coreRules = new eslint.Linter().getRules();

exports.noArrayFlatMethods = {
  definition: coreRules.get('no-restricted-syntax'),
  options: [
    ...noRestrictedSyntaxPrototypeMethod('Array.prototype.flat', 'ES2019'),
    ...noRestrictedSyntaxPrototypeMethod('Array.prototype.flatMap', 'ES2019'),
  ],
};

exports.noJSONSuperset = {
  definition: esPlugin.rules['no-json-superset'],
};

exports.noObjectFromEntries = {
  definition: coreRules.get('no-restricted-properties'),
  options: [{ object: 'Object', property: 'fromEntries', message: '(ES2019)' }],
};

exports.noOptionalCatchBinding = {
  definition: esPlugin.rules['no-optional-catch-binding'],
};

exports.noStringTrimSideMethods = {
  definition: coreRules.get('no-restricted-syntax'),
  options: [
    ...noRestrictedSyntaxPrototypeMethod('String.prototype.trimLeft', 'ES2019'),
    ...noRestrictedSyntaxPrototypeMethod('String.prototype.trimRight', 'ES2019'),
    ...noRestrictedSyntaxPrototypeMethod('String.prototype.trimStart', 'ES2019'),
    ...noRestrictedSyntaxPrototypeMethod('String.prototype.trimEnd', 'ES2019'),
  ],
};

exports.noSymbolDescription = {
  definition: coreRules.get('no-restricted-syntax'),
  options: [
    {
      // It's a read-only accessor, so can safely ignore assignments to namesakes
      selector:
        ':not(AssignmentExpression) > MemberExpression[property.name="description"]',
      message: "ES2019 property 'Symbol.prototype.description' is forbidden",
    },
    {
      selector:
        'AssignmentExpression > MemberExpression.right[property.name="description"]',
      message: "ES2019 property 'Symbol.prototype.description' is forbidden",
    },
  ],
};
