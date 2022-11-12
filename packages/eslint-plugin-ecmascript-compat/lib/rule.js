const compatibility = require('./compatibility');
const { createDelegatee, delegatingVisitor } = require('./delegation');
const features = require('./features');
const polyfilling = require('./polyfilling');
const targetRuntimes = require('./targetRuntimes');

const targets = targetRuntimes();
const unsupportedFeatures = compatibility.unsupportedFeatures(features, targets);

module.exports = {
  meta: {
    type: 'problem',
    schema: [
      {
        'type': 'object',
        'properties': {
          'polyfills': {
            'type': 'array',
            'items': {
              'type': 'string'
            }
          }
        },
        'additionalProperties': 'false',
      }
    ]
  },
  create(context) {
      const polyfills = context.options?.[0]?.polyfills;
      const validFeatures = unsupportedFeatures.filter(feature => !polyfilling.isPolyfilled(feature, polyfills));

      const delegateeConfigs = validFeatures.map((feature) => feature.ruleConfig);
      const visitors = delegateeConfigs.map((config) => createDelegatee(config, context));

      return delegatingVisitor(visitors);
  },
};
