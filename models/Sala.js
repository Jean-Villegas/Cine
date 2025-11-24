const { query } = require('../db');

class Sala {
  // Obtener todas las salas
  static getAll() {
    return new Promise((resolve, reject) => {
      query('SELECT * FROM salas ORDER BY numero')
        .then(salas => {
          resolve(salas);
        })
        .catch(error => {
          reject(new Error(`Error al obtener salas: ${error.message}`));
        });
    });
  }

  // Obtener sala por ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      query('SELECT * FROM salas WHERE id = ?', [id])
        .then(salas => {
          if (salas.length === 0) {
            resolve(null);
          } else {
            resolve(salas[0]);
          }
        })
        .catch(error => {
          reject(new Error(`Error al obtener sala: ${error.message}`));
        });
    });
  }

  // Crear nueva sala
  static create({ numero, capacidad, tipo, equipamiento, ubicacion, estado = 'activa' }) {
    return new Promise((resolve, reject) => {
      // Validaciones
      if (!numero || !capacidad) {
        reject(new Error('Número y capacidad son obligatorios'));
        return;
      }

      query(
        `INSERT INTO salas (numero, capacidad, tipo, equipamiento, ubicacion, estado) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [numero, capacidad, tipo, equipamiento, ubicacion, estado]
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(new Error(`Error al crear sala: ${error.message}`));
      });
    });
  }

  // Actualizar sala
  static update(id, { numero, capacidad, tipo, equipamiento, ubicacion, estado }) {
    return new Promise((resolve, reject) => {
      query(
        `UPDATE salas SET 
         numero = ?, capacidad = ?, tipo = ?, equipamiento = ?, ubicacion = ?, estado = ?
         WHERE id = ?`,
        [numero, capacidad, tipo, equipamiento, ubicacion, estado, id]
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(new Error(`Error al actualizar sala: ${error.message}`));
      });
    });
  }

  // Eliminar sala
  static delete(id) {
    return new Promise((resolve, reject) => {
      query('DELETE FROM salas WHERE id = ?', [id])
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(`Error al eliminar sala: ${error.message}`));
        });
    });
  }
}

module.exports = Sala;
