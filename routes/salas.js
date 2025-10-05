const express = require('express');
const router = express.Router();
const salasController = require('../controllers/salasController');

// ===== RUTAS PARA SALAS =====

// GET /salas - Listar todas las salas
router.get('/', salasController.listar);

// GET /salas/activas - Listar solo salas activas
router.get('/activas', salasController.obtenerActivas);

// GET /salas/tipo/:tipo - Listar salas por tipo
router.get('/tipo/:tipo', salasController.obtenerPorTipo);

// GET /salas/:id - Obtener sala por ID
router.get('/:id', salasController.obtenerPorId);

// POST /salas - Agregar nueva sala
router.post('/', salasController.agregar);

// PUT /salas/:id - Editar sala existente
router.put('/:id', salasController.editar);

// DELETE /salas/:id - Eliminar sala
router.delete('/:id', salasController.eliminar);

module.exports = router;