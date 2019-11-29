# native-js-compat

## Compatibility data sources

The best source of language feature compatibility data is MDN's [mdn-browser-compat-data](https://github.com/mdn/browser-compat-data).

It's the data behind the [compatibility tables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Browser_compatibility) in the MDN JavaScript reference. It's also used by [caniuse.com](https://caniuse.com) to supplement its own dataset when it comes to language features. Coverage extends to 15 browsers (including mobile variants) and Node.js. Taking an example ES2018 feature (object rest/spread), it had data for all but the most obscure 4 of those.

Another widely known data source is [kangax/compat-table](https://github.com/kangax/compat-table). Coverage is much lower; fewer browsers are included, and for our example ES2018 feature it only had data for 5 browsers (all of them desktop). It does however include various transpilers and non-browser runtimes.
