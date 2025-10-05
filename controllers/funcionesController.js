const { 
    getFunciones, 
    getFuncionById, 
    addFuncion, 
    updateFuncion, 
    deleteFuncion,
    getPeliculaById,
    getSalaById
} = require('../data/entities');

class FuncionesController {
    
    // GET /funciones - Listar todas las funciones
    async listar(req, res) {
        try {
            const funciones = getFunciones();
            // Enriquecer con datos de película y sala
            const funcionesCompletas = funciones.map(funcion => {
                const pelicula = getPeliculaById(funcion.peliculaId);
                const sala = getSalaById(funcion.salaId);
                return {
                    ...funcion,
                    pelicula: pelicula || null,
                    sala: sala || null
                };
            });

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
            const funcion = getFuncionById(id);
            
            if (!funcion) {
                return res.status(404).json({
                    success: false,
                    message: 'Función no encontrada'
                });
            }

            // Enriquecer con datos de película y sala
            const pelicula = getPeliculaById(funcion.peliculaId);
            const sala = getSalaById(funcion.salaId);
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
            const pelicula = getPeliculaById(funcionData.peliculaId);
            const sala = getSalaById(funcionData.salaId);
            
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

            const nuevaFuncion = addFuncion(funcionData);
            
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
            
            const funcionActualizada = updateFuncion(id, datosActualizacion);
            
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
            const funcionEliminada = deleteFuncion(id);
            
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
            const funciones = getFunciones().filter(f => f.peliculaId === parseInt(peliculaId));
            
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
            const funciones = getFunciones().filter(f => f.fecha === fecha);
            
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
}

module.exports = new FuncionesController();