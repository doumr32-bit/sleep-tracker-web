function parseRows(raw) {
  if (!raw) {
    return [];
  }
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  } catch (_error) {
    return [];
  }
}

function persist(storage, key, rows) {
  storage.setItem(key, JSON.stringify(rows));
}

export function createRepository(storage, key = 'sleep-records') {
  function list() {
    return parseRows(storage.getItem(key)).sort((a, b) => b.date.localeCompare(a.date));
  }

  function add(record) {
    const rows = list();
    rows.push(record);
    persist(storage, key, rows);
    return record;
  }

  function update(id, patch) {
    const rows = list().map((row) => (row.id === id ? { ...row, ...patch } : row));
    persist(storage, key, rows);
    return rows.find((row) => row.id === id) || null;
  }

  function remove(id) {
    const rows = list().filter((row) => row.id !== id);
    persist(storage, key, rows);
    return rows;
  }

  return {
    list,
    add,
    update,
    remove
  };
}
