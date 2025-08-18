function compareNumericVersions(a, b) {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);
  const maxLength = Math.max(aParts.length, bParts.length);

  for (let i = 0; i < maxLength; i++) {
    const aPart = aParts[i] || 0;
    const bPart = bParts[i] || 0;

    if (aPart !== bPart) {
      return aPart < bPart ? -1 : 1;
    }
  }

  return 0;
}

export default function compareVersions(a, b) {
  if (a === 'preview' && b === 'preview') {
    return 0;
  }

  if (a === 'preview') {
    return 1;
  }

  if (b === 'preview') {
    return -1;
  }

  return compareNumericVersions(a, b);
}
