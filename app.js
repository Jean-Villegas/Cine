var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var peliculasRouter = require('./routes/peliculas');
var salasRouter = require('./routes/salas');
var funcionesRouter = require('./routes/funciones');
var boletosRouter = require('./routes/boletos');
var usuariosRouter = require('./routes/usuarios');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas principales
app.use('/', indexRouter);

// Rutas API
// Rutas de autenticación
app.use('/api/auth', authRouter);
// Rutas para usuarios: mantenemos /api/users por compatibilidad y añadimos /api/usuarios
app.use('/api/users', usuariosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/peliculas', peliculasRouter);
app.use('/api/salas', salasRouter);
app.use('/api/funciones', funcionesRouter);
app.use('/api/boletos', boletosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
