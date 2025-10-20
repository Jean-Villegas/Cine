const boletosModel = require('../models/boletosModel');
const funcionesModel = require('../models/funcionesModel');
const usuariosModel = require('../models/usuariosModel');

class BoletosController {
    
    // GET /boletos - Listar todos los boletos
    async listar(req, res) {
        try {
            const boletos = await boletosModel.getAll();
            // Enriquecer con datos de función y usuario
            const boletosCompletos = await Promise.all(boletos.map(async boleto => {
                const funcion = await funcionesModel.getById(boleto.funcion_id || boleto.funcionId);
                const usuario = await usuariosModel.getById(boleto.usuario_id || boleto.usuarioId);
                return {
                    ...boleto,
                    funcion: funcion || null,
                    usuario: usuario ? {
                        id: usuario.id,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        email: usuario.email
                    } : null
                };
            }));

            res.status(200).json({
                success: true,
                message: 'Boletos obtenidos exitosamente',
                data: boletosCompletos,
                count: boletosCompletos.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los boletos',
                error: error.message
            });
        }
    }

    // GET /boletos/:id - Obtener boleto por ID
    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const boleto = await boletosModel.getById(id);
            
            if (!boleto) {
                return res.status(404).json({
                    success: false,
                    message: 'Boleto no encontrado'
                });
            }

            // Enriquecer con datos de función y usuario
            const funcion = await funcionesModel.getById(boleto.funcion_id || boleto.funcionId);
            const usuario = await usuariosModel.getById(boleto.usuario_id || boleto.usuarioId);
            const boletoCompleto = {
                ...boleto,
                funcion: funcion || null,
                usuario: usuario ? {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email
                } : null
            };

