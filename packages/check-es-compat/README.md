<!-- prettier-ignore-start -->
[![npm version](https://badge.fury.io/js/check-es-compat.svg)](https://badge.fury.io/js/check-es-compat)
[![npm downloads](https://img.shields.io/npm/dm/check-es-compat.svg)](http://www.npmtrends.com/check-es-compat)
<!-- prettier-ignore-end -->

# check-es-compat

> CLI tool for checking JavaScript code compatibility with target browsers and Node.js versions

```bash
$ npx check-es-compat .
```

```
// .browserslistrc
Chrome >= 64
Firefox >= 58
```

<!--- Absolute link, in order to work from NPM website --->

The optional `--polyfills` argument can be used to specify polyfills that your application loads. These features are
therefore considered supported in all browsers. Features that are polyfillable and can be specified here can be found
in the [rule schema](https://github.com/robatwilliams/es-compat/blob/master/packages/eslint-plugin-ecmascript-compat/lib/rule.js).

```bash
$ npx check-es-compat . --polyfills="Array.prototype.includes,Promise.prototype.finally"
```

<!--- Absolute link, in order to work from NPM website --->

It [doesn't currently support](https://github.com/robatwilliams/es-compat/issues/69) ES modules.

<!--- Absolute link, in order to work from NPM website --->

➡ For more information, see the [main readme](https://github.com/robatwilliams/es-compat#readme).
