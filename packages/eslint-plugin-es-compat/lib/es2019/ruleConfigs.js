const eslint = require('eslint');
const esPlugin = require('eslint-plugin-es');

const coreRules = new eslint.Linter().getRules();

exports.noArrayFlatMethods = {
  definition: coreRules.get('no-restricted-syntax'),
  options: [
    {
      selector: 'CallExpression[callee.property.name="flat"]',
      message: "ES2019 method 'Array.prototype.flat' is forbidden",
    },
    {
      selector:
        'MemberExpression[object.object.name="Array"][object.property.name="prototype"][property.name="flat"]',
      message: "ES2019 method 'Array.prototype.flat' is forbidden",
    },
    {
      selector: 'CallExpression[callee.property.name="flatMap"]',
      message: "ES2019 method 'Array.prototype.flatMap' is forbidden",
    },
    {
      selector:
        'MemberExpression[object.object.name="Array"][object.property.name="prototype"][property.name="flatMap"]',
      message: "ES2019 method 'Array.prototype.flatMap' is forbidden",
    },
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
    {
      selector: 'CallExpression[callee.property.name="trimLeft"]',
      message: "ES2019 method 'String.prototype.trimLeft' is forbidden",
    },
    {
      selector:
        'MemberExpression[object.object.name="String"][object.property.name="prototype"][property.name="trimLeft"]',
      message: "ES2019 method 'String.prototype.trimLeft' is forbidden",
    },
    {
      selector: 'CallExpression[callee.property.name="trimRight"]',
      message: "ES2019 method 'String.prototype.trimRight' is forbidden",
    },
    {
      selector:
        'MemberExpression[object.object.name="String"][object.property.name="prototype"][property.name="trimRight"]',
      message: "ES2019 method 'String.prototype.trimRight' is forbidden",
    },
    {
      selector: 'CallExpression[callee.property.name="trimStart"]',
      message: "ES2019 method 'String.prototype.trimStart' is forbidden",
    },
    {
      selector:
        'MemberExpression[object.object.name="String"][object.property.name="prototype"][property.name="trimStart"]',
      message: "ES2019 method 'String.prototype.trimStart' is forbidden",
    },
    {
      selector: 'CallExpression[callee.property.name="trimEnd"]',
      message: "ES2019 method 'String.prototype.trimEnd' is forbidden",
    },
    {
      selector:
        'MemberExpression[object.object.name="String"][object.property.name="prototype"][property.name="trimEnd"]',
      message: "ES2019 method 'String.prototype.trimEnd' is forbidden",
    },
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
