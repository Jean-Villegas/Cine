-- Script SQL para crear la base de datos y tablas del sistema de cine
-- Asume MySQL/MariaDB. Ajustar tipos si usa otro motor (Postgres/SQLite).

CREATE DATABASE IF NOT EXISTS cinex CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cinex;

-- Tabla: peliculas
CREATE TABLE IF NOT EXISTS peliculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    director VARCHAR(255),
    genero VARCHAR(100),
    duracion INT,
    clasificacion VARCHAR(20),
    sinopsis TEXT,
    anio INT,
    idioma VARCHAR(50),
    subtitulos TINYINT(1) DEFAULT 0,
    formato VARCHAR(50),
    precio DECIMAL(8,2) DEFAULT 0.00,
    estado VARCHAR(50) DEFAULT 'activa'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: salas
CREATE TABLE IF NOT EXISTS salas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(50),
    capacidad INT,
    tipo VARCHAR(50),
    equipamiento TEXT, -- JSON o lista en texto
    ubicacion VARCHAR(100),
    estado VARCHAR(50) DEFAULT 'activa'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: funciones
CREATE TABLE IF NOT EXISTS funciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pelicula_id INT NOT NULL,
    sala_id INT NOT NULL,
    fecha DATE,
    hora_inicio TIME,
    hora_fin TIME,
    precio DECIMAL(8,2) DEFAULT 0.00,
    asientos_disponibles INT DEFAULT 0,
    asientos_ocupados INT DEFAULT 0,
    estado VARCHAR(50) DEFAULT 'activa',
    tipo VARCHAR(50),
    CONSTRAINT fk_funcion_pelicula FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE,
    CONSTRAINT fk_funcion_sala FOREIGN KEY (sala_id) REFERENCES salas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    telefono VARCHAR(50),
    fecha_nacimiento DATE,
    tipo_usuario VARCHAR(50),
    fecha_registro DATE,
    estado VARCHAR(50) DEFAULT 'activo',
    puntos INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: boletos
CREATE TABLE IF NOT EXISTS boletos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    funcion_id INT NOT NULL,
    usuario_id INT,
    numero_asiento VARCHAR(20),
    precio DECIMAL(8,2) DEFAULT 0.00,
    fecha_compra DATE,
    hora_compra TIME,
    estado VARCHAR(50) DEFAULT 'confirmado',
    codigo_qr VARCHAR(255) UNIQUE,
    metodo_pago VARCHAR(50),
    CONSTRAINT fk_boleto_funcion FOREIGN KEY (funcion_id) REFERENCES funciones(id) ON DELETE CASCADE,
    CONSTRAINT fk_boleto_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    CONSTRAINT uq_funcion_asiento UNIQUE (funcion_id, numero_asiento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserciones de ejemplo (datos tomados de data/entities.js)

INSERT INTO peliculas (id, titulo, director, genero, duracion, clasificacion, sinopsis, anio, idioma, subtitulos, formato, precio, estado) VALUES
(1, 'Avatar: El Camino del Agua', 'James Cameron', 'Ciencia Ficción', 192, 'B-15', 'Ambientada más de una década después de los eventos de la primera película, Avatar: El Camino del Agua narra la historia de la familia Sully.', 2022, 'Español', 1, '3D', 120.00, 'activa'),
(2, 'Top Gun: Maverick', 'Joseph Kosinski', 'Acción', 131, 'B', 'Después de más de treinta años de servicio como uno de los mejores aviadores de la Armada, Pete Mitchell está donde pertenece.', 2022, 'Español', 0, '2D', 100.00, 'activa'),
(3, 'Black Panther: Wakanda Forever', 'Ryan Coogler', 'Superhéroes', 161, 'B', 'La reina Ramonda, Shuri, M\'Baku, Okoye y las Dora Milaje luchan por proteger su nación.', 2022, 'Español', 1, '2D', 110.00, 'activa'),
(4, 'El Gato con Botas: El Último Deseo', 'Joel Crawford', 'Animación', 102, 'AA', 'El Gato con Botas descubre que su pasión por la aventura ha pasado factura.', 2022, 'Español', 0, '2D', 90.00, 'activa');

INSERT INTO salas (id, numero, capacidad, tipo, equipamiento, ubicacion, estado) VALUES
(1, 'Sala 1', 150, 'Premium', JSON_ARRAY('Sonido Dolby Atmos','Pantalla 4K','Asientos Reclinables'), 'Planta Baja', 'activa'),
(2, 'Sala 2', 200, 'Estándar', JSON_ARRAY('Sonido Digital','Pantalla HD','Asientos Estándar'), 'Planta Baja', 'activa'),
(3, 'Sala 3', 120, 'VIP', JSON_ARRAY('Sonido Dolby Atmos','Pantalla 4K','Asientos VIP','Servicio a Asiento'), 'Segundo Piso', 'activa'),
(4, 'Sala 4', 80, '3D', JSON_ARRAY('Sonido 3D','Pantalla 3D','Lentes 3D'), 'Primer Piso', 'mantenimiento');

INSERT INTO funciones (id, pelicula_id, sala_id, fecha, hora_inicio, hora_fin, precio, asientos_disponibles, asientos_ocupados, estado, tipo) VALUES
(1, 1, 1, '2024-01-15', '14:30:00', '17:42:00', 120.00, 150, 45, 'activa', 'Estreno'),
(2, 2, 2, '2024-01-15', '16:00:00', '18:11:00', 100.00, 200, 120, 'activa', 'Normal'),
(3, 3, 3, '2024-01-15', '19:00:00', '21:41:00', 110.00, 120, 80, 'activa', 'VIP'),
(4, 4, 4, '2024-01-15', '15:30:00', '17:12:00', 90.00, 0, 80, 'agotada', 'Matine');

INSERT INTO usuarios (id, nombre, apellido, email, telefono, fecha_nacimiento, tipo_usuario, fecha_registro, estado, puntos) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@email.com', '555-0101', '1990-05-15', 'cliente', '2023-01-10', 'activo', 250),
(2, 'María', 'García', 'maria.garcia@email.com', '555-0102', '1985-12-03', 'vip', '2022-08-20', 'activo', 850),
(3, 'Carlos', 'López', 'carlos.lopez@email.com', '555-0103', '1992-07-22', 'cliente', '2023-11-05', 'activo', 120),
(4, 'Ana', 'Martínez', 'ana.martinez@email.com', '555-0104', '1988-03-18', 'admin', '2022-01-01', 'activo', 0);

INSERT INTO boletos (id, funcion_id, usuario_id, numero_asiento, precio, fecha_compra, hora_compra, estado, codigo_qr, metodo_pago) VALUES
(1, 1, 1, 'A15', 120.00, '2024-01-14', '10:30:00', 'confirmado', 'QR001234567890', 'tarjeta'),
(2, 1, 1, 'A16', 120.00, '2024-01-14', '10:30:00', 'confirmado', 'QR001234567891', 'tarjeta'),
(3, 2, 2, 'B25', 100.00, '2024-01-14', '14:15:00', 'confirmado', 'QR001234567892', 'efectivo'),
(4, 3, 3, 'C10', 110.00, '2024-01-14', '16:45:00', 'usado', 'QR001234567893', 'tarjeta');

