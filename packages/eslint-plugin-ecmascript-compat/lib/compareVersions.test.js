import assert from 'node:assert';
import { test } from 'node:test';
import compareVersions from './compareVersions.js';

test('equal', () => {
  assert.strictEqual(compareVersions('1.2.3', '1.2.3'), 0);
});

test('smaller', () => {
  assert.strictEqual(compareVersions('1.2.0', '1.2.3'), -1);
  assert.strictEqual(compareVersions('1.2', '1.3'), -1);
});

test('larger', () => {
  assert.strictEqual(compareVersions('1.2.3', '1.2.0'), 1);
});

test('partial on one side', () => {
  assert.strictEqual(compareVersions('1.1', '1.2.3'), -1);
  assert.strictEqual(compareVersions('1.1.1', '1.2'), -1);
});

test('when it matters to treat parts as numbers', () => {
  assert.strictEqual(compareVersions('9', '10'), -1);
});
