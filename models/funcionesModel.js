const db = require('../db');

async function getAll() {
  return await db.query('SELECT * FROM funciones');
}

async function getById(id) {
  const rows = await db.query('SELECT * FROM funciones WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(f) {
  const sql = `INSERT INTO funciones (pelicula_id, sala_id, fecha, hora_inicio, hora_fin, precio, asientos_disponibles, asientos_ocupados, estado, tipo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    f.peliculaId, f.salaId, f.fecha || null, f.horaInicio || null, f.horaFin || null,
    f.precio || 0.00, f.asientosDisponibles || 0, f.asientosOcupados || 0, f.estado || 'activa', f.tipo || null
  ];
  const result = await db.query(sql, params);
  return getById(result.insertId);
}

async function update(id, data) {
  const fields = [];
  const params = [];
  const allowed = ['pelicula_id','sala_id','fecha','hora_inicio','hora_fin','precio','asientos_disponibles','asientos_ocupados','estado','tipo'];
  for (const key of allowed) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      params.push(data[key]);
    }
  }
  if (fields.length === 0) return null;
  params.push(id);
  const sql = `UPDATE funciones SET ${fields.join(', ')} WHERE id = ?`;
  await db.query(sql, params);
  return getById(id);
}

async function remove(id) {
  const row = await getById(id);
  if (!row) return null;
  await db.query('DELETE FROM funciones WHERE id = ?', [id]);
  return row;
}

module.exports = { getAll, getById, create, update, remove };
