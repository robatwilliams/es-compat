import assert from 'node:assert';
import { beforeEach, it } from 'node:test';
import browserslist from 'browserslist';
import targetRuntimes from './targetRuntimes.js';

beforeEach(() => {
  delete process.env.BROWSERSLIST;
  browserslist.clearCaches();
});

it('targets the oldest version of each family', () => {
  process.env.BROWSERSLIST = 'Chrome >= 50';

  assert.deepStrictEqual(targetRuntimes(), [{ name: 'chrome', version: '50' }]);
});

it('targets the oldest version of each family, treating versions as numbers', () => {
  process.env.BROWSERSLIST = 'chrome 9-10';

  assert.deepStrictEqual(targetRuntimes(), [{ name: 'chrome', version: '9' }]);
});

it('maps browserslist names to mdn names where necessary', () => {
  process.env.BROWSERSLIST = 'Android >= 0';

  assert.deepStrictEqual(targetRuntimes(), [{ name: 'webview_android', version: '2.1' }]);
});

it('discards families unknown to mdn', () => {
  process.env.BROWSERSLIST = 'kaios >= 0';

  assert.deepStrictEqual(targetRuntimes(), []);
});

it('handles multiple families', () => {
  process.env.BROWSERSLIST = 'Firefox >= 55,IE >= 10';

  assert.deepStrictEqual(targetRuntimes(), [
    { name: 'firefox', version: '55' },
    { name: 'ie', version: '10' },
  ]);
});

it('accepts a override', () => {
  assert.deepStrictEqual(targetRuntimes('Firefox >= 55,IE >= 10'), [
    { name: 'firefox', version: '55' },
    { name: 'ie', version: '10' },
  ]);
});

it('preserves versions as strings to allow semver', () => {
  process.env.BROWSERSLIST = 'Node >= 0';

  assert.deepStrictEqual(targetRuntimes(), [{ name: 'nodejs', version: '0.2.0' }]);
});

it('simplifies version ranges to the start of the range', () => {
  assert.deepStrictEqual(browserslist('iOS 15'), ['ios_saf 15.0-15.1']);

  process.env.BROWSERSLIST = 'iOS 15';

  assert.deepStrictEqual(targetRuntimes(), [{ name: 'safari_ios', version: '15.0' }]);
});
