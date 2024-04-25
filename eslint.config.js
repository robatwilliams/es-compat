import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import-x';
import pluginNode from 'eslint-plugin-n';
import configPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['packages/eslint-plugin-ecmascript-compat-example/*'],
  },
  pluginNode.configs['flat/recommended-module'],
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      sourceType: 'module',
    },
    plugins: {
      'import-x': pluginImport,
    },
    rules: {
      ...js.configs.all.rules,
      ...configPrettier.rules,
      'capitalized-comments': 'off',
      'global-require': 'off',
      'init-declarations': 'off',
      'line-comment-position': 'off',
      'multiline-comment-style': 'off',
      'no-eq-null': 'off',
      'no-inline-comments': 'off',
      'no-magic-numbers': 'off',
      'no-plusplus': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'one-var': 'off',
      'sort-imports': 'off', // using import/order instead
      'sort-keys': 'off',
      strict: 'off',

      // eslint:all - Modify default options
      eqeqeq: ['error', 'always', { null: 'never' }],
      'func-names': ['error', 'as-needed'],
      'func-style': ['error', 'declaration'],
      'id-length': ['error', { exceptions: ['_', 'a', 'b', 'i'] }],
      'no-unused-vars': ['error', { ignoreRestSiblings: true }],
      'no-use-before-define': ['error', 'nofunc'],
      'spaced-comment': ['error', 'always', { block: { balanced: true } }],

      // eslint:all & prettier - Re-enable some of the rules
      // that are compatible when certain options are used
      //   (https://github.com/prettier/eslint-config-prettier#special-rules)
      curly: 'error',
      'max-len': ['error', { code: 1000, comments: 90, ignoreUrls: true }],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],

      // eslint:all - Rules whose default options do nothing.
      // Options need to be compatible with Prettier.
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: ['cjs-export'] },

        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],

      'import-x/newline-after-import': 'error',
      'import-x/no-extraneous-dependencies': 'error',
      'import-x/order': ['error', { 'newlines-between': 'never' }],
    },
  },
];
