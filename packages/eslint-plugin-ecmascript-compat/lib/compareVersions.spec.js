const compareVersions = require('./compareVersions');

test('equal', () => {
  expect(compareVersions('1.2.3', '1.2.3')).toBe(0);
});

test('smaller', () => {
  expect(compareVersions('1.2.0', '1.2.3')).toBe(-1);
  expect(compareVersions('1.2', '1.3')).toBe(-1);
});

test('larger', () => {
  expect(compareVersions('1.2.3', '1.2.0')).toBe(1);
});

test('partial on one side', () => {
  expect(compareVersions('1.1', '1.2.3')).toBe(-1);
  expect(compareVersions('1.1.1', '1.2')).toBe(-1);
});

test('when it matters to treat parts as numbers', () => {
  expect(compareVersions('9', '10')).toBe(-1);
});
