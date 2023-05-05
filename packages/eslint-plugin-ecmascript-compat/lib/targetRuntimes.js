const browserslist = require('browserslist');
const _ = require('lodash');
const compatData = require('@mdn/browser-compat-data');

module.exports = function targetRuntimes() {
  // ['chrome 50', ...]
  const allNamedVersions = browserslist();

  // [ { name, version }, ... ]
  const all = allNamedVersions.map((namedVersion) => {
    const [name, version] = namedVersion.split(' ');
    return { name, version };
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
  const simplified = _.mapValues(mapped, (version) => simplifyVersion(version));
  const final = _.pickBy(simplified, (version, name) => isKnownFamily(name));

  // eslint-disable-next-line no-console
  console.log('es-compat: checking compatibility for targets', final);

  // [ { name, version } ]
  return Object.entries(final).map(([name, version]) => ({ name, version }));
};

function isKnownFamily(name) {
  const isKnown = compatData.browsers[name] != null;

  if (!isKnown) {
    // eslint-disable-next-line no-console
    console.warn(`es-compat: No compatibility data for target family '${name}'`);
  }

  return isKnown;
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

function compareVersions(a, b) {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    if (aParts[i] === bParts[i]) {
      // eslint-disable-next-line no-continue
      continue;
    }

    return aParts[i] < bParts[i] ? -1 : 1;
  }

  return 0;
}
