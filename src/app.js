import { computeStats, normalizeRecord } from './domain/sleep.js';

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function rowTemplate(record) {
  return `<li data-id="${record.id}">
    <strong>${record.date}</strong>
    <span>${record.bedtime} -> ${record.wakeTime}</span>
    <span>时长 ${formatDuration(record.durationMinutes)}</span>
    <span>质量 ${record.quality}/5</span>
    <span>${record.notes || '-'}</span>
    <button type="button" data-action="delete" data-id="${record.id}">删除</button>
  </li>`;
}

function renderStats(stats, root) {
  root.querySelector('[data-stat="avg-duration"]').textContent = formatDuration(stats.averageDurationMinutes);
  root.querySelector('[data-stat="avg-quality"]').textContent = `${stats.averageQuality}`;
  root.querySelector('[data-stat="best-duration"]').textContent = formatDuration(stats.bestDurationMinutes);
  root.querySelector('[data-stat="worst-duration"]').textContent = formatDuration(stats.worstDurationMinutes);
}

export function initApp({ documentRef, repository }) {
  const form = documentRef.querySelector('#record-form');
  const listRoot = documentRef.querySelector('#record-list');
  const status = documentRef.querySelector('#status');

  function refresh() {
    const rows = repository.list();
    listRoot.innerHTML = rows.map(rowTemplate).join('');
    renderStats(computeStats(rows), documentRef);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      const payload = {
        date: form.date.value,
        bedtime: form.bedtime.value,
        wakeTime: form.wakeTime.value,
        quality: Number(form.quality.value),
        notes: form.notes.value
      };
      const record = normalizeRecord(payload);
      repository.add(record);
      form.reset();
      status.textContent = '记录已保存';
      refresh();
    } catch (error) {
      status.textContent = `保存失败: ${error.message}`;
    }
  });

  listRoot.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.dataset.action === 'delete' && target.dataset.id) {
      repository.remove(target.dataset.id);
      status.textContent = '记录已删除';
      refresh();
    }
  });

  refresh();
}
