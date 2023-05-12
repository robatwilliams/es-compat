const features = require('./features');
const rule = require('./rule');

test('polyfills accepted in the schema exactly match those supported', () => {
  const schemaPolyfills = rule.meta.schema[0].properties.polyfills.items.enum;
  const supportedPolyfills = features.flatMap((feature) =>
    feature.polyfill ? [feature.polyfill] : []
  );

  expect(schemaPolyfills.sort()).toEqual(supportedPolyfills.sort());
});
