const express = require('express');
const router = express.Router();
const boletosController = require('../controllers/boletosController');

// ===== RUTAS PARA BOLETOS =====

// GET /boletos - Listar todos los boletos
router.get('/', boletosController.listar);

// GET /boletos/usuario/:usuarioId - Obtener boletos por usuario
router.get('/usuario/:usuarioId', boletosController.obtenerPorUsuario);

// GET /boletos/funcion/:funcionId - Obtener boletos por función
router.get('/funcion/:funcionId', boletosController.obtenerPorFuncion);

// GET /boletos/:id - Obtener boleto por ID
router.get('/:id', boletosController.obtenerPorId);

// POST /boletos - Comprar nuevo boleto
router.post('/', boletosController.comprar);

// PUT /boletos/:id - Actualizar boleto
router.put('/:id', boletosController.actualizar);

// PUT /boletos/:id/usar - Marcar boleto como usado
router.put('/:id/usar', boletosController.usarBoleto);

// DELETE /boletos/:id - Cancelar/eliminar boleto
router.delete('/:id', boletosController.cancelar);

module.exports = router;