const { query } = require('../db');

class Boleto {
  // Obtener todos los boletos
  static getAll() {
    return new Promise((resolve, reject) => {
      query(`
        SELECT b.*, f.fecha, f.hora_inicio, p.titulo as pelicula_titulo, s.numero as sala_numero, u.nombre as usuario_nombre
        FROM boletos b 
        JOIN funciones f ON b.funcion_id = f.id 
        JOIN peliculas p ON f.pelicula_id = p.id 
        JOIN salas s ON f.sala_id = s.id 
        LEFT JOIN usuarios u ON b.usuario_id = u.id 
        ORDER BY b.fecha_compra DESC, b.hora_compra DESC
      `)
        .then(boletos => {
          resolve(boletos);
        })
        .catch(error => {
          reject(new Error(`Error al obtener boletos: ${error.message}`));
        });
    });
  }

  // Obtener boleto por ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      query(`
        SELECT b.*, f.fecha, f.hora_inicio, p.titulo as pelicula_titulo, s.numero as sala_numero, u.nombre as usuario_nombre
        FROM boletos b 
        JOIN funciones f ON b.funcion_id = f.id 
        JOIN peliculas p ON f.pelicula_id = p.id 
        JOIN salas s ON f.sala_id = s.id 
        LEFT JOIN usuarios u ON b.usuario_id = u.id 
        WHERE b.id = ?
      `, [id])
        .then(boletos => {
          if (boletos.length === 0) {
            resolve(null);
          } else {
            resolve(boletos[0]);
          }
        })
        .catch(error => {
          reject(new Error(`Error al obtener boleto: ${error.message}`));
        });
    });
  }

  // Crear nuevo boleto
  static create({ funcion_id, usuario_id, numero_asiento, precio = 0, fecha_compra, hora_compra, estado = 'confirmado', codigo_qr, metodo_pago }) {
    return new Promise((resolve, reject) => {
      // Validaciones
      if (!funcion_id || !numero_asiento) {
        reject(new Error('Función y número de asiento son obligatorios'));
        return;
      }

      query(
        `INSERT INTO boletos (funcion_id, usuario_id, numero_asiento, precio, fecha_compra, hora_compra, estado, codigo_qr, metodo_pago) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [funcion_id, usuario_id, numero_asiento, precio, fecha_compra, hora_compra, estado, codigo_qr, metodo_pago]
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(new Error(`Error al crear boleto: ${error.message}`));
      });
    });
  }

  // Actualizar boleto
  static update(id, { funcion_id, usuario_id, numero_asiento, precio, fecha_compra, hora_compra, estado, codigo_qr, metodo_pago }) {
    return new Promise((resolve, reject) => {
      query(
        `UPDATE boletos SET 
         funcion_id = ?, usuario_id = ?, numero_asiento = ?, precio = ?, fecha_compra = ?, 
         hora_compra = ?, estado = ?, codigo_qr = ?, metodo_pago = ?
         WHERE id = ?`,
        [funcion_id, usuario_id, numero_asiento, precio, fecha_compra, hora_compra, estado, codigo_qr, metodo_pago, id]
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(new Error(`Error al actualizar boleto: ${error.message}`));
      });
    });
  }

  // Eliminar boleto
  static delete(id) {
    return new Promise((resolve, reject) => {
      query('DELETE FROM boletos WHERE id = ?', [id])
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(`Error al eliminar boleto: ${error.message}`));
        });
    });
  }
}

module.exports = Boleto;
