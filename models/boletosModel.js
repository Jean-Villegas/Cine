const db = require('../db');

async function getAll() {
  return await db.query('SELECT * FROM boletos');
}

async function getById(id) {
  const rows = await db.query('SELECT * FROM boletos WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(b) {
  const sql = `INSERT INTO boletos (funcion_id, usuario_id, numero_asiento, precio, fecha_compra, hora_compra, estado, codigo_qr, metodo_pago)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    b.funcionId, b.usuarioId || null, b.numeroAsiento || null, b.precio || 0.00,
    b.fechaCompra || null, b.horaCompra || null, b.estado || 'confirmado', b.codigoQR || null, b.metodoPago || null
  ];
  const result = await db.query(sql, params);
  return getById(result.insertId);
}

async function update(id, data) {
  const fields = [];
  const params = [];
  const allowed = ['funcion_id','usuario_id','numero_asiento','precio','fecha_compra','hora_compra','estado','codigo_qr','metodo_pago'];
  for (const key of allowed) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      params.push(data[key]);
    }
  }
  if (fields.length === 0) return null;
  params.push(id);
  const sql = `UPDATE boletos SET ${fields.join(', ')} WHERE id = ?`;
  await db.query(sql, params);
  return getById(id);
}

async function remove(id) {
  const row = await getById(id);
  if (!row) return null;
  await db.query('DELETE FROM boletos WHERE id = ?', [id]);
  return row;
}

module.exports = { getAll, getById, create, update, remove };