            res.status(200).json({
                success: true,
                message: 'Boleto obtenido exitosamente',
                data: boletoCompleto
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener el boleto',
                error: error.message
            });
        }
    }

    // POST /boletos - Comprar nuevo boleto
    async comprar(req, res) {
        try {
            const boletoData = req.body;
            
            // Validaciones básicas
            if (!boletoData.funcionId || !boletoData.usuarioId || !boletoData.numeroAsiento) {
                return res.status(400).json({
                    success: false,
                    message: 'Función, usuario y número de asiento son requeridos'
                });
            }

            // Verificar que la función y usuario existen
            const funcion = await funcionesModel.getById(boletoData.funcionId);
            const usuario = await usuariosModel.getById(boletoData.usuarioId);
            
            if (!funcion) {
                return res.status(400).json({
                    success: false,
                    message: 'La función especificada no existe'
                });
            }
            
            if (!usuario) {
                return res.status(400).json({
                    success: false,
                    message: 'El usuario especificado no existe'
                });
            }

            // Verificar disponibilidad de asientos
            if ((funcion.asientos_disponibles || funcion.asientosDisponibles) <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No hay asientos disponibles para esta función'
                });
            }

            // Generar código QR único
            const codigoQR = `QR${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

            const nuevoBoleto = await boletosModel.create({
                funcionId: boletoData.funcionId,
                usuarioId: boletoData.usuarioId,
                numeroAsiento: boletoData.numeroAsiento,
                precio: funcion.precio,
                fechaCompra: new Date().toISOString().split('T')[0],
                horaCompra: new Date().toTimeString().split(' ')[0],
                estado: 'confirmado',
                codigoQR: codigoQR,
                metodoPago: boletoData.metodoPago || 'tarjeta'
            });

            res.status(201).json({
                success: true,
                message: 'Boleto comprado exitosamente',
                data: nuevoBoleto
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al comprar el boleto',
                error: error.message
            });
        }
    }

    // PUT /boletos/:id - Actualizar boleto
    async actualizar(req, res) {
        try {
            const { id } = req.params;
            const datosActualizacion = req.body;
            
            const boletoActualizado = await boletosModel.update(id, datosActualizacion);
            
            if (!boletoActualizado) {
                return res.status(404).json({
                    success: false,
                    message: 'Boleto no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Boleto actualizado exitosamente',
                data: boletoActualizado
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el boleto',
                error: error.message
            });
        }
    }

    // DELETE /boletos/:id - Cancelar/eliminar boleto
    async cancelar(req, res) {
        try {
            const { id } = req.params;
            const boletoEliminado = await boletosModel.remove(id);
            
            if (!boletoEliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Boleto no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Boleto cancelado exitosamente',
                data: boletoEliminado
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al cancelar el boleto',
                error: error.message
            });
        }
    }

    // GET /boletos/usuario/:usuarioId - Obtener boletos por usuario
    async obtenerPorUsuario(req, res) {
        try {
            const { usuarioId } = req.params;
            const boletos = (await boletosModel.getAll()).filter(b => (b.usuario_id || b.usuarioId) === parseInt(usuarioId));
            
            res.status(200).json({
                success: true,
                message: 'Boletos del usuario obtenidos exitosamente',
                data: boletos,
                count: boletos.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los boletos del usuario',
                error: error.message
            });
        }
    }

    // GET /boletos/funcion/:funcionId - Obtener boletos por función
    async obtenerPorFuncion(req, res) {
        try {
            const { funcionId } = req.params;
            const boletos = (await boletosModel.getAll()).filter(b => (b.funcion_id || b.funcionId) === parseInt(funcionId));
            
            res.status(200).json({
                success: true,
                message: 'Boletos de la función obtenidos exitosamente',
                data: boletos,
                count: boletos.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los boletos de la función',
                error: error.message
            });
        }
    }

    // PUT /boletos/:id/usar - Marcar boleto como usado
    async usarBoleto(req, res) {
        try {
            const { id } = req.params;
            const boleto = await boletosModel.getById(id);
            
            if (!boleto) {
                return res.status(404).json({
                    success: false,
                    message: 'Boleto no encontrado'
                });
            }

            if (boleto.estado === 'usado') {
                return res.status(400).json({
                    success: false,
                    message: 'El boleto ya ha sido usado'
                });
            }

            const boletoActualizado = await boletosModel.update(id, { estado: 'usado' });

            res.status(200).json({
                success: true,
                message: 'Boleto marcado como usado exitosamente',
                data: boletoActualizado
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al marcar el boleto como usado',
                error: error.message
            });
        }
    }

    // Render views
    async renderList(req, res) {
        try {
            const boletos = await boletosModel.getAll();
            res.render('boletos', { title: 'Boletos - CineApp', boletos });
        } catch (err) {
            res.render('boletos', { title: 'Boletos - CineApp', boletos: [] });
        }
    }

    async renderForm(req, res) {
        // Para el formulario puede ser útil enviar lista de funciones y usuarios
        try {
            const funciones = await funcionesModel.getAll();
            const usuarios = await usuariosModel.getAll();
            res.render('boleto-form', { title: 'Agregar Boleto - CineApp', funciones, usuarios });
        } catch (err) {
            res.render('boleto-form', { title: 'Agregar Boleto - CineApp', funciones: [], usuarios: [] });
        }
    }

    async renderDetail(req, res) {
        const { id } = req.params;
        try {
            const boleto = await boletosModel.getById(id);
            if (!boleto) return res.status(404).render('boleto-detalle', { title: 'Detalle de Boleto - CineApp', boleto: null });
            const funcion = await funcionesModel.getById(boleto.funcion_id || boleto.funcionId);
            const usuario = await usuariosModel.getById(boleto.usuario_id || boleto.usuarioId);
            res.render('boleto-detalle', { title: 'Detalle de Boleto - CineApp', boleto: { ...boleto, funcion, usuario } });
        } catch (err) {
            res.status(500).render('boleto-detalle', { title: 'Detalle de Boleto - CineApp', boleto: null });
        }
    }
}

module.exports = new BoletosController();