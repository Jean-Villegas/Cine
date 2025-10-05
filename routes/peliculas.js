const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculasController');

// ===== RUTAS PARA PELÍCULAS =====

// GET /peliculas - Listar todas las películas
router.get('/', peliculasController.listar);

// GET /peliculas/activas - Listar solo películas activas
router.get('/activas', peliculasController.obtenerActivas);

// GET /peliculas/:id - Obtener película por ID
router.get('/:id', peliculasController.obtenerPorId);

// POST /peliculas - Agregar nueva película
router.post('/', peliculasController.agregar);

// PUT /peliculas/:id - Editar película existente
router.put('/:id', peliculasController.editar);

// DELETE /peliculas/:id - Eliminar película
router.delete('/:id', peliculasController.eliminar);

module.exports = router;