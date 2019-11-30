# es-native-compat

> Feasibility of statically checking JavaScript code compatibility with target runtime environments

## Questions

### Will this program work there?

(similar: where will this program work?)

It's important to know if it'll work in your targeted browsers/runtimes, and useful to be able to check that quickly and automatically.

Language features are only part of the answer; other features such as APIs and CSS must also be considered. For those, see [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat), [doiuse](https://github.com/anandthakker/doiuse), and polyfills.

### Will this code work there language-wise?

This can be answered with reasonable confidence, but it's not possible to be definitive.

Because JavaScript is untyped, usage of some features isn't directly detectable through static analysis. Some of them (prototype methods) can however be reliably detected if we accept some risk of false detections: the expression `foo.description` may or may not be an usage of the ES2019 feature `Symbol.prototype.description` - it depends on whether or not the value of `foo` is a `Symbol` at runtime.

The more risk of false detections we take, the more definitive our "yes" answer becomes, and the less definitive our "no" answer becomes. And vice versa.

Given a "no" answer, you can always stop using the unsupported features or introduce transpilation. In the case of non-syntax features, you also have the option of polyfilling them.

### How could this code be made more widely compatible?

It'd be useful to know if some compromise on features would allow older runtime versions to be supported.

Once all features used are detected, it's an algorithm against the compatibility data to come up with some suggestions.

## Classes of language features

| Class             | Example                | Static detectability          | Polyfillable |
| ----------------- | ---------------------- | ----------------------------- | ------------ |
| Syntax-related    | `{ ...obj }`           | Reliable                      | No           |
| Built-in objects  | `Set`                  | Reliable in practice          | Yes          |
| Static methods    | `Object.fromEntries`   | Reliable in practice          | Yes          |
| Prototype members | `Array.prototype.flat` | Reliable with false positives | Yes          |
| Others            | Stable array `sort()`  | No                            |

"Reliable in practice" is because it's poor practice to define custom types with the same names as built-ins.

Note that features may belong to multiple classes; see the ES2020 built-in `BigInt` which has literal syntax.

## Static detectability of recently-added features

- ❌ = not statically detectable
- 😐 = statically detectable, but chance of false positives

### ES2020 (draft)

| Name                        | ESLint / eslint-plugin-es |
| --------------------------- | ------------------------- |
| `BigInt`                    | es/no-bigint              |
| Dynamic `import()`          | es/no-dynamic-import      |
| `globalThis`                | no-undef                  |
| `Promise.allSettled`        | es/no-promise-all-settled |
| `String.prototype.matchAll` | 😐 no-restricted-syntax   |

### ES2019

| Name                                  | ESLint / eslint-plugin-es    |
| ------------------------------------- | ---------------------------- |
| `Array.prototype.{flat, flatMap}`     | 😐 no-restricted-syntax      |
| JSON superset                         | es/no-json-superset          |
| `Object.fromEntries`                  | no-restricted-properties     |
| Optional `catch` binding              | es/no-optional-catch-binding |
| Revised `Function.prototype.toString` | ❌                           |
| Stable `Array.prototype.sort`         | ❌                           |
| `String.prototype.trim` methods       | 😐 no-restricted-syntax      |
| `Symbol.prototype.description`        | 😐 no-restricted-syntax      |
| Well-formed `JSON.stringify`          | ❌                           |

### ES2018

| Name                                | ESLint / eslint-plugin-es             |
| ----------------------------------- | ------------------------------------- |
| Async iteration (loop & generators) | es/no-async-iteration                 |
| Object rest and spread operators    | es/no-rest-spread-properties          |
| `Promise.prototype.finally`         | 😐 no-restricted-syntax               |
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
| `String.prototype.{padStart, padEnd}` | 😐 no-restricted-syntax                |
| Trailing commas in parameter lists    | es/no-trailing-function-commas         |

## Compatibility data sources

The best source of language feature compatibility data is MDN's [mdn-browser-compat-data](https://github.com/mdn/browser-compat-data).

It's the data behind the [compatibility tables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Browser_compatibility) in the MDN JavaScript reference. It's also used by [caniuse.com](https://caniuse.com) to supplement its own dataset when it comes to language features. Coverage extends to 15 browsers (including mobile variants) and Node.js. Taking an example ES2018 feature (object rest/spread), it had data for all but the most obscure 4 of those.

Another widely known data source is [kangax/compat-table](https://github.com/kangax/compat-table). Coverage is much lower; fewer browsers are included, and for our example ES2018 feature it only had data for 5 browsers (all of them desktop). It does however include various transpilers and non-browser runtimes.

### Joining mdn-browser-compat-data to browserslist

The major browsers are in both; their desktop variants by the same names, and the mobile ones by differing names. More obscure browsers are missing from one or both. Electron information is indirectly available in the MDN data through the presence of Chrome data.
