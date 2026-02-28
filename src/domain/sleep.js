function toMinutes(time) {
  const [hourText, minuteText] = String(time).split(':');
  const hours = Number(hourText);
  const minutes = Number(minuteText);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {
    throw new Error('TIME_FORMAT_INVALID');
  }
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error('TIME_RANGE_INVALID');
  }
  return hours * 60 + minutes;
}

export function calculateDurationMinutes(bedtime, wakeTime) {
  const sleepAt = toMinutes(bedtime);
  const wakeAt = toMinutes(wakeTime);
  const raw = wakeAt - sleepAt;
  return raw > 0 ? raw : 24 * 60 + raw;
}

function normalizeQuality(quality) {
  const value = Number(quality);
  if (!Number.isInteger(value) || value < 1 || value > 5) {
    throw new Error('QUALITY_INVALID');
  }
  return value;
}

export function normalizeRecord(payload) {
  const date = String(payload.date || '').trim();
  const bedtime = String(payload.bedtime || '').trim();
  const wakeTime = String(payload.wakeTime || '').trim();
  const notes = String(payload.notes || '').trim();

  if (!date) {
    throw new Error('DATE_REQUIRED');
  }

  const durationMinutes = calculateDurationMinutes(bedtime, wakeTime);
  const quality = normalizeQuality(payload.quality);

  return {
    id: payload.id || crypto.randomUUID(),
    date,
    bedtime,
    wakeTime,
    quality,
    notes,
    durationMinutes
  };
}

function round(value) {
  return Math.round(value * 100) / 100;
}

export function computeStats(records) {
  if (!records.length) {
    return {
      averageDurationMinutes: 0,
      averageQuality: 0,
      bestDurationMinutes: 0,
      worstDurationMinutes: 0
    };
  }

  const durations = records.map((item) => Number(item.durationMinutes));
  const qualities = records.map((item) => Number(item.quality));
  const durationTotal = durations.reduce((sum, value) => sum + value, 0);
  const qualityTotal = qualities.reduce((sum, value) => sum + value, 0);

  return {
    averageDurationMinutes: Math.round(durationTotal / records.length),
    averageQuality: round(qualityTotal / records.length),
    bestDurationMinutes: Math.max(...durations),
    worstDurationMinutes: Math.min(...durations)
  };
}
