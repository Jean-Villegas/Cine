const express = require('express');
const router = express.Router();
const funcionesController = require('../controllers/funcionesController');

// ===== RUTAS PARA FUNCIONES =====

// GET /funciones - Listar todas las funciones
router.get('/', funcionesController.listar);

// GET /funciones/pelicula/:peliculaId - Obtener funciones por película
router.get('/pelicula/:peliculaId', funcionesController.obtenerPorPelicula);

// GET /funciones/fecha/:fecha - Obtener funciones por fecha
router.get('/fecha/:fecha', funcionesController.obtenerPorFecha);

// GET /funciones/:id - Obtener función por ID
router.get('/:id', funcionesController.obtenerPorId);

// POST /funciones - Agregar nueva función
router.post('/', funcionesController.agregar);

// PUT /funciones/:id - Editar función existente
router.put('/:id', funcionesController.editar);

// DELETE /funciones/:id - Eliminar función
router.delete('/:id', funcionesController.eliminar);

module.exports = router;