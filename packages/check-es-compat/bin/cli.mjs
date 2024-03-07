#!/usr/bin/env node
/* eslint-disable no-console */
import { ESLint } from 'eslint';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: check-es-compat file.js [file.js] [dir]');
  process.exitCode = 1;
} else {
  const { hasErrors } = await execute(args);

  if (hasErrors) {
    process.exitCode = 1;
  } else {
    console.log('No issues found. Files are compatible with the target runtimes.');
  }
}

async function execute(files) {
  const eslint = new ESLint({
    // Ignore any config; it's for project's own linting rather than this tool.
    useEslintrc: false,
    ignore: false,
    allowInlineConfig: false,

    baseConfig: {
      plugins: ['ecmascript-compat'],
      parserOptions: {
        // Latest version, so all features work
        ecmaVersion: 2023,
      },
      env: {
        // Latest globals, so all features work
        es2023: true,
      },
      rules: {
        'ecmascript-compat/compat': 'error',
      },
    },
  });

  const results = await eslint.lintFiles(files);

  const formatter = await eslint.loadFormatter();
  console.log(formatter.format(results));

  return { hasErrors: results.some((result) => result.errorCount > 0) };
}
