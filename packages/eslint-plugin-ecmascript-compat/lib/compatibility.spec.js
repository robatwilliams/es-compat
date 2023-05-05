/* eslint-disable camelcase */
const { unsupportedFeatures } = require('./compatibility');
const features = require('./features');

it('supports feature in version introduced', () => {
  const feature = {
    compatFeatures: [
      {
        __compat: {
          support: {
            chrome: { version_added: '73' },
          },
        },
      },
    ],
  };

  const unsupported = unsupportedFeatures([feature], [{ name: 'chrome', version: '73' }]);
  expect(unsupported).toHaveLength(0);
});

it('doesnt support feature in version before introduced', () => {
  const feature = {
    compatFeatures: [
      {
        __compat: {
          support: {
            chrome: { version_added: '73' },
          },
        },
      },
    ],
  };

  const unsupported = unsupportedFeatures([feature], [{ name: 'chrome', version: '72' }]);
  expect(unsupported[0]).toBe(feature);
});

it('supports feature supported by family in unknown version', () => {
  const feature = {
    compatFeatures: [
      {
        __compat: {
          support: {
            chrome: { version_added: true },
          },
        },
      },
    ],
  };

  const unsupported = unsupportedFeatures([feature], [{ name: 'chrome', version: '73' }]);
  expect(unsupported).toHaveLength(0);
});

it('doesnt support feature not supported in any version of family', () => {
  const feature = {
    compatFeatures: [
      {
        __compat: {
          support: {
            chrome: { version_added: false },
          },
        },
      },
    ],
  };

  const unsupported = unsupportedFeatures([feature], [{ name: 'chrome', version: '73' }]);
  expect(unsupported[0]).toBe(feature);
});

it('supports feature with unknown support by family', () => {
  const feature = {
    compatFeatures: [
      {
        __compat: {
          support: {
            chrome: { version_added: null },
          },
        },
      },
    ],
  };

  const unsupported = unsupportedFeatures([feature], [{ name: 'chrome', version: '73' }]);
  expect(unsupported).toHaveLength(0);
});

it('supports feature with omitted support entry for mobile target', () => {
  const feature = {
    compatFeatures: [
      {
        __compat: {
          support: {
            chrome: { version_added: '73' },
          },
        },
      },
    ],
  };

  const unsupported = unsupportedFeatures(
    [feature],
    [{ name: 'chrome_android', version: '73' }]
  );
  expect(unsupported).toHaveLength(0);
});

it('doesnt support feature supported by one target but not another', () => {
  const feature = {
    compatFeatures: [
      {
        __compat: {
          support: {
            chrome: { version_added: '60' },
            firefox: { version_added: '55' },
          },
        },
      },
    ],
  };

  const unsupported = unsupportedFeatures(
    [feature],
    [
      { name: 'chrome', version: '73' },
      { name: 'firefox', version: '50' },
    ]
  );
  expect(unsupported[0]).toBe(feature);
});

it('uses primary support record where multiple ones exist', () => {
  const feature = {
    compatFeatures: [
      {
        __compat: {
          support: {
            nodejs: [
              { version_added: '7.0.0' },
              {
                version_added: '6.5.0',
                flags: [
                  {
                    type: 'runtime_flag',
                    name: '--harmony',
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  };

  const primaryUnsupported = unsupportedFeatures(
    [feature],
    [{ name: 'nodejs', version: '7.0.0' }]
  );
  expect(primaryUnsupported).toHaveLength(0);

  const secondaryUnsupported = unsupportedFeatures(
    [feature],
    [{ name: 'nodejs', version: '6.7.0' }]
  );
  expect(secondaryUnsupported[0]).toBe(feature);
});

it('explains what the problem is when compat feature not found in MDN data', () => {
  const feature = {
    ruleConfig: {
      definition: {
        meta: {
          docs: { description: 'some rule' },
        },
      },
    },
    compatFeatures: [
      // Unsupported compatFeature first, to test that validation does not short-circuit
      {
        __compat: {
          support: {
            chrome: { version_added: '72' },
          },
        },
      },
      // Typically when wrong path to compatData node used
      undefined,
    ],
  };

  expect(() => {
    unsupportedFeatures([feature], [{ name: 'chrome', version: '73' }]);
  }).toThrow("Sparse compatFeatures for rule 'some rule': object,undefined");
});

it('can rely on all the versions in the compatibility data used being semver or partial semver', () => {
  // We rely on this to avoid having to deal with ranged versions, for simplicity.
  // https://github.com/mdn/browser-compat-data/blob/main/schemas/compat-data-schema.md#ranged-versions

  for (const esFeature of features) {
    for (const compatFeature of esFeature.compatFeatures) {
      // eslint-disable-next-line no-underscore-dangle
      for (const supportStatement of Object.values(compatFeature.__compat.support)) {
        const simpleSupportStatement = Array.isArray(supportStatement)
          ? supportStatement[0]
          : supportStatement;

        if (simpleSupportStatement.version_added !== false) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(simpleSupportStatement.version_added).toMatch(
            /\d+(?<minor>\.\d+(?<patch>\.\d+)?)?/u
          );
        }
      }
    }
  }
});
