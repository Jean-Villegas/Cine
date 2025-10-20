const peliculasModel = require('../models/peliculasModel');

class PeliculasController {
    
    // GET /peliculas - Listar todas las películas
    async listar(req, res) {
        try {
            const peliculas = await peliculasModel.getAll();
            res.status(200).json({
                success: true,
                message: 'Películas obtenidas exitosamente',
                data: peliculas,
                count: peliculas.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener las películas',
                error: error.message
            });
        }
    }

    // GET /peliculas/:id - Obtener película por ID
    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const pelicula = await peliculasModel.getById(id);
            
            if (!pelicula) {
                return res.status(404).json({
                    success: false,
                    message: 'Película no encontrada'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Película obtenida exitosamente',
                data: pelicula
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener la película',
                error: error.message
            });
        }
    }

    // POST /peliculas - Agregar nueva película
    async agregar(req, res) {
        try {
            const peliculaData = req.body;
            
            // Validaciones básicas
            if (!peliculaData.titulo || !peliculaData.director) {
                return res.status(400).json({
                    success: false,
                    message: 'El título y director son requeridos'
                });
            }

            const nuevaPelicula = await peliculasModel.create(peliculaData);
            
            res.status(201).json({
                success: true,
                message: 'Película agregada exitosamente',
                data: nuevaPelicula
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al agregar la película',
                error: error.message
            });
        }
    }

    // PUT /peliculas/:id - Editar película
    async editar(req, res) {
        try {
            const { id } = req.params;
            const datosActualizacion = req.body;
            
            const peliculaActualizada = await peliculasModel.update(id, datosActualizacion);
            
            if (!peliculaActualizada) {
                return res.status(404).json({
                    success: false,
                    message: 'Película no encontrada'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Película actualizada exitosamente',
                data: peliculaActualizada
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar la película',
                error: error.message
            });
        }
    }

    // DELETE /peliculas/:id - Eliminar película
    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const peliculaEliminada = await peliculasModel.remove(id);
            
            if (!peliculaEliminada) {
                return res.status(404).json({
                    success: false,
                    message: 'Película no encontrada'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Película eliminada exitosamente',
                data: peliculaEliminada
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar la película',
                error: error.message
            });
        }
    }

    // GET /peliculas/activas - Obtener solo películas activas
    async obtenerActivas(req, res) {
        try {
            const peliculas = (await peliculasModel.getAll()).filter(p => p.estado === 'activa');
            res.status(200).json({
                success: true,
                message: 'Películas activas obtenidas exitosamente',
                data: peliculas,
                count: peliculas.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener las películas activas',
                error: error.message
            });
        }
    }

    // Render views
    // GET /peliculas (vista)
    async renderList(req, res) {
        try {
            const peliculas = await peliculasModel.getAll();
            res.render('peliculas', { title: 'Películas - CineApp', peliculas });
        } catch (err) {
            res.render('peliculas', { title: 'Películas - CineApp', peliculas: [] });
        }
    }

    // GET /peliculas/agregar (vista)
    async renderForm(req, res) {
        res.render('pelicula-form', { title: 'Agregar Película - CineApp' });
    }

    // GET /peliculas/:id (vista detalle)
    async renderDetail(req, res) {
        const { id } = req.params;
        try {
            const pelicula = await peliculasModel.getById(id);
            if (!pelicula) return res.status(404).render('pelicula-detalle', { title: 'Detalle de Película - CineApp', pelicula: null });
            res.render('pelicula-detalle', { title: 'Detalle de Película - CineApp', pelicula });
        } catch (err) {
            res.status(500).render('pelicula-detalle', { title: 'Detalle de Película - CineApp', pelicula: null });
        }
    }
}

module.exports = new PeliculasController();
