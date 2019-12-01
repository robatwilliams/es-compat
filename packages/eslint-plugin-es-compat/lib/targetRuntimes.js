const browserslist = require('browserslist');
const _ = require('lodash');
const compatData = require('mdn-browser-compat-data');

module.exports = function targetRuntimes() {
  // ['chrome 50', ...]
  const allNamedVersions = browserslist();

  // [ { name, version }, ... ]
  const all = allNamedVersions.map(namedVersion => {
    const [name, version] = namedVersion.split(' ');
    return { name, version };
  });

  // { name: oldestVersion }
  const oldestOfEach = _.chain(all)
    .groupBy('name')
    .mapValues(familyMember => _.sortBy(familyMember, 'version')[0].version)
    .value();

  // TODO mapping needed for mobile browsers
  const mapped = oldestOfEach;

  const final = _.pickBy(oldestOfEach, (version, name) => isKnownFamily(name));

  // [ { name, oldestVersion } ]
  return Object.entries(final).map(([name, version]) => ({ name, version }));
};

function isKnownFamily(name) {
  const isKnown = compatData.browsers[name] != null;

  if (!isKnown) {
    console.warn(`es-compat: No compatibility data for target family '${name}'`);
  }

  return isKnown;
}
