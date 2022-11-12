/* eslint-disable camelcase */
const { unsupportedFeatures } = require('./compatibility');

it('allows feature in version introduced', () => {
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

  const forbidden = unsupportedFeatures([feature], [{ name: 'chrome', version: '73' }]);
  expect(forbidden).toHaveLength(0);
});

it('forbids feature in version before introduced', () => {
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

  const forbidden = unsupportedFeatures([feature], [{ name: 'chrome', version: '72' }]);
  expect(forbidden[0]).toBe(feature);
});

it('allows feature supported by family in unknown version', () => {
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

  const forbidden = unsupportedFeatures([feature], [{ name: 'chrome', version: '73' }]);
  expect(forbidden).toHaveLength(0);
});

it('forbids feature not supported in any version of family', () => {
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

  const forbidden = unsupportedFeatures([feature], [{ name: 'chrome', version: '73' }]);
  expect(forbidden[0]).toBe(feature);
});

it('allows feature with unknown support by family', () => {
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

  const forbidden = unsupportedFeatures([feature], [{ name: 'chrome', version: '73' }]);
  expect(forbidden).toHaveLength(0);
});

it('allows feature with omitted support entry for mobile target', () => {
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

  const forbidden = unsupportedFeatures(
    [feature],
    [{ name: 'chrome_android', version: '73' }]
  );
  expect(forbidden).toHaveLength(0);
});

it('forbids feature supported by one target but not another', () => {
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

  const forbidden = unsupportedFeatures(
    [feature],
    [
      { name: 'chrome', version: '73' },
      { name: 'firefox', version: '50' },
    ]
  );
  expect(forbidden[0]).toBe(feature);
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

  const primaryForbidden = unsupportedFeatures(
    [feature],
    [{ name: 'nodejs', version: '7.0.0' }]
  );
  expect(primaryForbidden).toHaveLength(0);

  const secondaryForbidden = unsupportedFeatures(
    [feature],
    [{ name: 'nodejs', version: '6.7.0' }]
  );
  expect(secondaryForbidden[0]).toBe(feature);
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
