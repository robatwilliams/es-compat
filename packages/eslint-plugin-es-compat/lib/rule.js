const esPlugin = require('eslint-plugin-es');

const delegatees = [
  esPlugin.rules['no-json-superset'],
  esPlugin.rules['no-optional-catch-binding'],
  esPlugin.rules['no-rest-spread-properties'],
];

module.exports = {
  meta: {
    schema: [], // no options
  },
  create(context) {
    const visitors = delegatees.map(definition => createDelegatee(definition, context));

    return delegatingVisitor(visitors);
  },
};

function createDelegatee(definition, rootContext) {
  const context = {
    ...rootContext,
    getSourceCode: () => rootContext.getSourceCode(), // ESLint adds this later
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
