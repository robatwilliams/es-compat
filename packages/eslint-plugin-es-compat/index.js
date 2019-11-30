const esPlugin = require('eslint-plugin-es');

module.exports = {
  rules: {
    compat: esPlugin.rules['no-rest-spread-properties'],
  },
};
