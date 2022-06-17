/* eslint-disable camelcase, no-underscore-dangle */
const compare = require('natural-compare-lite');

function forbiddenFeatures(features, targets) {
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

  return !support.isNone && compare(target.version, versionAdded) >= 0;
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

module.exports = { forbiddenFeatures };
