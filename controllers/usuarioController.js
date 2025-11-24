const Usuario = require('../models/Usuario');

class UsuarioController {
  // GET /api/usuarios - Obtener todos los usuarios
  static getAll() {
    return new Promise((resolve, reject) => {
      Usuario.getAll()
        .then(usuarios => {
          resolve(usuarios);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // GET /api/usuarios/:id - Obtener un usuario por ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      Usuario.getById(id)
        .then(usuario => {
          resolve(usuario);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // POST /api/usuarios - Crear un nuevo usuario
  static create(usuarioData) {
    return new Promise((resolve, reject) => {
      // Lógica de negocio: validaciones
      if (!usuarioData.nombre || !usuarioData.apellido || !usuarioData.email) {
        reject(new Error('Nombre, apellido y email son obligatorios'));
        return;
      }
      
      Usuario.create(usuarioData)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // PUT /api/usuarios/:id - Actualizar un usuario
  static update(id, usuarioData) {
    return new Promise((resolve, reject) => {
      // Lógica de negocio: validaciones
      if (!usuarioData.nombre || !usuarioData.apellido || !usuarioData.email) {
        reject(new Error('Nombre, apellido y email son obligatorios'));
        return;
      }
      
      Usuario.getById(id)
        .then(usuario => {
          if (!usuario) {
            reject(new Error('Usuario no encontrado'));
            return;
          }

          return Usuario.update(id, usuarioData);
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // DELETE /api/usuarios/:id - Eliminar un usuario
  static delete(id) {
    return new Promise((resolve, reject) => {
      Usuario.getById(id)
        .then(usuario => {
          if (!usuario) {
            reject(new Error('Usuario no encontrado'));
            return;
          }

          return Usuario.delete(id);
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

module.exports = UsuarioController;
