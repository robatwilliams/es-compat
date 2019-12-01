# es-compat

> Check JavaScript code compatibility with target browsers and Node.js versions

Checks that the language features used in your code are [supported](https://github.com/mdn/browser-compat-data) by your [browserslist](https://github.com/browserslist/browserslist) targets.

## Tools

- [check-es-compat](/packages/check-es-compat/README.md) - standalone CLI tool
- [eslint-plugin-es-compat](/packages/eslint-plugin-es-compat/README.md) - ESLint plugin

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

- Document supported ES versions
- Document rationale
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

- [eslint-plugin-es](https://github.com/mysticatea/eslint-plugin-es)\*
- [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat)
- [mdn-browser-compat-data](https://github.com/mdn/browser-compat-data)\*

\* Thanks to these projects in particular (and many other mainstream ones) for making this project possible.
