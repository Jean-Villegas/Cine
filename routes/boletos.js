const express = require('express');
const router = express.Router();
const BoletoController = require('../controllers/boletoController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Proteger todas las rutas con autenticación y requerir admin
router.use(authenticateToken);
router.use(requireAdmin);

// GET /api/boletos - Obtener todos los boletos
router.get('/', (req, res) => {
  BoletoController.getAll()
    .then(boletos => {
      res.send({
        success: true,
        data: boletos,
        count: boletos.length
      });
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: error.message
      });
    });
});

// GET /api/boletos/:id - Obtener un boleto por ID
router.get('/:id', (req, res) => {
  BoletoController.getById(req.params.id)
    .then(boleto => {
      res.send({
        success: true,
        data: boleto
      });
    })
    .catch(error => {
      res.status(404).send({
        success: false,
        message: error.message
      });
    });
});

// POST /api/boletos - Crear un nuevo boleto
router.post('/', (req, res) => {
  BoletoController.create(req.body)
    .then(result => {
      res.status(201).send({
        success: true,
        message: 'Boleto creado exitosamente',
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

// PUT /api/boletos/:id - Actualizar un boleto
router.put('/:id', (req, res) => {
  BoletoController.update(req.params.id, req.body)
    .then(result => {
      res.send({
        success: true,
        message: 'Boleto actualizado exitosamente',
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

// DELETE /api/boletos/:id - Eliminar un boleto
router.delete('/:id', (req, res) => {
  BoletoController.delete(req.params.id)
    .then(result => {
      res.send({
        success: true,
        message: 'Boleto eliminado exitosamente'
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
