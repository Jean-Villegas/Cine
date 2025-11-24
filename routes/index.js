const express = require('express');
const router = express.Router();
const { requireAuthView, requireAdminView } = require('../middleware/auth');

// GET /login - Página de login (pública)
router.get('/login', (req, res) => {
  // Si ya está autenticado, redirigir a la página principal
  if (req.cookies.token) {
    return res.redirect('/');
  }
  res.render('login', { 
    title: 'Iniciar Sesión',
    message: 'Inicia sesión en el sistema'
  });
});

// GET /register - Página de registro (pública)
router.get('/register', (req, res) => {
  // Si ya está autenticado, redirigir a la página principal
  if (req.cookies.token) {
    return res.redirect('/');
  }
  res.render('register', { 
    title: 'Registro',
    message: 'Crea una nueva cuenta'
  });
});

// GET / - Página principal (requiere autenticación)
router.get('/', requireAuthView, (req, res) => {
  res.render('index', { 
    title: 'Sistema de Cine',
    message: 'Bienvenido al sistema de gestión de cine',
    user: req.user
  });
});

// GET /peliculas - Vista de películas (requiere autenticación)
router.get('/peliculas', requireAuthView, (req, res) => {
  res.render('peliculas', { 
    title: 'Películas',
    message: 'Gestión de películas',
    user: req.user
  });
});

// GET /usuarios - Vista de usuarios (solo administradores)
router.get('/usuarios', requireAuthView, requireAdminView, (req, res) => {
  res.render('usuarios', { 
    title: 'Usuarios',
    message: 'Gestión de usuarios',
    user: req.user
  });
});

// GET /salas - Vista de salas (solo administradores)
router.get('/salas', requireAuthView, requireAdminView, (req, res) => {
  res.render('salas', { 
    title: 'Salas',
    message: 'Gestión de salas',
    user: req.user
  });
});

// GET /funciones - Vista de funciones (requiere autenticación)
router.get('/funciones', requireAuthView, (req, res) => {
  res.render('funciones', { 
    title: 'Funciones',
    message: 'Gestión de funciones',
    user: req.user
  });
});

// GET /boletos - Vista de boletos (requiere autenticación)
router.get('/boletos', requireAuthView, (req, res) => {
  res.render('boletos', { 
    title: 'Boletos',
    message: 'Gestión de boletos',
    user: req.user
  });
});

module.exports = router;
