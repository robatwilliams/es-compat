# ECMAScript features by version

Static detectability of recently-added features

- ❌ = not statically detectable
- 😐 = statically detectable, but chance of false positives
- 👎 = statically detectable, but not worth the false positives

### ES2020

| Name                                | ESLint / eslint-plugin-es          | Chrome since |
| ----------------------------------- | ---------------------------------- | ------------ |
| `Atomics.{notify, wait, waitAsync}` | ❌                                 | 68           |
| `BigInt`                            | es/no-bigint                       | 67           |
| Dynamic `import()`                  | es/no-dynamic-import               | 63           |
| `globalThis`                        | es/no-global-this                  | 71           |
| `import.meta`                       | es/no-import-meta                  | 64           |
| Module namespace exports            | es/no-export-ns-from               | 72           |
| Nullish coalescing (`??`)           | es/no-nullish-coalescing-operators | 80           |
| Optional chaining (`?.`)            | es/no-optional-chaining            | 80           |
| `Promise.allSettled`                | es/no-promise-all-settled          | 76           |
| `String.prototype.matchAll`         | 😐 no-restricted-syntax            | 73           |

### ES2019

| Name                                  | ESLint / eslint-plugin-es    | Chrome since |
| ------------------------------------- | ---------------------------- | ------------ |
| `Array.prototype.{flat, flatMap}`     | 😐 no-restricted-syntax      | 69           |
| JSON superset                         | es/no-json-superset          | 66           |
| `Object.fromEntries`                  | no-restricted-properties     | 73           |
| Optional `catch` binding              | es/no-optional-catch-binding | 66           |
| Revised `Function.prototype.toString` | ❌                           |
| Stable `Array.prototype.sort`         | ❌                           |
| `String.prototype.trimX` methods      | 😐 no-restricted-syntax      | 66           |
| `Symbol.prototype.description`        | 👎 no-restricted-syntax      | 70           |
| Well-formed `JSON.stringify`          | ❌                           |

### ES2018

| Name                                | ESLint / eslint-plugin-es             | Chrome since |
| ----------------------------------- | ------------------------------------- | ------------ |
| Async iteration (loop & generators) | es/no-async-iteration                 | 63           |
| Object rest and spread operators    | es/no-rest-spread-properties          | 60           |
| `Promise.prototype.finally`         | 😐 no-restricted-syntax               | 63           |
| RegExp look-behind assertions       | es/no-regexp-lookbehind-assertions    | 62           |
| RegExp named capture groups         | es/no-regexp-named-capture-groups     | 64           |
| RegExp `/s` (dotAll) flag           | es/no-regexp-s-flag                   | 62           |
| RegExp Unicode property escapes     | es/no-regexp-unicode-property-escapes | 64           |

### ES2017

| Name                                  | ESLint / eslint-plugin-es              | Chrome since |
| ------------------------------------- | -------------------------------------- | ------------ |
| Async functions                       | es/no-async-functions                  | 55           |
| Atomics                               | es/no-atomics                          | 68           |
| `Object.entries`                      | es/no-object-entries                   | 54           |
| `Object.getOwnPropertyDescriptors`    | es/no-object-getownpropertydescriptors | 54           |
| `Object.values`                       | es/no-object-values                    | 54           |
| SharedArrayBuffer                     | es/no-shared-array-buffer              | 68           |
| `String.prototype.{padStart, padEnd}` | 😐 no-restricted-syntax                | 57           |
| Trailing commas in parameter lists    | es/no-trailing-function-commas         | 58           |

### ES2016

| Name                       | ESLint / eslint-plugin-es   | Chrome since |
| -------------------------- | --------------------------- | ------------ |
| `Array.prototype.includes` | 😐 no-restricted-syntax     | 47           |
| Exponentiation operator    | es/no-exponential-operators | 52           |
