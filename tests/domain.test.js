import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateDurationMinutes, computeStats, normalizeRecord } from '../src/domain/sleep.js';

test('calculateDurationMinutes handles same-day sleep', () => {
  assert.equal(calculateDurationMinutes('22:30', '06:30'), 480);
});

test('calculateDurationMinutes handles cross-midnight sleep', () => {
  assert.equal(calculateDurationMinutes('23:50', '07:10'), 440);
});

test('normalizeRecord validates and computes duration', () => {
  const normalized = normalizeRecord({
    date: '2026-03-01',
    bedtime: '23:00',
    wakeTime: '07:00',
    quality: 4,
    notes: 'Slept okay'
  });

  assert.equal(normalized.durationMinutes, 480);
  assert.equal(normalized.quality, 4);
});

test('computeStats returns aggregate metrics', () => {
  const stats = computeStats([
    { durationMinutes: 420, quality: 3 },
    { durationMinutes: 480, quality: 4 },
    { durationMinutes: 510, quality: 5 }
  ]);

  assert.equal(stats.averageDurationMinutes, 470);
  assert.equal(stats.bestDurationMinutes, 510);
  assert.equal(stats.worstDurationMinutes, 420);
  assert.equal(stats.averageQuality, 4);
});
