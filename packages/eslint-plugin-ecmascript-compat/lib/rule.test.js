const assert = require('node:assert');
const { test } = require('node:test');
const features = require('./features');
const rule = require('./rule');

test('polyfills accepted in the schema exactly match those supported', () => {
  const schemaPolyfills = rule.meta.schema[0].properties.polyfills.items.enum;
  const supportedPolyfills = features.flatMap((feature) =>
    feature.polyfill ? [feature.polyfill] : []
  );

  assert.deepStrictEqual(schemaPolyfills.sort(), supportedPolyfills.sort());
});
