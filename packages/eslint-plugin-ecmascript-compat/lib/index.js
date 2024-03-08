import rule from './rule.js';

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
