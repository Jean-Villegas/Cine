const Boleto = require('../models/Boleto');

class BoletoController {
  // GET /api/boletos - Obtener todos los boletos
  static getAll() {
    return new Promise((resolve, reject) => {
      Boleto.getAll()
        .then(boletos => {
          resolve(boletos);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // GET /api/boletos/:id - Obtener un boleto por ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      Boleto.getById(id)
        .then(boleto => {
          resolve(boleto);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // POST /api/boletos - Crear un nuevo boleto
  static create(boletoData) {
    return new Promise((resolve, reject) => {
      // Lógica de negocio: validaciones
      if (!boletoData.funcion_id || !boletoData.numero_asiento) {
        reject(new Error('Función y número de asiento son obligatorios'));
        return;
      }
      
      Boleto.create(boletoData)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // PUT /api/boletos/:id - Actualizar un boleto
  static update(id, boletoData) {
    return new Promise((resolve, reject) => {
      // Lógica de negocio: validaciones
      if (!boletoData.funcion_id || !boletoData.numero_asiento) {
        reject(new Error('Función y número de asiento son obligatorios'));
        return;
      }
      
      Boleto.getById(id)
        .then(boleto => {
          if (!boleto) {
            reject(new Error('Boleto no encontrado'));
            return;
          }

          return Boleto.update(id, boletoData);
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // DELETE /api/boletos/:id - Eliminar un boleto
  static delete(id) {
    return new Promise((resolve, reject) => {
      Boleto.getById(id)
        .then(boleto => {
          if (!boleto) {
            reject(new Error('Boleto no encontrado'));
            return;
          }

          return Boleto.delete(id);
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

module.exports = BoletoController;
