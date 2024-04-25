import compat from 'eslint-plugin-ecmascript-compat';
import globals from 'globals';

export default [
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        globals: globals.es2021,
      },
    },
    plugins: {
      'ecmascript-compat': compat,
    },
    rules: {
      'ecmascript-compat/compat': 'error',
    },
  },
];
