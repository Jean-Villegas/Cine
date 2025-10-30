const express = require('express');
const router = express.Router();
const PeliculaController = require('../controllers/peliculaController');

// GET /api/peliculas - Obtener todas las películas
router.get('/', (req, res) => {
  PeliculaController.getAll()
    .then(peliculas => {
      res.send({
        success: true,
        data: peliculas,
        count: peliculas.length
      });
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: error.message
      });
    });
});

// GET /api/peliculas/:id - Obtener una película por ID
router.get('/:id', (req, res) => {
  PeliculaController.getById(req.params.id)
    .then(pelicula => {
      res.send({
        success: true,
        data: pelicula
      });
    })
    .catch(error => {
      res.status(404).send({
        success: false,
        message: error.message
      });
    });
});

// POST /api/peliculas - Crear una nueva película
router.post('/', (req, res) => {
  PeliculaController.create(req.body)
    .then(result => {
      res.status(201).send({
        success: true,
        message: 'Película creada exitosamente',
        data: result
      });
    })
    .catch(error => {
      res.status(400).send({
        success: false,
        message: error.message
      });
    });
});

// PUT /api/peliculas/:id - Actualizar una película
router.put('/:id', (req, res) => {
  PeliculaController.update(req.params.id, req.body)
    .then(result => {
      res.send({
        success: true,
        message: 'Película actualizada exitosamente',
        data: result
      });
    })
    .catch(error => {
      res.status(404).send({
        success: false,
        message: error.message
      });
    });
});

// DELETE /api/peliculas/:id - Eliminar una película
router.delete('/:id', (req, res) => {
  PeliculaController.delete(req.params.id)
    .then(result => {
      res.send({
        success: true,
        message: 'Película eliminada exitosamente'
      });
    })
    .catch(error => {
      res.status(404).send({
        success: false,
        message: error.message
      });
    });
});

module.exports = router;