import test from 'node:test';
import assert from 'node:assert/strict';

import { createRepository } from '../src/storage/repository.js';

function createMemoryStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, value);
    }
  };
}

test('repository add and list records', () => {
  const repo = createRepository(createMemoryStorage(), 'sleep-records-test');
  repo.add({ id: 'r1', date: '2026-03-01' });
  const rows = repo.list();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, 'r1');
});

test('repository update and remove records', () => {
  const repo = createRepository(createMemoryStorage(), 'sleep-records-test');
  repo.add({ id: 'r1', date: '2026-03-01', notes: '' });
  repo.update('r1', { notes: 'updated' });
  assert.equal(repo.list()[0].notes, 'updated');

  repo.remove('r1');
  assert.equal(repo.list().length, 0);
});
