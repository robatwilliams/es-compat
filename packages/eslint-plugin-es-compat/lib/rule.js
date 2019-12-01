const compatibility = require('./compatibility');
const { createDelegatee, delegatingVisitor } = require('./delegation');
const targetRuntimes = require('./targetRuntimes');

module.exports = {
  meta: {
    schema: [], // no options
  },
  create(context) {
    const targets = targetRuntimes();
    const delegateeConfigs = compatibility
      .forbiddenFeatures(targets)
      .map(feature => feature.ruleConfig);
    const visitors = delegateeConfigs.map(config => createDelegatee(config, context));

    return delegatingVisitor(visitors);
  },
};
