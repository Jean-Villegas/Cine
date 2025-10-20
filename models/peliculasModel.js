const db = require('../db');

async function getAll() {
  return await db.query('SELECT * FROM peliculas');
}

async function getById(id) {
  const rows = await db.query('SELECT * FROM peliculas WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(p) {
  const sql = `INSERT INTO peliculas (titulo, director, genero, duracion, clasificacion, sinopsis, anio, idioma, subtitulos, formato, precio, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    p.titulo, p.director || null, p.genero || null, p.duracion || null,
    p.clasificacion || null, p.sinopsis || null, p.anio || null,
    p.idioma || null, p.subtitulos ? 1 : 0, p.formato || null,
    p.precio || 0.00, p.estado || 'activa'
  ];
  const result = await db.query(sql, params);
  return getById(result.insertId);
}

async function update(id, data) {
  const fields = [];
  const params = [];
  const allowed = ['titulo','director','genero','duracion','clasificacion','sinopsis','anio','idioma','subtitulos','formato','precio','estado'];
  for (const key of allowed) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      params.push(key === 'subtitulos' ? (data[key] ? 1 : 0) : data[key]);
    }
  }
  if (fields.length === 0) return null;
  params.push(id);
  const sql = `UPDATE peliculas SET ${fields.join(', ')} WHERE id = ?`;
  await db.query(sql, params);
  return getById(id);
}

async function remove(id) {
  const row = await getById(id);
  if (!row) return null;
  await db.query('DELETE FROM peliculas WHERE id = ?', [id]);
  return row;
}

module.exports = { getAll, getById, create, update, remove };
