const db = require('../db');

async function getAll() {
  const rows = await db.query('SELECT * FROM salas');
  // Asegurar que equipamiento sea un array
  return rows.map(r => ({
    ...r,
    equipamiento: (function(val){
      if (!val) return [];
      if (Array.isArray(val)) return val;
      try { return JSON.parse(val); } catch(e) { return typeof val === 'string' ? [val] : [] }
    })(r.equipamiento)
  }));
}

async function getById(id) {
  const rows = await db.query('SELECT * FROM salas WHERE id = ?', [id]);
  const row = rows[0] || null;
  if (!row) return null;
  const equip = row.equipamiento;
  row.equipamiento = (function(val){
    if (!val) return [];
    if (Array.isArray(val)) return val;
    try { return JSON.parse(val); } catch(e) { return typeof val === 'string' ? [val] : [] }
  })(equip);
  return row;
}

async function create(s) {
  const sql = `INSERT INTO salas (numero, capacidad, tipo, equipamiento, ubicacion, estado)
    VALUES (?, ?, ?, ?, ?, ?)`;
  // almacenamos equipamiento como JSON string
  const equip = s.equipamiento ? JSON.stringify(s.equipamiento) : JSON.stringify([]);
  const params = [s.numero, s.capacidad || 0, s.tipo || null, equip, s.ubicacion || null, s.estado || 'activa'];
  const result = await db.query(sql, params);
  return getById(result.insertId);
}

async function update(id, data) {
  const fields = [];
  const params = [];
  const allowed = ['numero','capacidad','tipo','equipamiento','ubicacion','estado'];
  for (const key of allowed) {
    if (data[key] !== undefined) {
      if (key === 'equipamiento') {
        fields.push(`${key} = ?`);
        params.push(JSON.stringify(data[key]));
      } else {
        fields.push(`${key} = ?`);
        params.push(data[key]);
      }
    }
  }
  if (fields.length === 0) return null;
  params.push(id);
  const sql = `UPDATE salas SET ${fields.join(', ')} WHERE id = ?`;
  await db.query(sql, params);
  return getById(id);
}

async function remove(id) {
  const row = await getById(id);
  if (!row) return null;
  await db.query('DELETE FROM salas WHERE id = ?', [id]);
  return row;
}

module.exports = { getAll, getById, create, update, remove };
