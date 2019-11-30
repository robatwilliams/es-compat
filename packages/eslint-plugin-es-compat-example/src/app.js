/**
 * ES2019
 */
foo.flat();
residentialAddress.flat; // no error please
foo.flatMap();

const u2028 = ' '; // line separator character \u2028 is in this string

Object.fromEntries();

try {
} catch {}

foo.trimLeft();
foo.trimRight();
foo.trimStart();
foo.trimEnd();

mySymbol.description;
photo.description = 'My dog'; // no error please
img.alt = photo.description; // has to be an error unfortunately

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

/(?<=a)b/.test('look-behind assertion');

/(?<a>b)c/.test('named capture group');

/./s.test('dotAll flag');

/\p{Script=Hiragana}+/u.test('Unicode property escape');
