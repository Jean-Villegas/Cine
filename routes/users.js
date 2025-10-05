const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// ===== RUTAS PARA USUARIOS =====

// GET /users - Listar todos los usuarios
router.get('/', usuariosController.listar);

// GET /users/activos - Listar solo usuarios activos
router.get('/activos', usuariosController.obtenerActivos);

// GET /users/tipo/:tipo - Listar usuarios por tipo
router.get('/tipo/:tipo', usuariosController.obtenerPorTipo);

// GET /users/:id - Obtener usuario por ID
router.get('/:id', usuariosController.obtenerPorId);

// POST /users - Agregar nuevo usuario
router.post('/', usuariosController.agregar);

// POST /users/login - Login de usuario
router.post('/login', usuariosController.login);

// PUT /users/:id - Editar usuario existente
router.put('/:id', usuariosController.editar);

// DELETE /users/:id - Eliminar usuario
router.delete('/:id', usuariosController.eliminar);

module.exports = router;
