import rule from './rule';

export default {
  configs: {
    recommended: {
      plugins: ['ecmascript-compat'],
      rules: {
        'ecmascript-compat/compat': 'error',
      },
    },
  },
  rules: {
    compat: rule,
  },
};
