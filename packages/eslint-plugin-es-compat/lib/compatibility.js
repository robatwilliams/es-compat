const features = require('./features');

function forbiddenFeatures() {
  return features.filter(feature => !isFeatureSupportedByAllTargets(feature));
}

function isFeatureSupportedByAllTargets(feature) {
  // TODO read this from browserslist
  const targets = [{ name: 'chrome', version: 66 }];

  return targets.every(target => isFeatureSupportedByTarget(feature, target));
}

function isFeatureSupportedByTarget(feature, target) {
  return feature.compatFeatures.every(compatFeature =>
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

  return !support.isNone && target.version >= versionAdded;
}

function getSimpleSupportStatement(compatFeature, target) {
  const statement = compatFeature.__compat.support[target.name];

  // https://github.com/mdn/browser-compat-data/blob/master/schemas/compat-data-schema.md#the-support_statement-object
  return Array.isArray(statement) ? statement[0] : statement;
}

function interpretSupport(versionAdded) {
  // https://github.com/mdn/browser-compat-data/blob/master/schemas/compat-data-schema.md#version_added
  return {
    isUnknown: versionAdded === null,
    isNone: versionAdded === false,
    isVersionUnknown: versionAdded === true,
  };
}

module.exports = { forbiddenFeatures };
