# native-js-compat

## Classes of features

| Class             | Example                | Static detectability        | Polyfillable |
| ----------------- | ---------------------- | --------------------------- | ------------ |
| Syntax-related    | `{ ...obj }`           | Reliable                    | No           |
| Built-in objects  | `Set`                  | Reliable in practice        | Yes          |
| Static methods    | `Object.fromEntries`   | Reliable in practice        | Yes          |
| Prototype methods | `Array.prototype.flat` | Not without false positives | Yes          |
| Others            | Stable array `sort()`  | No                          |

Note that features may belong to multiple classes; see the ES2020 built-in `BigInt` which has literal syntax.

## Static detectability of recently-added features

⛔ = not statically detectable, or not reliably so

### ES2020 (draft)

| Name                        | ESLint / eslint-plugin-es |
| --------------------------- | ------------------------- |
| `BigInt`                    | es/no-bigint              |
| Dynamic `import()`          | es/no-dynamic-import      |
| `globalThis`                | no-undef                  |
| `Promise.allSettled`        | es/no-promise-all-settled |
| `String.prototype.matchAll` | ⛔                        |

### ES2019

| Name                                  | ESLint / eslint-plugin-es    |
| ------------------------------------- | ---------------------------- |
| `Array.prototype.{flat, flatMap}`     | ⛔                           |
| JSON superset                         | es/no-json-superset          |
| `Object.fromEntries`                  | no-restricted-properties     |
| Optional `catch` binding              | es/no-optional-catch-binding |
| Revised `Function.prototype.toString` | ⛔                           |
| Stable `Array.prototype.sort`         | ⛔                           |
| `String.prototype.trim` methods       | ⛔                           |
| `Symbol.prototype.description`        | ⛔                           |
| Well-formed `JSON.stringify`          | ⛔                           |

### ES2018

| Name                                | ESLint / eslint-plugin-es             |
| ----------------------------------- | ------------------------------------- |
| Async iteration (loop & generators) | es/no-async-iteration                 |
| Object rest and spread operators    | es/no-rest-spread-properties          |
| `Promise.prototype.finally`         | ⛔                                    |
| RegExp look-behind assertions       | es/no-regexp-lookbehind-assertions    |
| RegExp named capture groups         | es/no-regexp-named-capture-groups     |
| RegExp `/s` (dotAll) flag           | es/no-regexp-s-flag                   |
| RegExp Unicode property escapes     | es/no-regexp-unicode-property-escapes |

### ES2017

| Name                                  | ESLint / eslint-plugin-es              |
| ------------------------------------- | -------------------------------------- |
| Async functions                       | es/no-async-functions                  |
| Atomics                               | es/no-atomics                          |
| `Object.getOwnPropertyDescriptors`    | es/no-object-getownpropertydescriptors |
| `Object.entries`                      | es/no-object-entries                   |
| `Object.values`                       | es/no-object-values                    |
| RegExp `/u` flag                      | no-invalid-regexp                      |
| SharedArrayBuffer                     | es/no-shared-array-buffer              |
| `String.prototype.{padStart, padEnd}` | ⛔                                     |
| Trailing commas in parameter lists    | es/no-trailing-function-commas         |

## Compatibility data sources

The best source of language feature compatibility data is MDN's [mdn-browser-compat-data](https://github.com/mdn/browser-compat-data).

It's the data behind the [compatibility tables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Browser_compatibility) in the MDN JavaScript reference. It's also used by [caniuse.com](https://caniuse.com) to supplement its own dataset when it comes to language features. Coverage extends to 15 browsers (including mobile variants) and Node.js. Taking an example ES2018 feature (object rest/spread), it had data for all but the most obscure 4 of those.

Another widely known data source is [kangax/compat-table](https://github.com/kangax/compat-table). Coverage is much lower; fewer browsers are included, and for our example ES2018 feature it only had data for 5 browsers (all of them desktop). It does however include various transpilers and non-browser runtimes.

### Joining mdn-browser-compat-data to browserslist

The major browsers are in both; their desktop variants by the same names, and the mobile ones by differing names. More obscure browsers are missing from one or both. Electron information is indirectly available in the MDN data through the presence of Chrome data.
