const { query } = require('../db');

class Funcion {
  // Obtener todas las funciones
  static getAll() {
    return new Promise((resolve, reject) => {
      query(`
        SELECT f.*, p.titulo as pelicula_titulo, s.numero as sala_numero 
        FROM funciones f 
        JOIN peliculas p ON f.pelicula_id = p.id 
        JOIN salas s ON f.sala_id = s.id 
        ORDER BY f.fecha, f.hora_inicio
      `)
        .then(funciones => {
          resolve(funciones);
        })
        .catch(error => {
          reject(new Error(`Error al obtener funciones: ${error.message}`));
        });
    });
  }

  // Obtener función por ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      query(`
        SELECT f.*, p.titulo as pelicula_titulo, s.numero as sala_numero 
        FROM funciones f 
        JOIN peliculas p ON f.pelicula_id = p.id 
        JOIN salas s ON f.sala_id = s.id 
        WHERE f.id = ?
      `, [id])
        .then(funciones => {
          if (funciones.length === 0) {
            resolve(null);
          } else {
            resolve(funciones[0]);
          }
        })
        .catch(error => {
          reject(new Error(`Error al obtener función: ${error.message}`));
        });
    });
  }

  // Crear nueva función
  static create({ pelicula_id, sala_id, fecha, hora_inicio, hora_fin, precio = 0, asientos_disponibles = 0, asientos_ocupados = 0, estado = 'activa', tipo }) {
    return new Promise((resolve, reject) => {
      // Validaciones
      if (!pelicula_id || !sala_id || !fecha || !hora_inicio) {
        reject(new Error('Película, sala, fecha y hora de inicio son obligatorios'));
        return;
      }

      query(
        `INSERT INTO funciones (pelicula_id, sala_id, fecha, hora_inicio, hora_fin, precio, asientos_disponibles, asientos_ocupados, estado, tipo) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [pelicula_id, sala_id, fecha, hora_inicio, hora_fin, precio, asientos_disponibles, asientos_ocupados, estado, tipo]
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(new Error(`Error al crear función: ${error.message}`));
      });
    });
  }

  // Actualizar función
  static update(id, { pelicula_id, sala_id, fecha, hora_inicio, hora_fin, precio, asientos_disponibles, asientos_ocupados, estado, tipo }) {
    return new Promise((resolve, reject) => {
      query(
        `UPDATE funciones SET 
         pelicula_id = ?, sala_id = ?, fecha = ?, hora_inicio = ?, hora_fin = ?, 
         precio = ?, asientos_disponibles = ?, asientos_ocupados = ?, estado = ?, tipo = ?
         WHERE id = ?`,
        [pelicula_id, sala_id, fecha, hora_inicio, hora_fin, precio, asientos_disponibles, asientos_ocupados, estado, tipo, id]
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(new Error(`Error al actualizar función: ${error.message}`));
      });
    });
  }

  // Eliminar función
  static delete(id) {
    return new Promise((resolve, reject) => {
      query('DELETE FROM funciones WHERE id = ?', [id])
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(`Error al eliminar función: ${error.message}`));
        });
    });
  }
}

module.exports = Funcion;
