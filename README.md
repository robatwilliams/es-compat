# native-js-compat

## Classes of features

| Class             | Example                | Static detectability        |
| ----------------- | ---------------------- | --------------------------- |
| Syntax-related    | `{ ...obj }`           | Reliable                    |
| Built-in objects  | `Set`                  | Reliable in practice        |
| Static methods    | `Object.fromEntries`   | Reliable in practice        |
| Prototype methods | `Array.prototype.flat` | Not without false positives |
| Others            | ?                      |                             |

Note that features may belong to multiple classes; see the ES2020 built-in `BigInt` which has literal syntax.

## Compatibility data sources

The best source of language feature compatibility data is MDN's [mdn-browser-compat-data](https://github.com/mdn/browser-compat-data).

It's the data behind the [compatibility tables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Browser_compatibility) in the MDN JavaScript reference. It's also used by [caniuse.com](https://caniuse.com) to supplement its own dataset when it comes to language features. Coverage extends to 15 browsers (including mobile variants) and Node.js. Taking an example ES2018 feature (object rest/spread), it had data for all but the most obscure 4 of those.

Another widely known data source is [kangax/compat-table](https://github.com/kangax/compat-table). Coverage is much lower; fewer browsers are included, and for our example ES2018 feature it only had data for 5 browsers (all of them desktop). It does however include various transpilers and non-browser runtimes.

### Joining mdn-browser-compat-data to browserslist

The major browsers are in both; their desktop variants by the same names, and the mobile ones by differing names. More obscure browsers are missing from one or both. Electron information is indirectly available in the MDN data through the presence of Chrome data.
