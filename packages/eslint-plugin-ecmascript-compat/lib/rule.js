import * as compatibility from './compatibility.js';
import { createDelegatee, delegatingVisitor } from './delegation.js';
import features from './features/index.js';
import targetRuntimes from './targetRuntimes.js';

export default {
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
                'Array.prototype.flat',
                'Array.prototype.flatMap',
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
