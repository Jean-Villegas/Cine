const express = require('express');
const router = express.Router();
const SalaController = require('../controllers/salaController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Proteger todas las rutas con autenticación y requerir admin
router.use(authenticateToken);
router.use(requireAdmin);

// GET /api/salas - Obtener todas las salas
router.get('/', (req, res) => {
  SalaController.getAll()
    .then(salas => {
      res.send({
        success: true,
        data: salas,
        count: salas.length
      });
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: error.message
      });
    });
});

// GET /api/salas/:id - Obtener una sala por ID
router.get('/:id', (req, res) => {
  SalaController.getById(req.params.id)
    .then(sala => {
      res.send({
        success: true,
        data: sala
      });
    })
    .catch(error => {
      res.status(404).send({
        success: false,
        message: error.message
      });
    });
});

// POST /api/salas - Crear una nueva sala
router.post('/', (req, res) => {
  SalaController.create(req.body)
    .then(result => {
      res.status(201).send({
        success: true,
        message: 'Sala creada exitosamente',
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

// PUT /api/salas/:id - Actualizar una sala
router.put('/:id', (req, res) => {
  SalaController.update(req.params.id, req.body)
    .then(result => {
      res.send({
        success: true,
        message: 'Sala actualizada exitosamente',
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

// DELETE /api/salas/:id - Eliminar una sala
router.delete('/:id', (req, res) => {
  SalaController.delete(req.params.id)
    .then(result => {
      res.send({
        success: true,
        message: 'Sala eliminada exitosamente'
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
