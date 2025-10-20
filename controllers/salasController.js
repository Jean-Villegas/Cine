const salasModel = require('../models/salasModel');

class SalasController {
    
    // GET /salas - Listar todas las salas
    async listar(req, res) {
        try {
            const salas = await salasModel.getAll();
            res.status(200).json({
                success: true,
                message: 'Salas obtenidas exitosamente',
                data: salas,
                count: salas.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener las salas',
                error: error.message
            });
        }
    }

    // GET /salas/:id - Obtener sala por ID
    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const sala = await salasModel.getById(id);
            
            if (!sala) {
                return res.status(404).json({
                    success: false,
                    message: 'Sala no encontrada'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Sala obtenida exitosamente',
                data: sala
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener la sala',
                error: error.message
            });
        }
    }

    // POST /salas - Agregar nueva sala
    async agregar(req, res) {
        try {
            const salaData = req.body;
            
            // Validaciones básicas
            if (!salaData.numero || !salaData.capacidad) {
                return res.status(400).json({
                    success: false,
                    message: 'El número de sala y capacidad son requeridos'
                });
            }

            const nuevaSala = await salasModel.create(salaData);
            
            res.status(201).json({
                success: true,
                message: 'Sala agregada exitosamente',
                data: nuevaSala
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al agregar la sala',
                error: error.message
            });
        }
    }

    // PUT /salas/:id - Editar sala
    async editar(req, res) {
        try {
            const { id } = req.params;
            const datosActualizacion = req.body;
            
            const salaActualizada = await salasModel.update(id, datosActualizacion);
            
            if (!salaActualizada) {
                return res.status(404).json({
                    success: false,
                    message: 'Sala no encontrada'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Sala actualizada exitosamente',
                data: salaActualizada
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar la sala',
                error: error.message
            });
        }
    }

    // DELETE /salas/:id - Eliminar sala
    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const salaEliminada = await salasModel.remove(id);
            
            if (!salaEliminada) {
                return res.status(404).json({
                    success: false,
                    message: 'Sala no encontrada'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Sala eliminada exitosamente',
                data: salaEliminada
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar la sala',
                error: error.message
            });
        }
    }

    // GET /salas/activas - Obtener solo salas activas
    async obtenerActivas(req, res) {
        try {
            const salas = (await salasModel.getAll()).filter(s => s.estado === 'activa');
            res.status(200).json({
                success: true,
                message: 'Salas activas obtenidas exitosamente',
                data: salas,
                count: salas.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener las salas activas',
                error: error.message
            });
        }
    }

    // GET /salas/tipo/:tipo - Obtener salas por tipo
    async obtenerPorTipo(req, res) {
        try {
            const { tipo } = req.params;
            const salas = (await salasModel.getAll()).filter(s => s.tipo.toLowerCase() === tipo.toLowerCase());
            
            res.status(200).json({
                success: true,
                message: `Salas de tipo ${tipo} obtenidas exitosamente`,
                data: salas,
                count: salas.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener las salas por tipo',
                error: error.message
            });
        }
    }

    // Render views
    async renderList(req, res) {
        try {
            const salas = await salasModel.getAll();
            res.render('salas', { title: 'Salas - CineApp', salas });
        } catch (err) {
            res.render('salas', { title: 'Salas - CineApp', salas: [] });
        }
    }

    async renderForm(req, res) {
        res.render('sala-form', { title: 'Agregar Sala - CineApp' });
    }

    async renderDetail(req, res) {
        const { id } = req.params;
        try {
            const sala = await salasModel.getById(id);
            res.render('sala-detalle', { title: 'Detalle de Sala - CineApp', sala });
        } catch (err) {
            res.render('sala-detalle', { title: 'Detalle de Sala - CineApp', sala: null });
        }
    }
}

module.exports = new SalasController();