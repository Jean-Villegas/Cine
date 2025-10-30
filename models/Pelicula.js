const { query } = require('../db');

class Pelicula {

  // Obtener todas las películas
  static getAll() {
    return new Promise((resolve, reject) => {
      query('SELECT * FROM peliculas ORDER BY titulo')
        .then(peliculas => {
          resolve(peliculas);
        })
        .catch(error => {
          reject(new Error(`Error al obtener películas: ${error.message}`));
        });
    });
  }

  // Obtener película por ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      query('SELECT * FROM peliculas WHERE id = ?', [id])
        .then(peliculas => {
          if (peliculas.length === 0) {
            resolve(null);
          } else {
            resolve(peliculas[0]);
          }
        })
        .catch(error => {
          reject(new Error(`Error al obtener película: ${error.message}`));
        });
    });
  }

  // Crear nueva película
  static create({ titulo, director, genero, duracion, clasificacion, sinopsis, anio, idioma, subtitulos, formato, precio, estado = 'activa' }) {
    return new Promise((resolve, reject) => {
      // Validaciones
      if (!titulo) {
        reject(new Error('El título es obligatorio'));
        return;
      }

      query(
        `INSERT INTO peliculas (titulo, director, genero, duracion, clasificacion, sinopsis, anio, idioma, subtitulos, formato, precio, estado) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [titulo, director, genero, duracion, clasificacion, sinopsis, anio, idioma, subtitulos ? 1 : 0, formato, precio, estado]
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(new Error(`Error al crear película: ${error.message}`));
      });
    });
  }

  // Actualizar película
  static update(id, { titulo, director, genero, duracion, clasificacion, sinopsis, anio, idioma, subtitulos, formato, precio, estado }) {
    return new Promise((resolve, reject) => {
      query(
        `UPDATE peliculas SET 
         titulo = ?, director = ?, genero = ?, duracion = ?, clasificacion = ?, 
         sinopsis = ?, anio = ?, idioma = ?, subtitulos = ?, formato = ?, 
         precio = ?, estado = ?
         WHERE id = ?`,
        [titulo, director, genero, duracion, clasificacion, sinopsis, anio, idioma, subtitulos ? 1 : 0, formato, precio, estado, id]
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(new Error(`Error al actualizar película: ${error.message}`));
      });
    });
  }

  // Eliminar película
  static delete(id) {
    return new Promise((resolve, reject) => {
      query('DELETE FROM peliculas WHERE id = ?', [id])
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(`Error al eliminar película: ${error.message}`));
        });
    });
  }


}

module.exports = Pelicula;
