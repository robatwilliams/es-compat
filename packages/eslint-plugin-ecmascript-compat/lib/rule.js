const compatibility = require('./compatibility');
const { createDelegatee, delegatingVisitor } = require('./delegation');
const features = require('./features');
const targetRuntimes = require('./targetRuntimes');

const targets = targetRuntimes();
const unsupportedFeatures = compatibility.unsupportedFeatures(features, targets);

module.exports = {
  meta: {
    type: 'problem',
    schema: [
      {
        type: 'object',
        properties: {
          polyfills: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'globalThis',
                'BigInt',
                '{Array,String,TypedArray}.prototype.at',
                'Array.prototype.flat',
                'Array.prototype.flatMap',
                'Array.prototype.includes',
                'Object.entries',
                'Object.fromEntries',
                'Object.getOwnPropertyDescriptors',
                'Object.values',
                'Promise.prototype.allSettled',
                'Promise.prototype.any',
                'Promise.prototype.finally',
                'String.prototype.matchAll',
                'String.prototype.padEnd',
                'String.prototype.padStart',
                'String.prototype.replaceAll',
                'String.prototype.trimEnd',
                'String.prototype.trimLeft',
                'String.prototype.trimRight',
                'String.prototype.trimStart',
              ],
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const polyfills = context.options?.[0]?.polyfills ?? [];

    const visitors = unsupportedFeatures
      .filter((feature) => !polyfills.includes(feature.polyfill))
      .map((feature) => createDelegatee(feature.ruleConfig, context));

    return delegatingVisitor(visitors);
  },
};
