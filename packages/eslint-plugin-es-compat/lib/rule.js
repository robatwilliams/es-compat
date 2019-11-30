const esPlugin = require('eslint-plugin-es');

const delegatees = [esPlugin.rules['no-rest-spread-properties']];

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
    report,
  };

  function report(params) {
    const { message, messageId, ...otherParams } = params;

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
