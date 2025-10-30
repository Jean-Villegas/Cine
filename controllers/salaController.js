const Sala = require('../models/Sala');

class SalaController {
  // GET /api/salas - Obtener todas las salas
  static getAll() {
    return new Promise((resolve, reject) => {
      Sala.getAll()
        .then(salas => {
          resolve(salas);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // GET /api/salas/:id - Obtener una sala por ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      Sala.getById(id)
        .then(sala => {
          resolve(sala);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // POST /api/salas - Crear una nueva sala
  static create(salaData) {
    return new Promise((resolve, reject) => {
      // Lógica de negocio: validaciones
      if (!salaData.numero || !salaData.capacidad) {
        reject(new Error('Número y capacidad son obligatorios'));
        return;
      }
      
      Sala.create(salaData)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // PUT /api/salas/:id - Actualizar una sala
  static update(id, salaData) {
    return new Promise((resolve, reject) => {
      // Lógica de negocio: validaciones
      if (!salaData.numero || !salaData.capacidad) {
        reject(new Error('Número y capacidad son obligatorios'));
        return;
      }
      
      Sala.getById(id)
        .then(sala => {
          if (!sala) {
            reject(new Error('Sala no encontrada'));
            return;
          }

          return Sala.update(id, salaData);
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // DELETE /api/salas/:id - Eliminar una sala
  static delete(id) {
    return new Promise((resolve, reject) => {
      Sala.getById(id)
        .then(sala => {
          if (!sala) {
            reject(new Error('Sala no encontrada'));
            return;
          }

          return Sala.delete(id);
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

module.exports = SalaController;
