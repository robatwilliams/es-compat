/**
 * ES2019
 */
foo.flat();
Array.prototype.flat;
residentialAddress.flat; // no error please
Array.prototype.flatMap;
foo.flatMap();

const u2028 = ' '; // line separator character \u2028 is in this string

Object.fromEntries();

try {
} catch {}

foo.trimLeft();
String.prototype.trimLeft;
foo.trimRight();
String.prototype.trimRight;
foo.trimStart();
String.prototype.trimStart;
foo.trimEnd();
String.prototype.trimEnd;

/**
 * ES2018
 */
async function* asyncGenerator() {}
async function interestingBitIsInside() {
  for await (const bar of bar) {
  }
}

const foo = { ...bar };
const { a, ...rest } = foo;

foo.finally();
Promise.prototype.finally;

/(?<=a)b/.test('look-behind assertion');

/(?<a>b)c/.test('named capture group');

/./s.test('dotAll flag');

/\p{Script=Hiragana}+/u.test('Unicode property escape');
