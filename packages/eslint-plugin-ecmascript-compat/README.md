<!-- prettier-ignore-start -->
[![npm version](https://badge.fury.io/js/eslint-plugin-ecmascript-compat.svg)](https://badge.fury.io/js/eslint-plugin-ecmascript-compat)
[![npm downloads](https://img.shields.io/npm/dm/eslint-plugin-ecmascript-compat.svg)](http://www.npmtrends.com/eslint-plugin-ecmascript-compat)
<!-- prettier-ignore-end -->

# eslint-plugin-ecmascript-compat

> ESLint plugin for checking JavaScript code compatibility with target browsers and Node.js versions

```bash
npm install --save-dev eslint-plugin-ecmascript-compat
```

```json
// .eslintrc.json
{
  "extends": ["plugin:ecmascript-compat/recommended"]
}

// Alternatively
{
  "plugins": ["ecmascript-compat"],
  "rules": {
    "ecmascript-compat/compat": [
      "error",
      {
        // Optionally, specify provided polyfills
        "polyfills": [
          "Array.prototype.includes"
        ],
        // Optionally, provide a browserslist to use instead of the project one
        "overrideBrowserslist": "IE >= 11",
        // Optionally, specify browserslist options - see https://github.com/browserslist/browserslist#js-api
        "browserslistOptions": { "env": "legacy" }
      }
    ]
  }
}
```

```
// .browserslistrc
Chrome >= 64
Firefox >= 58
```

<!--- Absolute link, in order to work from NPM website --->

The optional `polyfills` option is used to specify polyfills that your application loads. These features are therefore considered supported in all browsers. Features that are polyfillable and can be specified here can be found in the [rule schema](https://github.com/robatwilliams/es-compat/blob/master/packages/eslint-plugin-ecmascript-compat/lib/rule.js).

For example usage, see sibling directory: `eslint-plugin-ecmascript-compat-example`

<!--- Absolute link, in order to work from NPM website --->

➡ For more information, see the [main readme](https://github.com/robatwilliams/es-compat#readme).
