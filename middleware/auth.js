const jwt = require('jsonwebtoken');
const { query } = require('../db');

// Clave secreta para JWT (en producción debería estar en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura_cambiar_en_produccion';

/**
 * Middleware para verificar el token JWT desde las cookies
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Obtener el token de las cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Acceso denegado. No hay token proporcionado.'
      });
    }

    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Obtener el usuario de la base de datos
    const usuarios = await query('SELECT id, nombre, apellido, email, tipo_usuario, rol FROM usuarios WHERE id = ? AND estado = ?', [decoded.userId, 'activo']);
    
    if (usuarios.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado o inactivo.'
      });
    }

    // Agregar información del usuario al request
    req.user = usuarios[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido.'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado. Por favor, inicia sesión nuevamente.'
      });
    }
    console.error('Error en authenticateToken:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al verificar el token.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Middleware para verificar que el usuario sea administrador
 */
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'No autenticado.'
    });
  }

  if (req.user.rol !== 'administrador') {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requieren permisos de administrador.'
    });
  }

  next();
};

/**
 * Middleware para verificar que el usuario sea administrador o usuario normal
 */
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'No autenticado.'
    });
  }

  if (req.user.rol !== 'administrador' && req.user.rol !== 'usuario') {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Rol no válido.'
    });
  }

  next();
};

/**
 * Middleware para proteger vistas (redirige a login en lugar de devolver JSON)
 */
const requireAuthView = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect('/login');
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    const usuarios = await query('SELECT id, nombre, apellido, email, tipo_usuario, rol FROM usuarios WHERE id = ? AND estado = ?', [decoded.userId, 'activo']);
    
    if (usuarios.length === 0) {
      return res.redirect('/login');
    }

    req.user = usuarios[0];
    next();
  } catch (error) {
    // Si hay error, redirigir a login
    return res.redirect('/login');
  }
};

/**
 * Middleware para proteger vistas solo para administradores
 */
const requireAdminView = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  if (req.user.rol !== 'administrador') {
    return res.status(403).render('error', {
      status: 403,
      message: 'No tienes permisos para acceder a esta página. Se requieren permisos de administrador.'
    });
  }

  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireAuth,
  requireAuthView,
  requireAdminView,
  JWT_SECRET
};

