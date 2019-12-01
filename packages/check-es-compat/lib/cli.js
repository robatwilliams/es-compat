#!/usr/bin/env node
const eslint = require('eslint');

const eslintCLI = new eslint.CLIEngine({
  useEslintrc: false, // ignore any config files
  plugins: ['es-compat'],
  parserOptions: { ecmaVersion: 2020 },
  rules: {
    'es-compat/compat': 'error',
  },
});

const report = eslintCLI.executeOnFiles(['.']);

const formatter = eslintCLI.getFormatter();
console.log(formatter(report.results));

if (report.errorCount > 0) {
  process.exitCode = 1;
} else {
  console.log('No issues found. Files analysed are compatible with the target runtimes.');
}
