const { query } = require('../db');

class Usuario {
  // Obtener todos los usuarios
  static getAll() {
    return new Promise((resolve, reject) => {
      query('SELECT * FROM usuarios ORDER BY nombre')
        .then(usuarios => {
          resolve(usuarios);
        })
        .catch(error => {
          reject(new Error(`Error al obtener usuarios: ${error.message}`));
        });
    });
  }

  // Obtener usuario por ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      query('SELECT * FROM usuarios WHERE id = ?', [id])
        .then(usuarios => {
          if (usuarios.length === 0) {
            resolve(null);
          } else {
            resolve(usuarios[0]);
          }
        })
        .catch(error => {
          reject(new Error(`Error al obtener usuario: ${error.message}`));
        });
    });
  }

  // Obtener usuario por email (para autenticación)
  static getByEmail(email) {
    return new Promise((resolve, reject) => {
      query('SELECT * FROM usuarios WHERE email = ?', [email])
        .then(usuarios => {
          if (usuarios.length === 0) {
            resolve(null);
          } else {
            resolve(usuarios[0]);
          }
        })
        .catch(error => {
          reject(new Error(`Error al obtener usuario por email: ${error.message}`));
        });
    });
  }

  // Crear nuevo usuario
  static create({ nombre, apellido, email, telefono, fecha_nacimiento, tipo_usuario = 'cliente', estado = 'activo', puntos = 0 }) {
    return new Promise((resolve, reject) => {
      // Validaciones
      if (!nombre || !apellido || !email) {
        reject(new Error('Nombre, apellido y email son obligatorios'));
        return;
      }

      query(
        `INSERT INTO usuarios (nombre, apellido, email, telefono, fecha_nacimiento, tipo_usuario, fecha_registro, estado, puntos) 
         VALUES (?, ?, ?, ?, ?, ?, CURDATE(), ?, ?)`,
        [nombre, apellido, email, telefono, fecha_nacimiento, tipo_usuario, estado, puntos]
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(new Error(`Error al crear usuario: ${error.message}`));
      });
    });
  }

  // Actualizar usuario
  static update(id, { nombre, apellido, email, telefono, fecha_nacimiento, tipo_usuario, estado, puntos }) {
    return new Promise((resolve, reject) => {
      query(
        `UPDATE usuarios SET 
         nombre = ?, apellido = ?, email = ?, telefono = ?, fecha_nacimiento = ?, 
         tipo_usuario = ?, estado = ?, puntos = ?
         WHERE id = ?`,
        [nombre, apellido, email, telefono, fecha_nacimiento, tipo_usuario, estado, puntos, id]
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(new Error(`Error al actualizar usuario: ${error.message}`));
      });
    });
  }

  // Eliminar usuario
  static delete(id) {
    return new Promise((resolve, reject) => {
      query('DELETE FROM usuarios WHERE id = ?', [id])
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(`Error al eliminar usuario: ${error.message}`));
        });
    });
  }
}

module.exports = Usuario;
