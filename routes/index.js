var express = require('express');
var router = express.Router();
const peliculasController = require('../controllers/peliculasController');
const salasController = require('../controllers/salasController');
const funcionesController = require('../controllers/funcionesController');
const usuariosController = require('../controllers/usuariosController');
const boletosController = require('../controllers/boletosController');

// ===== RUTAS DE VISTAS =====

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CineApp' });
});

/* GET películas page. */
router.get('/peliculas', peliculasController.renderList.bind(peliculasController));

/* GET formulario para agregar película. */
router.get('/peliculas/agregar', peliculasController.renderForm.bind(peliculasController));

/* GET detalle de película. */
router.get('/peliculas/:id', peliculasController.renderDetail.bind(peliculasController));

/* GET página de confirmación. */
router.get('/confirmacion', function(req, res, next) {
  res.render('confirmacion', { title: 'Confirmación - CineApp' });
});

/* GET salas page. */
router.get('/salas', salasController.renderList.bind(salasController));

/* GET formulario para agregar sala. */
router.get('/salas/agregar', salasController.renderForm.bind(salasController));

/* GET detalle de sala. */
router.get('/salas/:id', salasController.renderDetail.bind(salasController));

/* GET funciones page. */
router.get('/funciones', funcionesController.renderList ? funcionesController.renderList.bind(funcionesController) : function(req,res){res.render('funciones',{title:'Funciones - CineApp'});} );

/* GET formulario para agregar función. */
router.get('/funciones/agregar', funcionesController.renderForm ? funcionesController.renderForm.bind(funcionesController) : function(req,res){res.render('funcion-form',{title:'Agregar Función - CineApp'});} );

/* GET detalle de función. */
router.get('/funciones/:id', funcionesController.renderDetail ? funcionesController.renderDetail.bind(funcionesController) : function(req,res){res.render('funcion-detalle',{title:'Detalle de Función - CineApp'});} );

/* GET usuarios page. */
router.get('/usuarios', usuariosController.renderList ? usuariosController.renderList.bind(usuariosController) : function(req,res){res.render('usuarios',{title:'Usuarios - CineApp'});} );

/* GET formulario para agregar usuario. */
router.get('/usuarios/agregar', usuariosController.renderForm ? usuariosController.renderForm.bind(usuariosController) : function(req,res){res.render('usuario-form',{title:'Agregar Usuario - CineApp'});} );

/* GET detalle de usuario. */
router.get('/usuarios/:id', usuariosController.renderDetail ? usuariosController.renderDetail.bind(usuariosController) : function(req,res){res.render('usuario-detalle',{title:'Detalle de Usuario - CineApp'});} );

/* GET boletos page. */
router.get('/boletos', boletosController.renderList ? boletosController.renderList.bind(boletosController) : function(req,res){res.render('boletos',{title:'Boletos - CineApp'});} );

/* GET formulario para agregar boleto. */
router.get('/boletos/agregar', boletosController.renderForm ? boletosController.renderForm.bind(boletosController) : function(req,res){res.render('boleto-form',{title:'Agregar Boleto - CineApp'});} );

/* GET detalle de boleto. */
router.get('/boletos/:id', boletosController.renderDetail ? boletosController.renderDetail.bind(boletosController) : function(req,res){res.render('boleto-detalle',{title:'Detalle de Boleto - CineApp'});} );

/* GET formulario de prueba. */
router.get('/test', function(req, res, next) {
  res.render('test-form', { title: 'Test Form - CineApp' });
});

module.exports = router;
