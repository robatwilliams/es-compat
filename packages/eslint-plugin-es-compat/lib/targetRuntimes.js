const browserslist = require('browserslist');
const _ = require('lodash');

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
  // TODO handle browsers not in compat data

  // [ { name, oldestVersion } ]
  return Object.entries(oldestOfEach).map(([name, version]) => ({ name, version }));
};
