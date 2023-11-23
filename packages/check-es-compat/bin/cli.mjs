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

async function execute(args) {
  const { files, polyfills } = parseArguments(args);
  const eslint = new ESLint({
    // Ignore any config files
    useEslintrc: false,
    ignore: false,

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
        'ecmascript-compat/compat': ['error', { polyfills }],
      },
    },
  });

  const results = await eslint.lintFiles(files);

  const formatter = await eslint.loadFormatter();
  console.log(formatter.format(results));

  return { hasErrors: results.some((result) => result.errorCount > 0) };
}

function parseArguments(args) {
    const files = [];
    const polyfills = [];
    let nextArgIsPolyfills = false;

    for (const arg of args) {
        if (nextArgIsPolyfills) {
            nextArgIsPolyfills = false;
            polyfills.push(...splitPolyfillsArgument(arg));
            continue;
        }

        if (arg.startsWith('--polyfills')) {
            if (arg.startsWith('--polyfills=')) {
                polyfills.push(...splitPolyfillsArgument(arg.slice(12)));
            } else {
                nextArgIsPolyfills = true;
            }

            continue;
        }

        files.push(arg);
    }

    return { files, polyfills };
}

function splitPolyfillsArgument(polyfills) {
    const prototypeAtPolyfill = '{Array,String,TypedArray}.prototype.at';
    const prototypeAtPlaceholder = '{{PROTOTYPEAT}}';

    return polyfills
        .replace(prototypeAtPolyfill, prototypeAtPlaceholder)
        .split(',')
        .map(polyfill => polyfill === prototypeAtPlaceholder ? prototypeAtPolyfill : polyfill);
}
