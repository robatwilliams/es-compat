# es-compat

> Check JavaScript code compatibility with target runtime environments

## [check-es-compat](/packages/check-es-compat/README.md)

Standalone CLI tool.

## [eslint-plugin-es-compat](/packages/eslint-plugin-es-compat/README.md)

ESLint plugin.

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
- Document limitations (detection, compat data completeness)
- Document briefly how it works
- Comment on [module-requests#103](https://github.com/sindresorhus/module-requests/issues/103), [eslint-plugin-es#22](https://github.com/mysticatea/eslint-plugin-es/issues/22), [eslint-plugin-compat#206](https://github.com/amilajack/eslint-plugin-compat/issues/206)

### Future ideas

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
