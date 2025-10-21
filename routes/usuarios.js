const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// ===== RUTAS PARA USUARIOS =====

// GET /usuarios - Listar todos los usuarios
router.get('/', usuariosController.listar);

// GET /usuarios/activos - Listar solo usuarios activos
router.get('/activos', usuariosController.obtenerActivos);

// GET /usuarios/tipo/:tipo - Listar usuarios por tipo
router.get('/tipo/:tipo', usuariosController.obtenerPorTipo);

// GET /usuarios/:id - Obtener usuario por ID
router.get('/:id', usuariosController.obtenerPorId);

// POST /usuarios - Agregar nuevo usuario
router.post('/', usuariosController.agregar);

// POST /usuarios/login - Login de usuario
router.post('/login', usuariosController.login);

// PUT /usuarios/:id - Editar usuario existente
router.put('/:id', usuariosController.editar);

// DELETE /usuarios/:id - Eliminar usuario
router.delete('/:id', usuariosController.eliminar);

module.exports = router;
