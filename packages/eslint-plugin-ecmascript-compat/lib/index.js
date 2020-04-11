module.exports = {
  configs: {
    recommended: {
      plugins: ['ecmascript-compat'],
      rules: {
        'ecmascript-compat/compat': 'error',
      },
    },
  },
  rules: {
    compat: require('./rule'),
  },
};
