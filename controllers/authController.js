const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query, queryResult } = require('../db');
const { JWT_SECRET } = require('../middleware/auth');

class AuthController {
  /**
   * Iniciar sesión
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validar que se proporcionen email y password
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email y contraseña son requeridos.'
        });
      }

      // Buscar usuario por email
      const usuarios = await query(
        'SELECT id, nombre, apellido, email, password, rol, tipo_usuario, estado FROM usuarios WHERE email = ?',
        [email]
      );

      if (usuarios.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas.'
        });
      }

      const usuario = usuarios[0];

      // Verificar que el usuario esté activo
      if (usuario.estado !== 'activo') {
        return res.status(401).json({
          success: false,
          message: 'Usuario inactivo. Contacta al administrador.'
        });
      }

      // Verificar que tenga contraseña (si no tiene, es un usuario antiguo sin password)
      if (!usuario.password) {
        return res.status(401).json({
          success: false,
          message: 'Usuario sin contraseña configurada. Contacta al administrador.'
        });
      }

      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, usuario.password);

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas.'
        });
      }

      // Generar token JWT
      const token = jwt.sign(
        {
          userId: usuario.id,
          email: usuario.email,
          rol: usuario.rol
        },
        JWT_SECRET,
        { expiresIn: '24h' } // El token expira en 24 horas
      );

      // Configurar cookie con el token
      res.cookie('token', token, {
        httpOnly: true, // Previene acceso desde JavaScript (XSS protection)
        secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
        sameSite: 'strict', // Protección CSRF
        maxAge: 24 * 60 * 60 * 1000 // 24 horas en milisegundos
      });

      // Responder con éxito (sin enviar la contraseña)
      res.json({
        success: true,
        message: 'Inicio de sesión exitoso.',
        user: {
          id: usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          rol: usuario.rol,
          tipo_usuario: usuario.tipo_usuario
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Cerrar sesión
   */
  static logout(req, res) {
    // Eliminar la cookie del token
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0) // Fecha en el pasado para eliminar la cookie
    });

    res.json({
      success: true,
      message: 'Sesión cerrada exitosamente.'
    });
  }

  /**
   * Verificar si el usuario está autenticado
   */
  static async verify(req, res) {
    try {
      // Si llegamos aquí, el middleware authenticateToken ya verificó el token
      res.json({
        success: true,
        user: {
          id: req.user.id,
          nombre: req.user.nombre,
          apellido: req.user.apellido,
          email: req.user.email,
          rol: req.user.rol,
          tipo_usuario: req.user.tipo_usuario
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al verificar la sesión.'
      });
    }
  }

  /**
   * Registrar un nuevo usuario (solo para usuarios normales, no admin)
   */
  static async register(req, res) {
    try {
      const { nombre, apellido, email, password, telefono, fecha_nacimiento } = req.body;

      // Validaciones
      if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Nombre, apellido, email y contraseña son requeridos.'
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'La contraseña debe tener al menos 6 caracteres.'
        });
      }

      // Verificar si el email ya existe
      const usuariosExistentes = await query(
        'SELECT id FROM usuarios WHERE email = ?',
        [email]
      );

      if (usuariosExistentes.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'El email ya está registrado.'
        });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el usuario (rol por defecto: 'usuario')
      const result = await queryResult(
        `INSERT INTO usuarios (nombre, apellido, email, password, telefono, fecha_nacimiento, rol, tipo_usuario, fecha_registro, estado, puntos) 
         VALUES (?, ?, ?, ?, ?, ?, 'usuario', 'cliente', CURDATE(), 'activo', 0)`,
        [nombre, apellido, email, hashedPassword, telefono || null, fecha_nacimiento || null]
      );

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente.',
        userId: result.insertId
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar usuario.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = AuthController;

