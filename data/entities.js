// Datos de las entidades del sistema de cine

// ===== PELÍCULAS =====
let peliculas = [
    {
        id: 1,
        titulo: "Avatar: El Camino del Agua",
        director: "James Cameron",
        genero: "Ciencia Ficción",
        duracion: 192, // minutos
        clasificacion: "B-15",
        sinopsis: "Ambientada más de una década después de los eventos de la primera película, Avatar: El Camino del Agua narra la historia de la familia Sully.",
        año: 2022,
        idioma: "Español",
        subtitulos: true,
        formato: "3D",
        precio: 120,
        estado: "activa"
    },
    {
        id: 2,
        titulo: "Top Gun: Maverick",
        director: "Joseph Kosinski",
        genero: "Acción",
        duracion: 131,
        clasificacion: "B",
        sinopsis: "Después de más de treinta años de servicio como uno de los mejores aviadores de la Armada, Pete Mitchell está donde pertenece.",
        año: 2022,
        idioma: "Español",
        subtitulos: false,
        formato: "2D",
        precio: 100,
        estado: "activa"
    },
    {
        id: 3,
        titulo: "Black Panther: Wakanda Forever",
        director: "Ryan Coogler",
        genero: "Superhéroes",
        duracion: 161,
        clasificacion: "B",
        sinopsis: "La reina Ramonda, Shuri, M'Baku, Okoye y las Dora Milaje luchan por proteger su nación.",
        año: 2022,
        idioma: "Español",
        subtitulos: true,
        formato: "2D",
        precio: 110,
        estado: "activa"
    },
    {
        id: 4,
        titulo: "El Gato con Botas: El Último Deseo",
        director: "Joel Crawford",
        genero: "Animación",
        duracion: 102,
        clasificacion: "AA",
        sinopsis: "El Gato con Botas descubre que su pasión por la aventura ha pasado factura.",
        año: 2022,
        idioma: "Español",
        subtitulos: false,
        formato: "2D",
        precio: 90,
        estado: "activa"
    }
];

// ===== SALAS =====
let salas = [
    {
        id: 1,
        numero: "Sala 1",
        capacidad: 150,
        tipo: "Premium",
        equipamiento: ["Sonido Dolby Atmos", "Pantalla 4K", "Asientos Reclinables"],
        ubicacion: "Planta Baja",
        estado: "activa"
    },
    {
        id: 2,
        numero: "Sala 2",
        capacidad: 200,
        tipo: "Estándar",
        equipamiento: ["Sonido Digital", "Pantalla HD", "Asientos Estándar"],
        ubicacion: "Planta Baja",
        estado: "activa"
    },
    {
        id: 3,
        numero: "Sala 3",
        capacidad: 120,
        tipo: "VIP",
        equipamiento: ["Sonido Dolby Atmos", "Pantalla 4K", "Asientos VIP", "Servicio a Asiento"],
        ubicacion: "Segundo Piso",
        estado: "activa"
    },
    {
        id: 4,
        numero: "Sala 4",
        capacidad: 80,
        tipo: "3D",
        equipamiento: ["Sonido 3D", "Pantalla 3D", "Lentes 3D"],
        ubicacion: "Primer Piso",
        estado: "mantenimiento"
    }
];

// ===== FUNCIONES =====
let funciones = [
    {
        id: 1,
        peliculaId: 1,
        salaId: 1,
        fecha: "2024-01-15",
        horaInicio: "14:30",
        horaFin: "17:42",
        precio: 120,
        asientosDisponibles: 150,
        asientosOcupados: 45,
        estado: "activa",
        tipo: "Estreno"
    },
    {
        id: 2,
        peliculaId: 2,
        salaId: 2,
        fecha: "2024-01-15",
        horaInicio: "16:00",
        horaFin: "18:11",
        precio: 100,
        asientosDisponibles: 200,
        asientosOcupados: 120,
        estado: "activa",
        tipo: "Normal"
    },
    {
        id: 3,
        peliculaId: 3,
        salaId: 3,
        fecha: "2024-01-15",
        horaInicio: "19:00",
        horaFin: "21:41",
        precio: 110,
        asientosDisponibles: 120,
        asientosOcupados: 80,
        estado: "activa",
        tipo: "VIP"
    },
    {
        id: 4,
        peliculaId: 4,
        salaId: 4,
        fecha: "2024-01-15",
        horaInicio: "15:30",
        horaFin: "17:12",
        precio: 90,
        asientosDisponibles: 0,
        asientosOcupados: 80,
        estado: "agotada",
        tipo: "Matine"
    }
];

