const browserslist = require('browserslist');
const _ = require('lodash');
const compatData = require('@mdn/browser-compat-data');
const compareVersions = require('./compareVersions');

module.exports = function targetRuntimes(overrideBrowserslist, browserslistOptions) {
  // ['chrome 50', ...]
  const allNamedVersions = browserslist(overrideBrowserslist, browserslistOptions);

  // [ { name, version }, ... ]
  const all = allNamedVersions.map((namedVersion) => {
    const [name, version] = namedVersion.split(' ');
    return {
      name,
      version: simplifyVersion(version),
    };
  });

  // { name: oldestVersion }
  const oldestOfEach = _.chain(all)
    .groupBy('name')
    .mapValues(
      (familyMember) =>
        familyMember.sort((a, b) => compareVersions(a.version, b.version))[0].version
    )
    .value();

  const mapped = _.mapKeys(oldestOfEach, (version, name) => mapFamilyName(name));
  const final = _.pickBy(mapped, (version, name) => isKnownFamily(name));

  // [ { name, version } ]
  return Object.entries(final).map(([name, version]) => ({ name, version }));
};

function isKnownFamily(name) {
  return compatData.browsers[name] != null;
}

// browserslist -> @mdn/browser-compat-data (where necessary and available)
/* eslint-disable camelcase */
const familyNameMapping = {
  and_chr: 'chrome_android',
  and_ff: 'firefox_android',
  android: 'webview_android',
  ios_saf: 'safari_ios',
  node: 'nodejs',
  op_mob: 'opera_android',
  samsung: 'samsunginternet_android',
};
/* eslint-enable camelcase */

function mapFamilyName(browserslistName) {
  return familyNameMapping[browserslistName] || browserslistName;
}

function simplifyVersion(version) {
  return version.includes('-') ? version.split('-')[0] : version;
}
