import assert from 'node:assert';
import { test } from 'node:test';
import features from './features/index.js';
import rule from './rule.js';

test('polyfills accepted in the schema exactly match those supported', () => {
  const schemaPolyfills = rule.meta.schema[0].properties.polyfills.items.enum;
  const supportedPolyfills = features.flatMap((feature) =>
    feature.polyfill ? [feature.polyfill] : []
  );

  assert.deepStrictEqual(schemaPolyfills.sort(), supportedPolyfills.sort());
});