// ===== USUARIOS =====
let usuarios = [
    {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan.perez@email.com",
        telefono: "555-0101",
        fechaNacimiento: "1990-05-15",
        tipoUsuario: "cliente",
        fechaRegistro: "2023-01-10",
        estado: "activo",
        puntos: 250
    },
    {
        id: 2,
        nombre: "María",
        apellido: "García",
        email: "maria.garcia@email.com",
        telefono: "555-0102",
        fechaNacimiento: "1985-12-03",
        tipoUsuario: "vip",
        fechaRegistro: "2022-08-20",
        estado: "activo",
        puntos: 850
    },
    {
        id: 3,
        nombre: "Carlos",
        apellido: "López",
        email: "carlos.lopez@email.com",
        telefono: "555-0103",
        fechaNacimiento: "1992-07-22",
        tipoUsuario: "cliente",
        fechaRegistro: "2023-11-05",
        estado: "activo",
        puntos: 120
    },
    {
        id: 4,
        nombre: "Ana",
        apellido: "Martínez",
        email: "ana.martinez@email.com",
        telefono: "555-0104",
        fechaNacimiento: "1988-03-18",
        tipoUsuario: "admin",
        fechaRegistro: "2022-01-01",
        estado: "activo",
        puntos: 0
    }
];

// ===== BOLETOS =====
let boletos = [
    {
        id: 1,
        funcionId: 1,
        usuarioId: 1,
        numeroAsiento: "A15",
        precio: 120,
        fechaCompra: "2024-01-14",
        horaCompra: "10:30",
        estado: "confirmado",
        codigoQR: "QR001234567890",
        metodoPago: "tarjeta"
    },
    {
        id: 2,
        funcionId: 1,
        usuarioId: 1,
        numeroAsiento: "A16",
        precio: 120,
        fechaCompra: "2024-01-14",
        horaCompra: "10:30",
        estado: "confirmado",
        codigoQR: "QR001234567891",
        metodoPago: "tarjeta"
    },
    {
        id: 3,
        funcionId: 2,
        usuarioId: 2,
        numeroAsiento: "B25",
        precio: 100,
        fechaCompra: "2024-01-14",
        horaCompra: "14:15",
        estado: "confirmado",
        codigoQR: "QR001234567892",
        metodoPago: "efectivo"
    },
    {
        id: 4,
        funcionId: 3,
        usuarioId: 3,
        numeroAsiento: "C10",
        precio: 110,
        fechaCompra: "2024-01-14",
        horaCompra: "16:45",
        estado: "usado",
        codigoQR: "QR001234567893",
        metodoPago: "tarjeta"
    }
];

// Funciones auxiliares para generar IDs únicos
let nextPeliculaId = peliculas.length + 1;
let nextSalaId = salas.length + 1;
let nextFuncionId = funciones.length + 1;
let nextUsuarioId = usuarios.length + 1;
let nextBoletoId = boletos.length + 1;

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
    return pelicula;
};

const addSala = (sala) => {
    sala.id = nextSalaId++;
    salas.push(sala);
    return sala;
};

const addFuncion = (funcion) => {
    funcion.id = nextFuncionId++;
    funciones.push(funcion);
    return funcion;
};

const addUsuario = (usuario) => {
    usuario.id = nextUsuarioId++;
    usuarios.push(usuario);
    return usuario;
};

const addBoleto = (boleto) => {
    boleto.id = nextBoletoId++;
    boletos.push(boleto);
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
        return peliculas[index];
    }
    return null;
};

const updateSala = (id, datos) => {
    const index = salas.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
        salas[index] = { ...salas[index], ...datos };
        return salas[index];
    }
    return null;
};

const updateFuncion = (id, datos) => {
    const index = funciones.findIndex(f => f.id === parseInt(id));
    if (index !== -1) {
        funciones[index] = { ...funciones[index], ...datos };
        return funciones[index];
    }
    return null;
};

const updateUsuario = (id, datos) => {
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...datos };
        return usuarios[index];
    }
    return null;
};

const updateBoleto = (id, datos) => {
    const index = boletos.findIndex(b => b.id === parseInt(id));
    if (index !== -1) {
        boletos[index] = { ...boletos[index], ...datos };
        return boletos[index];
    }
    return null;
};

// Funciones para eliminar
const deletePelicula = (id) => {
    const index = peliculas.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        return peliculas.splice(index, 1)[0];
    }
    return null;
};

const deleteSala = (id) => {
    const index = salas.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
        return salas.splice(index, 1)[0];
    }
    return null;
};

const deleteFuncion = (id) => {
    const index = funciones.findIndex(f => f.id === parseInt(id));
    if (index !== -1) {
        return funciones.splice(index, 1)[0];
    }
    return null;
};

const deleteUsuario = (id) => {
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
        return usuarios.splice(index, 1)[0];
    }
    return null;
};

const deleteBoleto = (id) => {
    const index = boletos.findIndex(b => b.id === parseInt(id));
    if (index !== -1) {
        return boletos.splice(index, 1)[0];
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