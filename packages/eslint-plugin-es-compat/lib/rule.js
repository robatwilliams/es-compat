const compatibility = require('./compatibility');
const { createDelegatee, delegatingVisitor } = require('./delegation');

module.exports = {
  meta: {
    schema: [], // no options
  },
  create(context) {
    const delegateeConfigs = compatibility
      .forbiddenFeatures()
      .map(feature => feature.ruleConfig);
    const visitors = delegateeConfigs.map(config => createDelegatee(config, context));

    return delegatingVisitor(visitors);
  },
};
