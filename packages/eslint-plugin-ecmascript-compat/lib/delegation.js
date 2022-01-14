function createDelegatee(config, rootContext) {
  const { definition, options } = config;

  // All methods except report() are added later. Define necessary ones for used rules.
  const contextLaterAddedMethods = {
    getScope: () => rootContext.getScope(),
    getSourceCode: () => rootContext.getSourceCode(),
  };

  // Would use ES Proxy, but context's properties aren't overridable
  const context = {
    ...rootContext,
    ...contextLaterAddedMethods,
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
