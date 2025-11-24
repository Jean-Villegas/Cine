-- Script SQL para actualizar la tabla usuarios con campos de autenticación
-- Ejecutar este script después de crear las tablas iniciales

USE cinex;

-- Agregar columna 'password' si no existe
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS password VARCHAR(255) NULL AFTER email;

-- Agregar columna 'rol' si no existe (administrador o usuario)
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS rol VARCHAR(50) DEFAULT 'usuario' AFTER tipo_usuario;

-- Actualizar usuarios existentes para asignar roles
-- El usuario con tipo_usuario 'admin' será administrador
UPDATE usuarios 
SET rol = 'administrador' 
WHERE tipo_usuario = 'admin' OR id = 4;

-- Los demás usuarios serán 'usuario'
UPDATE usuarios 
SET rol = 'usuario' 
WHERE rol IS NULL OR (tipo_usuario != 'admin' AND id != 4);

-- Crear usuarios de ejemplo con contraseñas hasheadas
-- Contraseña para admin: 'admin123' (hash bcrypt)
-- Contraseña para usuario: 'usuario123' (hash bcrypt)
-- NOTA: Estos hashes son de ejemplo. En producción, usar bcrypt para generar los hashes.

-- Actualizar usuario administrador (id=4) con contraseña 'admin123'
-- Hash bcrypt de 'admin123': $2b$10$NbBmn757kX3nbUu4PTcAQeyomP0RFQdk/Dt2s6KOYQSyv0Bbx7mia
UPDATE usuarios 
SET password = '$2b$10$NbBmn757kX3nbUu4PTcAQeyomP0RFQdk/Dt2s6KOYQSyv0Bbx7mia', 
    rol = 'administrador',
    email = 'admin@cine.com'
WHERE id = 4;

-- Crear un usuario normal de ejemplo con contraseña 'usuario123'
-- Hash bcrypt de 'usuario123': $2b$10$zfiaXJ4IEfZdEpCOF.wwQO3zKSjJjqcE8JRZliudXTJbkRyxJyWCe
-- Actualizar usuario con id=1 (Juan Pérez) con contraseña
UPDATE usuarios 
SET password = '$2b$10$zfiaXJ4IEfZdEpCOF.wwQO3zKSjJjqcE8JRZliudXTJbkRyxJyWCe',
    rol = 'usuario'
WHERE id = 1;

-- Si necesitas crear nuevos usuarios de prueba, puedes usar estos comandos:
-- INSERT INTO usuarios (nombre, apellido, email, password, rol, tipo_usuario, fecha_registro, estado, puntos) 
-- VALUES ('Admin', 'Sistema', 'admin@cine.com', '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 'administrador', 'admin', CURDATE(), 'activo', 0);

-- INSERT INTO usuarios (nombre, apellido, email, password, rol, tipo_usuario, fecha_registro, estado, puntos) 
-- VALUES ('Usuario', 'Prueba', 'usuario@cine.com', '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 'usuario', 'cliente', CURDATE(), 'activo', 0);

