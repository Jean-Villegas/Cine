const express = require('express');
const router = express.Router();

// GET /login - Página de login
router.get('/login', (req, res) => {
  res.render('login', { 
    title: 'Iniciar Sesión',
    message: 'Inicia sesión en el sistema'
  });
});

// GET / - Página principal
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Sistema de Cine',
    message: 'Bienvenido al sistema de gestión de cine'
  });
});

// GET /peliculas - Vista de películas
router.get('/peliculas', (req, res) => {
  res.render('peliculas', { 
    title: 'Películas',
    message: 'Gestión de películas'
  });
});

// GET /usuarios - Vista de usuarios
router.get('/usuarios', (req, res) => {
  res.render('usuarios', { 
    title: 'Usuarios',
    message: 'Gestión de usuarios'
  });
});

// GET /salas - Vista de salas
router.get('/salas', (req, res) => {
  res.render('salas', { 
    title: 'Salas',
    message: 'Gestión de salas'
  });
});

// GET /funciones - Vista de funciones
router.get('/funciones', (req, res) => {
  res.render('funciones', { 
    title: 'Funciones',
    message: 'Gestión de funciones'
  });
});

// GET /boletos - Vista de boletos
router.get('/boletos', (req, res) => {
  res.render('boletos', { 
    title: 'Boletos',
    message: 'Gestión de boletos'
  });
});

module.exports = router;
