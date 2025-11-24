const express = require('express');
const router = express.Router();
const FuncionController = require('../controllers/funcionController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Proteger todas las rutas con autenticación
router.use(authenticateToken);

// GET /api/funciones - Obtener todas las funciones (todos los usuarios autenticados)
router.get('/', (req, res) => {
  FuncionController.getAll()
    .then(funciones => {
      res.send({
        success: true,
        data: funciones,
        count: funciones.length
      });
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: error.message
      });
    });
});

// GET /api/funciones/:id - Obtener una función por ID (todos los usuarios autenticados)
router.get('/:id', (req, res) => {
  FuncionController.getById(req.params.id)
    .then(funcion => {
      res.send({
        success: true,
        data: funcion
      });
    })
    .catch(error => {
      res.status(404).send({
        success: false,
        message: error.message
      });
    });
});

// POST /api/funciones - Crear una nueva función (solo admin)
router.post('/', requireAdmin, (req, res) => {
  FuncionController.create(req.body)
    .then(result => {
      res.status(201).send({
        success: true,
        message: 'Función creada exitosamente',
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

// PUT /api/funciones/:id - Actualizar una función (solo admin)
router.put('/:id', requireAdmin, (req, res) => {
  FuncionController.update(req.params.id, req.body)
    .then(result => {
      res.send({
        success: true,
        message: 'Función actualizada exitosamente',
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

// DELETE /api/funciones/:id - Eliminar una función (solo admin)
router.delete('/:id', requireAdmin, (req, res) => {
  FuncionController.delete(req.params.id)
    .then(result => {
      res.send({
        success: true,
        message: 'Función eliminada exitosamente'
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
