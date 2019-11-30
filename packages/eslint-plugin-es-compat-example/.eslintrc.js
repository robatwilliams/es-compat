module.exports = {
  root: true,
  plugins: ['es'],
  parserOptions: { ecmaVersion: 2020 },
  rules: {
    'es/no-rest-spread-properties': 'error',
  },
};
