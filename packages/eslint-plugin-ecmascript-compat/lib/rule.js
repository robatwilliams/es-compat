const compatibility = require('./compatibility');
const { createDelegatee, delegatingVisitor } = require('./delegation');
const features = require('./features');
const targetRuntimes = require('./targetRuntimes');

const targets = targetRuntimes();
const delegateeConfigs = compatibility
  .forbiddenFeatures(features, targets)
  .map((feature) => feature.ruleConfig);

module.exports = {
  meta: {
    type: 'problem',
    schema: [], // no options
  },
  create(context) {
    const visitors = delegateeConfigs.map((config) => createDelegatee(config, context));

    return delegatingVisitor(visitors);
  },
};
