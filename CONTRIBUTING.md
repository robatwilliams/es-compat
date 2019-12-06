# Contributing

## Prerequisites

- Node.js, version as per packages' `package.json` `engines` field
- NPM `^6.9.0` recommended
- Lerna, just install it globally and [it'll use this project's local version](https://github.com/lerna/lerna/pull/1122) when run

## Workflow

- Self-explanatory NPM scripts in root and packages
- Prettier and ESLint for code hygiene

## Pre-release checks

- Verify there are no uncommitted changes
- `npm run ci` in root
- `npm run lint` in the example project, check number of errors and presence of new expected ones
- `../check-es-compat/bin/cli.js .` in the example project, it should produce the same errors
- `lerna clean` then `lerna bootstrap`, verify no changes were introduced (e.g. to `package-lock.json`)

## Releasing

1. `lerna version`, with arguments as appropriate for signifigance of release
1. Verify the commit that it made did what you expected
1. `lerna publish from-git`
1. In GitHub's Releases tab, open the new tag then create a release out of it
