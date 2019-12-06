#!/usr/bin/env node
/* eslint-disable no-console */
const eslint = require('eslint');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: check-es-compat file.js [file.js] [dir]');
  process.exitCode = 1;
} else {
  const { hasErrors } = execute(args);

  if (hasErrors) {
    process.exitCode = 1;
  } else {
    console.log('No issues found. Files are compatible with the target runtimes.');
  }
}

function execute(files) {
  const eslintCLI = new eslint.CLIEngine({
    useEslintrc: false, // ignore any config files
    plugins: ['ecmascript-compat'],
    parserOptions: {
      // Latest version, so all features work
      ecmaVersion: 2020,
    },
    globals: [
      // ES2017 global, required by es/no-atomics
      'Atomics:readonly',

      // ES2020 global, required by es/no-bigint
      'BigInt:readonly',

      // ES2017 global, required by es/no-shared-array-buffer
      'SharedArrayBuffer:readonly',

      // ES6 global, required by no-promise-all-settled
      'Promise:readonly',
    ],
    rules: {
      'ecmascript-compat/compat': 'error',
    },
  });

  const report = eslintCLI.executeOnFiles(files);

  const formatter = eslintCLI.getFormatter();
  console.log(formatter(report.results));

  return { hasErrors: report.errorCount > 0 };
}
