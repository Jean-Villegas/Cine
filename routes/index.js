var express = require('express');
var router = express.Router();

// ===== RUTAS DE VISTAS =====

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CineApp' });
});

/* GET películas page. */
router.get('/peliculas', function(req, res, next) {
  res.render('peliculas', { title: 'Películas - CineApp' });
});

/* GET formulario para agregar película. */
router.get('/peliculas/agregar', function(req, res, next) {
  res.render('pelicula-form', { title: 'Agregar Película - CineApp' });
});

/* GET formulario para editar película. */
router.get('/peliculas/:id/editar', function(req, res, next) {
  res.render('pelicula-edit', { title: 'Editar Película - CineApp' });
});

/* GET detalle de película. */
router.get('/peliculas/:id', function(req, res, next) {
  res.render('pelicula-detalle', { title: 'Detalle de Película - CineApp' });
});

/* GET página de confirmación. */
router.get('/confirmacion', function(req, res, next) {
  res.render('confirmacion', { title: 'Confirmación - CineApp' });
});

/* GET salas page. */
router.get('/salas', function(req, res, next) {
  res.render('salas', { title: 'Salas - CineApp' });
});

/* GET formulario para agregar sala. */
router.get('/salas/agregar', function(req, res, next) {
  res.render('sala-form', { title: 'Agregar Sala - CineApp' });
});

/* GET formulario para editar sala. */
router.get('/salas/:id/editar', function(req, res, next) {
  res.render('sala-edit', { title: 'Editar Sala - CineApp' });
});

/* GET detalle de sala. */
router.get('/salas/:id', function(req, res, next) {
  res.render('sala-detalle', { title: 'Detalle de Sala - CineApp' });
});

/* GET funciones page. */
router.get('/funciones', function(req, res, next) {
  res.render('funciones', { title: 'Funciones - CineApp' });
});

/* GET formulario para agregar función. */
router.get('/funciones/agregar', function(req, res, next) {
  res.render('funcion-form', { title: 'Agregar Función - CineApp' });
});

/* GET formulario para editar función. */
router.get('/funciones/:id/editar', function(req, res, next) {
  res.render('funcion-edit', { title: 'Editar Función - CineApp' });
});

/* GET detalle de función. */
router.get('/funciones/:id', function(req, res, next) {
  res.render('funcion-detalle', { title: 'Detalle de Función - CineApp' });
});

/* GET usuarios page. */
router.get('/usuarios', function(req, res, next) {
  res.render('usuarios', { title: 'Usuarios - CineApp' });
});

/* GET formulario para agregar usuario. */
router.get('/usuarios/agregar', function(req, res, next) {
  res.render('usuario-form', { title: 'Agregar Usuario - CineApp' });
});

/* GET formulario para editar usuario. */
router.get('/usuarios/:id/editar', function(req, res, next) {
  res.render('usuario-edit', { title: 'Editar Usuario - CineApp' });
});

/* GET detalle de usuario. */
router.get('/usuarios/:id', function(req, res, next) {
  res.render('usuario-detalle', { title: 'Detalle de Usuario - CineApp' });
});

/* GET boletos page. */
router.get('/boletos', function(req, res, next) {
  res.render('boletos', { title: 'Boletos - CineApp' });
});

/* GET formulario para agregar boleto. */
router.get('/boletos/agregar', function(req, res, next) {
  res.render('boleto-form', { title: 'Agregar Boleto - CineApp' });
});

/* GET formulario para editar boleto. */
router.get('/boletos/:id/editar', function(req, res, next) {
  res.render('boleto-edit', { title: 'Editar Boleto - CineApp' });
});

/* GET detalle de boleto. */
router.get('/boletos/:id', function(req, res, next) {
  res.render('boleto-detalle', { title: 'Detalle de Boleto - CineApp' });
});

/* GET formulario de prueba. */
router.get('/test', function(req, res, next) {
  res.render('test-form', { title: 'Test Form - CineApp' });
});

module.exports = router;
