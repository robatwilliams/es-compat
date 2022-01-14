<!-- prettier-ignore-start -->
[![npm version](https://badge.fury.io/js/eslint-plugin-ecmascript-compat.svg)](https://badge.fury.io/js/eslint-plugin-ecmascript-compat)
[![npm downloads](https://img.shields.io/npm/dm/eslint-plugin-ecmascript-compat.svg)](http://www.npmtrends.com/eslint-plugin-ecmascript-compat)
<!-- prettier-ignore-end -->

# es-compat

> Check JavaScript code compatibility with target browsers and Node.js versions

Checks that the language features used in your code are supported by your [browserslist](https://github.com/browserslist/browserslist) targets.

## Tools

- [check-es-compat](/packages/check-es-compat/README.md) - standalone CLI tool
- [eslint-plugin-ecmascript-compat](/packages/eslint-plugin-ecmascript-compat/README.md) - ESLint plugin

## Rationale

You might not need a transpiler or polyfills.

[ESLint](https://eslint.org) supports targeting a specific ECMAScript version, and [eslint-plugin-es](https://github.com/mysticatea/eslint-plugin-es) allows forbidding individual language features. However when building applications, what we target are particular browser/runtime versions. This project lets you check compatibility by specifying those targets directly via a browserslist. It will figure out which individual features you can use, by looking up those targets in the [MDN compatibility dataset](https://github.com/mdn/browser-compat-data).

## Scope

ECMAScript language features only; this includes syntax, built-ins, and methods.

It doesn't check browser/runtime-specific APIs (see [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat)), or CSS (see [doiuse](https://github.com/anandthakker/doiuse)).

## ECMAScript version coverage

- ✅ [ES2020](https://v8.dev/features/tags/es2020) (draft)
- ✅ [ES2019](https://flaviocopes.com/es2019)<sup>1, 2</sup>
- ✅ [ES2018](https://flaviocopes.com/es2018)
- ✅ [ES2017](https://flaviocopes.com/es2017)
- ✅ [ES2016](https://flaviocopes.com/es2016)
- ⛔ [ES2015 (ES6)](https://flaviocopes.com/es6)<sup>3</sup>
- ⛔ ES5<sup>4</sup>

<details>
<summary><sup>n</sup> Expand for footnotes...</summary>

<sup>1</sup> Excluding features not statically detectable: revised `Function.prototype.toString`, stable `Array.prototype.sort`, well-formed `JSON.stringify`.

<sup>2</sup> Excluding `Symbol.prototype.description`; as a debug feature, it's not worth the false positives that arise due to its name and not being a method.

<sup>3</sup> ES2015 (ES6) is out of scope; it's been [supported](https://caniuse.com/#feat=es6) by evergreen browsers for many years. Assisting you to continue supporting [IE11](https://death-to-ie11.com/) is not a goal of this tool.

<sup>4</sup> ES5 is out of scope; it's over 10 years old and [supported](https://caniuse.com/es6#feat=es5) even in IE10.

</details>

## Limitations

Because JavaScript is untyped, detection of some features' usage (namely prototype methods) through static analysis requires some assumptions to be made. This shouldn't be a problem as long as you avoid creating your own methods having the same names, or write code in an unusual way to deliberately evade detection.

The MDN compatibility dataset has very good coverage of the top ~6 desktop and mobile browsers, and Node.js (much more than [kangax/compat-table](https://github.com/kangax/compat-table)). In case of missing data (support unknown, or unknown in which version support was added), we currently assume support.

## Contributing

Contributions and [feedback](https://github.com/robatwilliams/es-compat/issues/1) welcome. Please see the GitHub issues or create one, as appropriate.

## Related

- [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat) - for browser APIs
- [doiuse](https://github.com/anandthakker/doiuse) - for CSS
- [eslint-plugin-es](https://github.com/mysticatea/eslint-plugin-es)\*
- [mdn-browser-compat-data](https://github.com/mdn/browser-compat-data)\*

\* Thanks to these projects in particular (and many others) for making this project possible.
