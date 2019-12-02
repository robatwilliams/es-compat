const eslint = require('eslint');
const { noRestrictedSyntaxPrototypeMethod } = require('../ruleOptionsUtil');

const coreRules = new eslint.Linter().getRules();

exports.noPromiseFinally = {
  definition: coreRules.get('no-restricted-syntax'),
  options: noRestrictedSyntaxPrototypeMethod('Promise.prototype.finally', 'ES2018'),
};
