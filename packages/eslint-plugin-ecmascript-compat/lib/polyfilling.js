function nonPolyfilledFeatures(features, polyfills) {
    if (!polyfills?.length) {
        return features;
    }
    return features.filter(feature => !polyfills.includes(feature.polyfill));
}

module.exports = { nonPolyfilledFeatures };
