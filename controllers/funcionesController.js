const funcionesModel = require('../models/funcionesModel');
const peliculasModel = require('../models/peliculasModel');
const salasModel = require('../models/salasModel');

class FuncionesController {
    
    // GET /funciones - Listar todas las funciones
    async listar(req, res) {
        try {
            const funciones = await funcionesModel.getAll();
            // Enriquecer con datos de película y sala
            const funcionesCompletas = await Promise.all(funciones.map(async funcion => {
                const pelicula = await peliculasModel.getById(funcion.pelicula_id || funcion.peliculaId);
                const sala = await salasModel.getById(funcion.sala_id || funcion.salaId);
                return {
                    ...funcion,
                    pelicula: pelicula || null,
                    sala: sala || null
                };
            }));

            res.status(200).json({
                success: true,
                message: 'Funciones obtenidas exitosamente',
                data: funcionesCompletas,
                count: funcionesCompletas.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener las funciones',
                error: error.message
            });
        }
    }

    // GET /funciones/:id - Obtener función por ID
    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const funcion = await funcionesModel.getById(id);
            
            if (!funcion) {
                return res.status(404).json({
                    success: false,
                    message: 'Función no encontrada'
                });
            }

            // Enriquecer con datos de película y sala
            const pelicula = await peliculasModel.getById(funcion.pelicula_id || funcion.peliculaId);
            const sala = await salasModel.getById(funcion.sala_id || funcion.salaId);
            const funcionCompleta = {
                ...funcion,
                pelicula: pelicula || null,
                sala: sala || null
            };

            res.status(200).json({
                success: true,
                message: 'Función obtenida exitosamente',
                data: funcionCompleta
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener la función',
                error: error.message
            });
        }
    }

    // POST /funciones - Agregar nueva función
    async agregar(req, res) {
        try {
            const funcionData = req.body;
            
            // Validaciones básicas
            if (!funcionData.peliculaId || !funcionData.salaId || !funcionData.fecha || !funcionData.horaInicio) {
                return res.status(400).json({
                    success: false,
                    message: 'Película, sala, fecha y hora de inicio son requeridos'
                });
            }

            // Verificar que la película y sala existen
            const pelicula = await peliculasModel.getById(funcionData.peliculaId);
            const sala = await salasModel.getById(funcionData.salaId);
            
            if (!pelicula) {
                return res.status(400).json({
                    success: false,
                    message: 'La película especificada no existe'
                });
            }
            
            if (!sala) {
                return res.status(400).json({
                    success: false,
                    message: 'La sala especificada no existe'
                });
            }

            const nuevaFuncion = await funcionesModel.create(funcionData);
            
            res.status(201).json({
                success: true,
                message: 'Función agregada exitosamente',
                data: nuevaFuncion
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al agregar la función',
                error: error.message
            });
        }
    }

    // PUT /funciones/:id - Editar función
    async editar(req, res) {
        try {
            const { id } = req.params;
            const datosActualizacion = req.body;
            
            const funcionActualizada = await funcionesModel.update(id, datosActualizacion);
            
            if (!funcionActualizada) {
                return res.status(404).json({
                    success: false,
                    message: 'Función no encontrada'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Función actualizada exitosamente',
                data: funcionActualizada
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar la función',
                error: error.message
            });
        }
    }

    // DELETE /funciones/:id - Eliminar función
    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const funcionEliminada = await funcionesModel.remove(id);
            
            if (!funcionEliminada) {
                return res.status(404).json({
                    success: false,
                    message: 'Función no encontrada'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Función eliminada exitosamente',
                data: funcionEliminada
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar la función',
                error: error.message
            });
        }
    }

    // GET /funciones/pelicula/:peliculaId - Obtener funciones por película
    async obtenerPorPelicula(req, res) {
        try {
            const { peliculaId } = req.params;
            const funciones = (await funcionesModel.getAll()).filter(f => (f.pelicula_id || f.peliculaId) === parseInt(peliculaId));
            
            res.status(200).json({
                success: true,
                message: 'Funciones de la película obtenidas exitosamente',
                data: funciones,
                count: funciones.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener las funciones de la película',
                error: error.message
            });
        }
    }

    // GET /funciones/fecha/:fecha - Obtener funciones por fecha
    async obtenerPorFecha(req, res) {
        try {
            const { fecha } = req.params;
            const funciones = (await funcionesModel.getAll()).filter(f => f.fecha === fecha);
            
            res.status(200).json({
                success: true,
                message: `Funciones del ${fecha} obtenidas exitosamente`,
                data: funciones,
                count: funciones.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener las funciones por fecha',
                error: error.message
            });
        }
    }

    // Render views
    async renderList(req, res) {
        try {
            const funciones = await funcionesModel.getAll();
            // opcionalmente enriquecer con peliculas y salas para el render
            const funcionesCompletas = await Promise.all(funciones.map(async f => {
                const pelicula = await peliculasModel.getById(f.pelicula_id || f.peliculaId);
                const sala = await salasModel.getById(f.sala_id || f.salaId);
                return { ...f, pelicula, sala };
            }));
            res.render('funciones', { title: 'Funciones - CineApp', funciones: funcionesCompletas });
        } catch (err) {
            res.render('funciones', { title: 'Funciones - CineApp', funciones: [] });
        }
    }

    async renderForm(req, res) {
        // Para el formulario conviene pasar listas de peliculas y salas
        try {
            const peliculas = await peliculasModel.getAll();
            const salas = await salasModel.getAll();
            res.render('funcion-form', { title: 'Agregar Función - CineApp', peliculas, salas });
        } catch (err) {
            res.render('funcion-form', { title: 'Agregar Función - CineApp', peliculas: [], salas: [] });
        }
    }

    async renderDetail(req, res) {
        const { id } = req.params;
        try {
            const funcion = await funcionesModel.getById(id);
            if (!funcion) return res.status(404).render('funcion-detalle', { title: 'Detalle de Función - CineApp', funcion: null });
            const pelicula = await peliculasModel.getById(funcion.pelicula_id || funcion.peliculaId);
            const sala = await salasModel.getById(funcion.sala_id || funcion.salaId);
            res.render('funcion-detalle', { title: 'Detalle de Función - CineApp', funcion: { ...funcion, pelicula, sala } });
        } catch (err) {
            res.status(500).render('funcion-detalle', { title: 'Detalle de Función - CineApp', funcion: null });
        }
    }
}

module.exports = new FuncionesController();