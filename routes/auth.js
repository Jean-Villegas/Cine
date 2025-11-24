const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// POST /api/auth/login - Iniciar sesión
router.post('/login', (req, res) => {
  AuthController.login(req, res).catch(error => {
    console.error('Error no manejado en login:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor.'
      });
    }
  });
});

// POST /api/auth/logout - Cerrar sesión
router.post('/logout', (req, res) => {
  AuthController.logout(req, res);
});

// GET /api/auth/verify - Verificar si el usuario está autenticado
router.get('/verify', authenticateToken, (req, res) => {
  AuthController.verify(req, res).catch(error => {
    console.error('Error no manejado en verify:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor.'
      });
    }
  });
});

// POST /api/auth/register - Registrar nuevo usuario
router.post('/register', (req, res) => {
  AuthController.register(req, res).catch(error => {
    console.error('Error no manejado en register:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor.'
      });
    }
  });
});

module.exports = router;

