/* eslint-disable camelcase, no-underscore-dangle */

function unsupportedFeatures(features, targets) {
  return features.filter((feature) => !isFeatureSupportedByTargets(feature, targets));
}

function isFeatureSupportedByTargets(feature, targets) {
  return targets.every((target) => isFeatureSupportedByTarget(feature, target));
}

function isFeatureSupportedByTarget(feature, target) {
  if (feature.compatFeatures.includes(undefined)) {
    const summary = feature.compatFeatures.map((compatFeature) => typeof compatFeature);
    const ruleDescription = feature.ruleConfig.definition.meta.docs.description;

    throw new Error(`Sparse compatFeatures for rule '${ruleDescription}': ${summary}`);
  }

  return feature.compatFeatures.every((compatFeature) =>
    isCompatFeatureSupportedByTarget(compatFeature, target)
  );
}

function isCompatFeatureSupportedByTarget(compatFeature, target) {
  const versionAdded = getSimpleSupportStatement(compatFeature, target).version_added;
  const support = interpretSupport(versionAdded);

  if (support.isUnknown || support.isVersionUnknown) {
    // Assume optimistically; we can only be as good as the compatibility data
    return true;
  }

  return !support.isNone && compareVersions(target.version, versionAdded) >= 0;
}

function getSimpleSupportStatement(compatFeature, target) {
  const statement = compatFeature.__compat.support[target.name];

  // Take the most relevant and general entry when there are ones for behind-a-flag etc.
  // https://github.com/mdn/browser-compat-data/blob/master/schemas/compat-data-schema.md#the-support_statement-object
  const simpleStatement = Array.isArray(statement) ? statement[0] : statement;

  // Only mandatory for desktop browsers
  // https://github.com/mdn/browser-compat-data/blob/master/schemas/compat-data-schema.md#browser-identifiers
  return simpleStatement || { version_added: null };
}

function interpretSupport(versionAdded) {
  // https://github.com/mdn/browser-compat-data/blob/master/schemas/compat-data-schema.md#version_added
  return {
    isUnknown: versionAdded == null,
    isNone: versionAdded === false,
    isVersionUnknown: versionAdded === true,
  };
}

// the code generate by chatGPT
// support all version types obtained from the browserslist. (npx browserslist  '>=0%')
// 1. a.b.c
// 2. a.b.c-d.e.f
// 3. all
function compareVersions(version1, version2) {
  function getVersionNumber(version) {
    if (version === 'all') {
      return Infinity;
    }
    // discard version after "-"
    const match = version.match(/^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:\-\d+\.\d+)?$/);
    if (!match) {
      return 0;
    }
    const major = Number(match[1]) * 1000000000;
    const minor = Number(match[2] || 0) * 1000000;
    const patch = Number(match[3] || 0) * 1000;
    return major + minor + patch;
  }
  const v1 = getVersionNumber(version1.split('-')[0]);
  const v2 = getVersionNumber(version2.split('-')[0]);
  return v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
}

module.exports = { unsupportedFeatures };
