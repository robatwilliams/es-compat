# ECMAScript features by version

Static detectability of recently-added features

- ❌ = not statically detectable
- 😐 = statically detectable, but chance of false positives
- 👎 = statically detectable, but not worth the false positives

### ES2022

| Name                                         | ESLint / eslint-plugin-es                    | Chrome since  |
| -------------------------------------------- | -------------------------------------------- | ------------- |
| Arbitrary module namespace names             | es-x/no-arbitrary-module-namespace-names     | see issue #62 |
| `{Array, String, TypedArray}.prototype.at()` | 😐 es-x/no-array-string-prototype-at         | 92            |
| Class fields                                 | es-x/no-class-fields                         | 72, 74        |
| Class static initialization block            | es-x/no-class-static-block                   | 94            |
| Error `cause`                                | es-x/no-error-cause                          | 93            |
| `Object.hasOwn`                              | es-x/no-object-hasown                        | 93            |
| Private slot checks (`#x in obj`)            | es-x/no-private-in                           | 91            |
| Top-level `await`                            | es-x/no-top-level-await                      | 89            |
| RegExp match indices (`/d` flag)             | es-x/no-regexp-d-flag                        | 90            |
| RegExp Unicode property escapes (2022)       | es-x/no-regexp-unicode-property-escapes-2022 | see issue #63 |

### ES2021

| Name                                   | ESLint / eslint-plugin-es                    | Chrome since  |
| -------------------------------------- | -------------------------------------------- | ------------- |
| Logical Assignment \|\|=, \&\&=, ??=   | es/no-logical-assignment-operators           | 85            |
| Numeric separators                     | es/no-numeric-separators                     | 75            |
| `Promise.any`                          | es/no-promise-any                            | 85            |
| RegExp Unicode property escapes (2021) | es-x/no-regexp-unicode-property-escapes-2021 | see issue #63 |
| `String.prototype.replaceAll`          | 😐 no-restricted-properties                  | 85            |
| `WeakRef and FinalizationRegistry`     | es/no-weakrefs                               | 84            |

### ES2020

| Name                                   | ESLint / eslint-plugin-es                    | Chrome since  |
| -------------------------------------- | -------------------------------------------- | ------------- |
| `Atomics.{notify, wait}`               | no-restricted-properties                     | 68            |
| `BigInt`                               | es/no-bigint                                 | 67            |
| Dynamic `import()`                     | es/no-dynamic-import                         | 63            |
| `globalThis`                           | es/no-global-this                            | 71            |
| `import.meta`                          | es/no-import-meta                            | 64            |
| Module namespace exports               | es/no-export-ns-from                         | 72            |
| Nullish coalescing (`??`)              | es/no-nullish-coalescing-operators           | 80            |
| Optional chaining (`?.`)               | es/no-optional-chaining                      | 80            |
| `Promise.allSettled`                   | es/no-promise-all-settled                    | 76            |
| RegExp Unicode property escapes (2020) | es-x/no-regexp-unicode-property-escapes-2020 | see issue #63 |
| `String.prototype.matchAll`            | 😐 no-restricted-syntax                      | 73            |

### ES2019

| Name                                   | ESLint / eslint-plugin-es                    | Chrome since  |
| -------------------------------------- | -------------------------------------------- | ------------- |
| `Array.prototype.{flat, flatMap}`      | 😐 no-restricted-syntax                      | 69            |
| JSON superset                          | es/no-json-superset                          | 66            |
| `Object.fromEntries`                   | es/no-object-fromentries                     | 73            |
| Optional `catch` binding               | es/no-optional-catch-binding                 | 66            |
| Revised `Function.prototype.toString`  | ❌                                           |
| Stable `Array.prototype.sort`          | ❌                                           |
| RegExp Unicode property escapes (2019) | es-x/no-regexp-unicode-property-escapes-2019 | see issue #63 |
| `String.prototype.trimX` methods       | 😐 no-restricted-syntax                      | 66            |
| `Symbol.prototype.description`         | 👎 no-restricted-syntax                      | 70            |
| Well-formed `JSON.stringify`           | ❌                                           |

### ES2018

| Name                                   | ESLint / eslint-plugin-es             | Chrome since |
| -------------------------------------- | ------------------------------------- | ------------ |
| Async iteration (loop & generators)    | es/no-async-iteration                 | 63           |
| Object rest and spread operators       | es/no-rest-spread-properties          | 60           |
| `Promise.prototype.finally`            | 😐 no-restricted-syntax               | 63           |
| RegExp look-behind assertions          | es/no-regexp-lookbehind-assertions    | 62           |
| RegExp named capture groups            | es/no-regexp-named-capture-groups     | 64           |
| RegExp `/s` (dotAll) flag              | es/no-regexp-s-flag                   | 62           |
| RegExp Unicode property escapes (2018) | es/no-regexp-unicode-property-escapes | 64           |

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
