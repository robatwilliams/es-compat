# Contributing

Please get in touch before spending any significant time preparing contributions.

## Prerequisites

- Node.js and NPM, versions as per the root `package.json` `engines` field
- Lerna 4, just install it globally and [it'll use this project's local version](https://github.com/lerna/lerna/pull/1122) when run

Different versions may work, but majorly newer/older tooling versions are likely to cause upheaval in `package-lock.json` files.

## Workflow

- Self-explanatory NPM scripts in root and packages
- Prettier and ESLint for code hygiene

## Pre-release checks

- Verify there are no uncommitted changes
- `npm run ci` in root
- `npm run lint` in the example project, check number of errors and presence of new expected ones
- `../check-es-compat/bin/cli.mjs .` in the example project, it should produce the same errors
- `lerna clean` then `lerna bootstrap`, verify no changes were introduced (e.g. to `package-lock.json`)

## Releasing

1. `lerna version`, with arguments as appropriate for signifigance of release
1. Verify the commit that it made did what you expected
1. `lerna publish from-git`
1. In GitHub's Releases tab, open the new tag then create a release out of it
