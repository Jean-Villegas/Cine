// Datos de las entidades del sistema de cine
const fs = require('fs');
const path = require('path');

// Rutas de los archivos de datos
const DATA_DIR = path.join(__dirname);
const PELICULAS_FILE = path.join(DATA_DIR, 'peliculas.json');
const SALAS_FILE = path.join(DATA_DIR, 'salas.json');
const FUNCIONES_FILE = path.join(DATA_DIR, 'funciones.json');
const USUARIOS_FILE = path.join(DATA_DIR, 'usuarios.json');
const BOLETOS_FILE = path.join(DATA_DIR, 'boletos.json');

// Función para cargar datos desde archivos JSON
const loadData = (filePath, defaultData) => {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error(`Error cargando ${filePath}:`, error.message);
    }
    return defaultData;
};

// Función para guardar datos en archivos JSON
const saveData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error(`Error guardando ${filePath}:`, error.message);
        return false;
    }
};

// ===== PELÍCULAS =====
const peliculasDefault = [];

// ===== SALAS =====
const salasDefault = [];

// ===== FUNCIONES =====
const funcionesDefault = [];

// ===== USUARIOS =====
const usuariosDefault = [];

// ===== BOLETOS =====
const boletosDefault = [];

// Cargar datos desde archivos o usar datos por defecto
let peliculas = loadData(PELICULAS_FILE, peliculasDefault);
let salas = loadData(SALAS_FILE, salasDefault);
let funciones = loadData(FUNCIONES_FILE, funcionesDefault);
let usuarios = loadData(USUARIOS_FILE, usuariosDefault);
let boletos = loadData(BOLETOS_FILE, boletosDefault);

// Funciones auxiliares para generar IDs únicos
let nextPeliculaId = peliculas.length > 0 ? Math.max(...peliculas.map(p => p.id)) + 1 : 1;
let nextSalaId = salas.length > 0 ? Math.max(...salas.map(s => s.id)) + 1 : 1;
let nextFuncionId = funciones.length > 0 ? Math.max(...funciones.map(f => f.id)) + 1 : 1;
let nextUsuarioId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
let nextBoletoId = boletos.length > 0 ? Math.max(...boletos.map(b => b.id)) + 1 : 1;

// Funciones para obtener datos
const getPeliculas = () => peliculas;
const getSalas = () => salas;
const getFunciones = () => funciones;
const getUsuarios = () => usuarios;
const getBoletos = () => boletos;

// Funciones para agregar nuevos elementos
const addPelicula = (pelicula) => {
    pelicula.id = nextPeliculaId++;
    peliculas.push(pelicula);
    saveData(PELICULAS_FILE, peliculas);
    return pelicula;
};

const addSala = (sala) => {
    sala.id = nextSalaId++;
    salas.push(sala);
    saveData(SALAS_FILE, salas);
    return sala;
};

const addFuncion = (funcion) => {
    funcion.id = nextFuncionId++;
    funciones.push(funcion);
    saveData(FUNCIONES_FILE, funciones);
    return funcion;
};

const addUsuario = (usuario) => {
    usuario.id = nextUsuarioId++;
    usuarios.push(usuario);
    saveData(USUARIOS_FILE, usuarios);
    return usuario;
};

const addBoleto = (boleto) => {
    boleto.id = nextBoletoId++;
    boletos.push(boleto);
    saveData(BOLETOS_FILE, boletos);
    return boleto;
};

// Funciones para buscar por ID
const getPeliculaById = (id) => peliculas.find(p => p.id === parseInt(id));
const getSalaById = (id) => salas.find(s => s.id === parseInt(id));
const getFuncionById = (id) => funciones.find(f => f.id === parseInt(id));
const getUsuarioById = (id) => usuarios.find(u => u.id === parseInt(id));
const getBoletoById = (id) => boletos.find(b => b.id === parseInt(id));

// Funciones para actualizar
const updatePelicula = (id, datos) => {
    const index = peliculas.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        peliculas[index] = { ...peliculas[index], ...datos };
        saveData(PELICULAS_FILE, peliculas);
        return peliculas[index];
    }
    return null;
};

const updateSala = (id, datos) => {
    const index = salas.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
        salas[index] = { ...salas[index], ...datos };
        saveData(SALAS_FILE, salas);
        return salas[index];
    }
    return null;
};

const updateFuncion = (id, datos) => {
    const index = funciones.findIndex(f => f.id === parseInt(id));
    if (index !== -1) {
        funciones[index] = { ...funciones[index], ...datos };
        saveData(FUNCIONES_FILE, funciones);
        return funciones[index];
    }
    return null;
};

const updateUsuario = (id, datos) => {
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...datos };
        saveData(USUARIOS_FILE, usuarios);
        return usuarios[index];
    }
    return null;
};

const updateBoleto = (id, datos) => {
    const index = boletos.findIndex(b => b.id === parseInt(id));
    if (index !== -1) {
        boletos[index] = { ...boletos[index], ...datos };
        saveData(BOLETOS_FILE, boletos);
        return boletos[index];
    }
    return null;
};

// Funciones para eliminar
const deletePelicula = (id) => {
    const index = peliculas.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        const deleted = peliculas.splice(index, 1)[0];
        saveData(PELICULAS_FILE, peliculas);
        return deleted;
    }
    return null;
};

const deleteSala = (id) => {
    const index = salas.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
        const deleted = salas.splice(index, 1)[0];
        saveData(SALAS_FILE, salas);
        return deleted;
    }
    return null;
};

const deleteFuncion = (id) => {
    const index = funciones.findIndex(f => f.id === parseInt(id));
    if (index !== -1) {
        const deleted = funciones.splice(index, 1)[0];
        saveData(FUNCIONES_FILE, funciones);
        return deleted;
    }
    return null;
};

const deleteUsuario = (id) => {
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
        const deleted = usuarios.splice(index, 1)[0];
        saveData(USUARIOS_FILE, usuarios);
        return deleted;
    }
    return null;
};

const deleteBoleto = (id) => {
    const index = boletos.findIndex(b => b.id === parseInt(id));
    if (index !== -1) {
        const deleted = boletos.splice(index, 1)[0];
        saveData(BOLETOS_FILE, boletos);
        return deleted;
    }
    return null;
};

module.exports = {
    // Datos
    getPeliculas, getSalas, getFunciones, getUsuarios, getBoletos,
    
    // Agregar
    addPelicula, addSala, addFuncion, addUsuario, addBoleto,
    
    // Buscar por ID
    getPeliculaById, getSalaById, getFuncionById, getUsuarioById, getBoletoById,
    
    // Actualizar
    updatePelicula, updateSala, updateFuncion, updateUsuario, updateBoleto,
    
    // Eliminar
    deletePelicula, deleteSala, deleteFuncion, deleteUsuario, deleteBoleto
};