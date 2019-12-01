# es-compat

> Check JavaScript code compatibility with target browsers and Node.js versions

Checks that the language features used in your code are [supported](https://github.com/mdn/browser-compat-data) by your [browserslist](https://github.com/browserslist/browserslist) targets.

## Tools

- [check-es-compat](/packages/check-es-compat/README.md) - standalone CLI tool
- [eslint-plugin-es-compat](/packages/eslint-plugin-es-compat/README.md) - ESLint plugin

## Rationale

[ESLint](https://eslint.org) supports targeting a specific ECMAScript version, and [eslint-plugin-es](https://github.com/mysticatea/eslint-plugin-es) allows forbidding individual language features. However when building applications, what we target are particular browser/runtime versions. This project lets you check compatibility by specifying those targets directly via a browserslist. It will figure out which individual features you can use, by looking up those targets in the MDN compatibility dataset.

## Scope

The scope of this project is ECMAScript language features; this includes syntax, built-ins, and methods. It doesn't check browser/runtime-specific APIs (see [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat)), or CSS (see [doiuse](https://github.com/anandthakker/doiuse)).

## ECMAScript version coverage

- ❌ [ES2020](https://v8.dev/features/tags/es2020) (draft)
- ✅ [ES2019](https://flaviocopes.com/es2019)<sup>1</sup>
- ✅ [ES2018](https://flaviocopes.com/es2018)
- ❌ [ES2017](https://flaviocopes.com/es2017)
- ❌ [ES2016](https://flaviocopes.com/es2016)
- ❌ [ES2015 (ES6)](https://flaviocopes.com/es6)
- ⛔ ES5

Contributions welcome to fill the gaps - it's mostly straightforward joining-up of the features list, existing ESLint rules, and the compatibility data.

<sup>1</sup>Excluding non-detectable features: revised `Function.prototype.toString`, stable `Array.prototype.sort`, well-formed `JSON.stringify`.

## Limitations

Because JavaScript is untyped, detection of some features' usage (namely prototype methods) through static analysis requires some assumptions to be made. This shouldn't be a problem as long as you avoid creating your own methods having the same names, or write code in an unusual way to deliberately evade detection.

The MDN compatibility dataset has very good coverage of the top ~6 desktop and mobile browsers, and Node.js. In case of missing data (support unknown, or unknown in which version support was added), we currently assume support.

## Backlog

### Tools

- Use browserslist for target browsers/runtimes (needs names mapping)
- ES2020 features
- ES2017 features
- Log reason(s) for forbidden features (enableable)
- Publish betas to NPM

### Meta

- Comment on [module-requests#103](https://github.com/sindresorhus/module-requests/issues/103), [eslint-plugin-es#22](https://github.com/mysticatea/eslint-plugin-es/issues/22), [eslint-plugin-compat#206](https://github.com/amilajack/eslint-plugin-compat/issues/206)

### Future ideas

- Option to forbid features if compatibility data is missing for a target runtime
- Given no targets, report where the code will work
- Provide suggestions on how to make code more widely compatible

## Contributing

Contributions (code, bug reports, ideas...) and feedback welcome. Please create an issue or submit a PR.

## License

es-compat tools, Copyright (C) Robat Williams

This project is licensed under the terms of the [MIT](https://choosealicense.com/licenses/mit) license.

## Related

- [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat) - for browser APIs
- [doiuse](https://github.com/anandthakker/doiuse) - for CSS
- [eslint-plugin-es](https://github.com/mysticatea/eslint-plugin-es)\*
- [mdn-browser-compat-data](https://github.com/mdn/browser-compat-data)\*

\* Thanks to these projects in particular (and many other mainstream ones) for making this project possible.
