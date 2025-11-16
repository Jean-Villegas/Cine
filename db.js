// db.js — Conexión a base de datos MySQL usando mysql2 (promise)
// Uso: establecer variables de entorno DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cinex',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

/**
 * Ejecuta una consulta preparada y devuelve filas.
 * @param {string} sql - Consulta SQL con placeholders (?).
 * @param {Array} params - Parámetros para la consulta.
 */
async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

/**
 * Ejecuta una consulta y devuelve el resultado completo (útil para INSERT que necesita insertId).
 * @param {string} sql - Consulta SQL con placeholders (?).
 * @param {Array} params - Parámetros para la consulta.
 */
async function queryResult(sql, params = []) {
  const [result] = await pool.execute(sql, params);
  // Para INSERT, UPDATE, DELETE, result es un ResultSetHeader que tiene insertId, affectedRows, etc.
  return result;
}

/**
 * Prueba la conexión con la base de datos.
 * Lanza el error en caso de fallo.
 */
async function testConnection() {
  const conn = await pool.getConnection();
  try {
    await conn.ping();
    conn.release();
    return true;
  } catch (err) {
    conn.release();
    console.error('DB connection failed:', err.message);
    throw err;
  }
}

module.exports = {
  pool,
  query,
  queryResult,
  testConnection
};
