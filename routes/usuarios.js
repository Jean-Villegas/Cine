const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

// GET /api/usuarios - Obtener todos los usuarios
router.get('/', (req, res) => {
  UsuarioController.getAll()
    .then(usuarios => {
      res.send({
        success: true,
        data: usuarios,
        count: usuarios.length
      });
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: error.message
      });
    });
});

// GET /api/usuarios/:id - Obtener un usuario por ID
router.get('/:id', (req, res) => {
  UsuarioController.getById(req.params.id)
    .then(usuario => {
      res.send({
        success: true,
        data: usuario
      });
    })
    .catch(error => {
      res.status(404).send({
        success: false,
        message: error.message
      });
    });
});

// POST /api/usuarios - Crear un nuevo usuario
router.post('/', (req, res) => {
  UsuarioController.create(req.body)
    .then(result => {
      res.status(201).send({
        success: true,
        message: 'Usuario creado exitosamente',
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

// PUT /api/usuarios/:id - Actualizar un usuario
router.put('/:id', (req, res) => {
  UsuarioController.update(req.params.id, req.body)
    .then(result => {
      res.send({
        success: true,
        message: 'Usuario actualizado exitosamente',
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

// DELETE /api/usuarios/:id - Eliminar un usuario
router.delete('/:id', (req, res) => {
  UsuarioController.delete(req.params.id)
    .then(result => {
      res.send({
        success: true,
        message: 'Usuario eliminado exitosamente'
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
