const eslint = require('eslint');
const { noRestrictedSyntaxPrototypeMethod } = require('../ruleOptionsUtil');

const coreRules = new eslint.Linter().getRules();

exports.noArrayFlatMethods = {
  definition: coreRules.get('no-restricted-syntax'),
  options: [
    ...noRestrictedSyntaxPrototypeMethod('Array.prototype.flat', 'ES2019'),
    ...noRestrictedSyntaxPrototypeMethod('Array.prototype.flatMap', 'ES2019'),
  ],
};

exports.noObjectFromEntries = {
  definition: coreRules.get('no-restricted-properties'),
  options: [{ object: 'Object', property: 'fromEntries', message: '(ES2019)' }],
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
