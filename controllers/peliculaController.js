const Pelicula = require('../models/Pelicula');

class PeliculaController {
  // GET /api/peliculas - Obtener todas las películas
  static getAll() {
    return new Promise((resolve, reject) => {
      Pelicula.getAll()
        .then(peliculas => {
          resolve(peliculas);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // GET /api/peliculas/:id - Obtener una película por ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      Pelicula.getById(id)
        .then(pelicula => {
          resolve(pelicula);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // POST /api/peliculas - Crear una nueva película
  static create(peliculaData) {
    return new Promise((resolve, reject) => {
      // Lógica de negocio: validaciones
      if (!peliculaData.titulo) {
        reject(new Error('El título es obligatorio'));
        return;
      }
      
      Pelicula.create(peliculaData)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // PUT /api/peliculas/:id - Actualizar una película
  static update(id, peliculaData) {
    return new Promise((resolve, reject) => {
      // Lógica de negocio: validaciones
      if (!peliculaData.titulo) {
        reject(new Error('El título es obligatorio'));
        return;
      }
      
      Pelicula.getById(id)
        .then(pelicula => {
          if (!pelicula) {
            reject(new Error('Película no encontrada'));
            return;
          }

          return Pelicula.update(id, peliculaData);
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // DELETE /api/peliculas/:id - Eliminar una película
  static delete(id) {
    return new Promise((resolve, reject) => {
      Pelicula.getById(id)
        .then(pelicula => {
          if (!pelicula) {
            reject(new Error('Película no encontrada'));
            return;
          }

          return Pelicula.delete(id);
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

module.exports = PeliculaController;
