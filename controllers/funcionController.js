const Funcion = require('../models/Funcion');

class FuncionController {
  // GET /api/funciones - Obtener todas las funciones
  static getAll() {
    return new Promise((resolve, reject) => {
      Funcion.getAll()
        .then(funciones => {
          resolve(funciones);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // GET /api/funciones/:id - Obtener una función por ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      Funcion.getById(id)
        .then(funcion => {
          resolve(funcion);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // POST /api/funciones - Crear una nueva función
  static create(funcionData) {
    return new Promise((resolve, reject) => {
      // Lógica de negocio: validaciones
      if (!funcionData.pelicula_id || !funcionData.sala_id || !funcionData.fecha || !funcionData.hora_inicio) {
        reject(new Error('Película, sala, fecha y hora de inicio son obligatorios'));
        return;
      }
      
      Funcion.create(funcionData)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // PUT /api/funciones/:id - Actualizar una función
  static update(id, funcionData) {
    return new Promise((resolve, reject) => {
      // Lógica de negocio: validaciones
      if (!funcionData.pelicula_id || !funcionData.sala_id || !funcionData.fecha || !funcionData.hora_inicio) {
        reject(new Error('Película, sala, fecha y hora de inicio son obligatorios'));
        return;
      }
      
      Funcion.getById(id)
        .then(funcion => {
          if (!funcion) {
            reject(new Error('Función no encontrada'));
            return;
          }

          return Funcion.update(id, funcionData);
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // DELETE /api/funciones/:id - Eliminar una función
  static delete(id) {
    return new Promise((resolve, reject) => {
      Funcion.getById(id)
        .then(funcion => {
          if (!funcion) {
            reject(new Error('Función no encontrada'));
            return;
          }

          return Funcion.delete(id);
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

module.exports = FuncionController;
