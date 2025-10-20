const db = require('../db');

async function getAll() {
  return await db.query('SELECT * FROM usuarios');
}

async function getById(id) {
  const rows = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(u) {
  const sql = `INSERT INTO usuarios (nombre, apellido, email, telefono, fecha_nacimiento, tipo_usuario, fecha_registro, estado, puntos)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    u.nombre, u.apellido || null, u.email, u.telefono || null, u.fechaNacimiento || null,
    u.tipoUsuario || 'cliente', u.fechaRegistro || null, u.estado || 'activo', u.puntos || 0
  ];
  const result = await db.query(sql, params);
  return getById(result.insertId);
}

async function update(id, data) {
  const fields = [];
  const params = [];
  const allowed = ['nombre','apellido','email','telefono','fecha_nacimiento','tipo_usuario','fecha_registro','estado','puntos'];
  for (const key of allowed) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      params.push(data[key]);
    }
  }
  if (fields.length === 0) return null;
  params.push(id);
  const sql = `UPDATE usuarios SET ${fields.join(', ')} WHERE id = ?`;
  await db.query(sql, params);
  return getById(id);
}

async function remove(id) {
  const row = await getById(id);
  if (!row) return null;
  await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return row;
}

module.exports = { getAll, getById, create, update, remove };
