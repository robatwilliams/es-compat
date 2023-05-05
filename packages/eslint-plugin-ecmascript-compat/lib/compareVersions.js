module.exports = function compareVersions(a, b) {
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
};
