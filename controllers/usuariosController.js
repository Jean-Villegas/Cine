const usuariosModel = require('../models/usuariosModel');

class UsuariosController {
    
    // GET /usuarios - Listar todos los usuarios
    async listar(req, res) {
        try {
            const usuarios = await usuariosModel.getAll();
            res.status(200).json({
                success: true,
                message: 'Usuarios obtenidos exitosamente',
                data: usuarios,
                count: usuarios.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los usuarios',
                error: error.message
            });
        }
    }

    // GET /usuarios/:id - Obtener usuario por ID
    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await usuariosModel.getById(id);
            
            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Usuario obtenido exitosamente',
                data: usuario
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener el usuario',
                error: error.message
            });
        }
    }

    // POST /usuarios - Agregar nuevo usuario
    async agregar(req, res) {
        try {
            const usuarioData = req.body;
            
            // Validaciones básicas
            if (!usuarioData.nombre || !usuarioData.email) {
                return res.status(400).json({
                    success: false,
                    message: 'El nombre y email son requeridos'
                });
            }

            // Verificar si el email ya existe
            const usuarios = await usuariosModel.getAll();
            const emailExiste = usuarios.some(u => u.email === usuarioData.email);
            
            if (emailExiste) {
                return res.status(400).json({
                    success: false,
                    message: 'El email ya está registrado'
                });
            }

            const nuevoUsuario = await usuariosModel.create(usuarioData);
            
            res.status(201).json({
                success: true,
                message: 'Usuario agregado exitosamente',
                data: nuevoUsuario
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al agregar el usuario',
                error: error.message
            });
        }
    }

    // PUT /usuarios/:id - Editar usuario
    async editar(req, res) {
        try {
            const { id } = req.params;
            const datosActualizacion = req.body;
            
            const usuarioActualizado = await usuariosModel.update(id, datosActualizacion);
            
            if (!usuarioActualizado) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Usuario actualizado exitosamente',
                data: usuarioActualizado
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el usuario',
                error: error.message
            });
        }
    }

    // DELETE /usuarios/:id - Eliminar usuario
    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const usuarioEliminado = await usuariosModel.remove(id);
            
            if (!usuarioEliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Usuario eliminado exitosamente',
                data: usuarioEliminado
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el usuario',
                error: error.message
            });
        }
    }

    // GET /usuarios/tipo/:tipo - Obtener usuarios por tipo
    async obtenerPorTipo(req, res) {
        try {
            const { tipo } = req.params;
            const usuarios = (await usuariosModel.getAll()).filter(u => (u.tipo_usuario || u.tipoUsuario).toLowerCase() === tipo.toLowerCase());
            
            res.status(200).json({
                success: true,
                message: `Usuarios de tipo ${tipo} obtenidos exitosamente`,
                data: usuarios,
                count: usuarios.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los usuarios por tipo',
                error: error.message
            });
        }
    }

    // GET /usuarios/activos - Obtener solo usuarios activos
    async obtenerActivos(req, res) {
        try {
            const usuarios = (await usuariosModel.getAll()).filter(u => u.estado === 'activo');
            res.status(200).json({
                success: true,
                message: 'Usuarios activos obtenidos exitosamente',
                data: usuarios,
                count: usuarios.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los usuarios activos',
                error: error.message
            });
        }
    }

    // POST /usuarios/login - Simular login (sin autenticación real)
    async login(req, res) {
        try {
            const { email } = req.body;
            
            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: 'Email es requerido'
                });
            }

            const usuario = (await usuariosModel.getAll()).find(u => u.email === email);
            
            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Login exitoso',
                data: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    tipoUsuario: usuario.tipoUsuario
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error en el login',
                error: error.message
            });
        }
    }

    // Render views
    async renderList(req, res) {
        try {
            const usuarios = await usuariosModel.getAll();
            res.render('usuarios', { title: 'Usuarios - CineApp', usuarios });
        } catch (err) {
            res.render('usuarios', { title: 'Usuarios - CineApp', usuarios: [] });
        }
    }

    async renderForm(req, res) {
        res.render('usuario-form', { title: 'Agregar Usuario - CineApp' });
    }

    async renderDetail(req, res) {
        const { id } = req.params;
        try {
            const usuario = await usuariosModel.getById(id);
            res.render('usuario-detalle', { title: 'Detalle de Usuario - CineApp', usuario });
        } catch (err) {
            res.render('usuario-detalle', { title: 'Detalle de Usuario - CineApp', usuario: null });
        }
    }
}

module.exports = new UsuariosController();