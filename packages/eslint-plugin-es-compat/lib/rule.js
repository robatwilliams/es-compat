const eslint = require('eslint');
const esPlugin = require('eslint-plugin-es');

const eslintCoreRules = new eslint.Linter().getRules();

const delegatees = [
  {
    definition: eslintCoreRules.get('no-restricted-properties'),
    options: [{ object: 'Object', property: 'fromEntries', message: '(ES2019)' }],
  },
  {
    definition: eslintCoreRules.get('no-restricted-syntax'),
    options: [
      {
        selector: 'CallExpression[callee.property.name="flat"]',
        message: "ES2019 method 'Array.prototype.flat' is forbidden",
      },
      {
        selector: 'CallExpression[callee.property.name="flatMap"]',
        message: "ES2019 method 'Array.prototype.flatMap' is forbidden",
      },
    ],
  },
  { definition: esPlugin.rules['no-json-superset'] },
  { definition: esPlugin.rules['no-optional-catch-binding'] },
  { definition: esPlugin.rules['no-rest-spread-properties'] },
];

module.exports = {
  meta: {
    schema: [], // no options
  },
  create(context) {
    const visitors = delegatees.map(config => createDelegatee(config, context));

    return delegatingVisitor(visitors);
  },
};

function createDelegatee(config, rootContext) {
  const { definition, options } = config;

  const context = {
    ...rootContext,
    getSourceCode: () => rootContext.getSourceCode(), // ESLint adds this later
    options,
    report,
  };

  function report(params) {
    // Discard fixer; we can't declare the rule as fixable because not all delegatees are.
    // Look up messageId on delegate meta; report() would look it up on root rule meta.
    const { fix, message, messageId, ...otherParams } = params;

    rootContext.report({
      ...otherParams,
      message: messageId ? definition.meta.messages[messageId] : message,
    });
  }

  return definition.create(context);
}

function delegatingVisitor(delegatees) {
  const delegator = {};

  delegatees.forEach(visitor => {
    for (const [key] of Object.entries(visitor)) {
      delegator[key] = (...args) => delegate(key, args);
    }
  });

  function delegate(key, args) {
    delegatees.forEach(visitor => {
      if (visitor[key]) {
        visitor[key](...args);
      }
    });
  }

  return delegator;
}
