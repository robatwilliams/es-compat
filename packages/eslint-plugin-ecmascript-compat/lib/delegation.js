function createDelegatee(config, rootContext) {
  const { definition, options } = config;

  if (!definition) {
    // May need to update the es-x dependency, or check that the lookup name is not
    // prefixed with es-x/
    throw new Error('Rule instance not given');
  }

  // All except report() are added later. Define necessary ones for used rules.
  // https://eslint.org/docs/latest/extend/custom-rules#the-context-object
  const contextLaterAdded = {
    getScope: () => rootContext.getScope(),
    getSourceCode: () => rootContext.getSourceCode(),

    get settings() {
      return rootContext.settings;
    },

    get parserServices() {
      return rootContext.parserServices;
    },
  };

  // Would use ES Proxy, but context's properties aren't overridable
  const context = {
    ...rootContext,
    ...contextLaterAdded,
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

  delegatees.forEach((visitor) => {
    for (const [key] of Object.entries(visitor)) {
      delegator[key] = (...args) => delegate(key, args);
    }
  });

  function delegate(key, args) {
    delegatees.forEach((visitor) => {
      if (visitor[key]) {
        visitor[key](...args);
      }
    });
  }

  return delegator;
}

module.exports = { createDelegatee, delegatingVisitor };
