const compatibility = require('./compatibility');
const { createDelegatee, delegatingVisitor } = require('./delegation');
const features = require('./features');
const targetRuntimes = require('./targetRuntimes');

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
                // This list is hard-coded so it can serve as documentation
                'globalThis',
                '{Array,String,TypedArray}.prototype.at',
                '{Array,TypedArray}.prototype.findLast',
                '{Array,TypedArray}.prototype.toReversed',
                '{Array,TypedArray}.prototype.toSorted',
                '{Array,TypedArray}.prototype.with',
                'Array.prototype.{flat,flatMap}',
                'Array.prototype.includes',
                'Array.prototype.toSpliced',
                'Error.cause',
                'Object.entries',
                'Object.fromEntries',
                'Object.getOwnPropertyDescriptors',
                'Object.hasOwn',
                'Object.values',
                'Promise.prototype.allSettled',
                'Promise.prototype.any',
                'Promise.prototype.finally',
                'String.prototype.matchAll',
                'String.prototype.{padStart,padEnd}',
                'String.prototype.replaceAll',
                'String.prototype.{trimStart,trimEnd}',
              ],
            },
          },
          overrideBrowserslist: {
            oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
          },
          browserslistOptions: {
            type: 'object',
            additionalProperties: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const overrideBrowserslist = context.options?.[0]?.overrideBrowserslist;
    const browserslistOptions = context.options?.[0]?.browserslistOptions;
    const targets = targetRuntimes(overrideBrowserslist, browserslistOptions);
    const unsupportedFeatures = compatibility.unsupportedFeatures(features, targets);

    const polyfills = context.options?.[0]?.polyfills ?? [];

    const visitors = unsupportedFeatures
      .filter((feature) => !polyfills.includes(feature.polyfill))
      .map((feature) => createDelegatee(feature.ruleConfig, context));

    return delegatingVisitor(visitors);
  },
};
