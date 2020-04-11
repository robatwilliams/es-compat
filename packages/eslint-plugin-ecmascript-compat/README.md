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
    "ecmascript-compat/compat": "error"
  }
}
```

```
// .browserslistrc
Chrome >= 64
Firefox >= 58
```

For example usage, see sibling directory: `eslint-plugin-ecmascript-compat-example`

<!--- Absolute link, in order to work from NPM website --->

➡ For more information, see the [main readme](https://github.com/robatwilliams/es-compat#readme).
