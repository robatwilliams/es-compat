import rule from './rule.js';

const plugin = {
  meta: {
    name: 'ecmascript-compat',
  },
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

export default plugin;
