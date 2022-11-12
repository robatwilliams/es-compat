function isPolyfilled(feature, polyfills) {
    if (!polyfills?.length) {
        return false;
    }

    return polyfills.includes(feature.polyfill));
}

module.exports = { isPolyfilled };
