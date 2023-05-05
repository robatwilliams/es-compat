const browserslist = require('browserslist');
const targetRuntimes = require('./targetRuntimes');

beforeEach(() => {
  delete process.env.BROWSERSLIST;
  browserslist.clearCaches();
});

it('targets the oldest version of each family', () => {
  process.env.BROWSERSLIST = 'Chrome >= 50';

  expect(targetRuntimes()).toEqual([{ name: 'chrome', version: '50' }]);
});

it('maps browserslist names to mdn names where necessary', () => {
  process.env.BROWSERSLIST = 'Android >= 0';

  expect(targetRuntimes()).toEqual([{ name: 'webview_android', version: '2.1' }]);
});

it('discards families unknown to mdn', () => {
  process.env.BROWSERSLIST = 'kaios >= 0';

  expect(targetRuntimes()).toEqual([]);
});

it('handles multiple families', () => {
  process.env.BROWSERSLIST = 'Firefox >= 55,IE >= 10';

  expect(targetRuntimes()).toEqual([
    { name: 'firefox', version: '55' },
    { name: 'ie', version: '10' },
  ]);
});

it('preserves versions as strings to allow semver', () => {
  process.env.BROWSERSLIST = 'Node >= 0';

  expect(targetRuntimes()).toEqual([{ name: 'nodejs', version: '0.10.0' }]);
});

it('simplifies version ranges to the start of the range', () => {
  expect(browserslist('iOS 15')).toEqual(['ios_saf 15.0-15.1']);

  process.env.BROWSERSLIST = 'iOS 15';

  expect(targetRuntimes()).toEqual([{ name: 'safari_ios', version: '15.0' }]);
});
