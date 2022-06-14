/**
 * ES2021
 */
foo = {};
foo.replaceAll; // no error

String.prototype.replaceAll;

foo = foo &&= null;
foo = foo ??= '';
foo = foo ||= {};

Promise.any();

foo = 1_000_000_00;
foo = new WeakRef();
foo = new FinalizationRegistry(() => {});

/**
 * ES2020 (all implemented, but these examples not complete)
 */
foo = 100n;
BigInt(100);

async function interestingBitIsInside() {
  await import('');
}

globalThis.foo;

Promise.allSettled();

foo.matchAll();
String.prototype.matchAll;

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

foo = { ...bar };
const { a, ...rest } = foo;

foo.finally();
Promise.prototype.finally;

/(?<=a)b/.test('look-behind assertion');

/(?<a>b)c/.test('named capture group');

/./s.test('dotAll flag');

/\p{Script=Hiragana}+/u.test('Unicode property escape');

/**
 * ES2017
 */
async function foo() {}

Atomics.add(buffer, 0, 2);

Object.getOwnPropertyDescriptors();

Object.entries();

Object.values();

new SharedArrayBuffer();

str.padStart();
String.prototype.padStart;
str.padEnd();
String.prototype.padEnd;

// prettier-ignore
foo(bar,);

/**
 * ES2016
 */
foo.includes();
Array.prototype.includes;

foo ** bar;
