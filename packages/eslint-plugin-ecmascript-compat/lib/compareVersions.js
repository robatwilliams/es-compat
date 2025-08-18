export default function compareVersions(a, b) {
  // Handle special case for 'preview' version
  if (a === 'preview' && b === 'preview') return 0;
  if (a === 'preview') return 1; // preview is newer than any specific version
  if (b === 'preview') return -1; // specific version is older than preview

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
