function createDelegatee(config, rootContext) {
  const { definition, options } = config;
  const pollyfils = (rootContext.options && rootContext.options[0] && rootContext.options[0].polyfills) || [];

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

  function matchesPollyfil(data, pollyfil) {
    if (data.message) {
      return data.message.includes(`'${pollyfil}'`)
    }
    if (data.name) {
      return data.name === pollyfil;
    }
    return false;
  }

  function report(params) {
    // Discard fixer; we can't declare the rule as fixable because not all delegatees are.
    // Look up messageId on delegate meta; report() would look it up on root rule meta.
    const { fix, message, messageId, ...otherParams } = params;

    // Skip report if known polyfill exists
    if (params.data && pollyfils.some(pollyfil => matchesPollyfil(params.data, pollyfil))) {
      return;
    }

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
