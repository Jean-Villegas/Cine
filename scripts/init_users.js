// Script para inicializar usuarios con contraseñas
// Uso: node scripts/init_users.js

const bcrypt = require('bcryptjs');
const { query } = require('../db');

async function initUsers() {
  try {
    console.log('Inicializando usuarios...\n');

    // Verificar si la columna password existe
    try {
      await query('SELECT password FROM usuarios LIMIT 1');
    } catch (error) {
      console.log('Agregando columna password...');
      await query('ALTER TABLE usuarios ADD COLUMN password VARCHAR(255) NULL AFTER email');
    }

    // Verificar si la columna rol existe
    try {
      await query('SELECT rol FROM usuarios LIMIT 1');
    } catch (error) {
      console.log('Agregando columna rol...');
      await query("ALTER TABLE usuarios ADD COLUMN rol VARCHAR(50) DEFAULT 'usuario' AFTER tipo_usuario");
    }

    // Hash de contraseñas
    const adminHash = await bcrypt.hash('admin123', 10);
    const userHash = await bcrypt.hash('usuario123', 10);

    // Actualizar o crear usuario administrador
    const adminExists = await query('SELECT id FROM usuarios WHERE email = ?', ['admin@cine.com']);
    
    if (adminExists.length > 0) {
      await query(
        'UPDATE usuarios SET password = ?, rol = ? WHERE email = ?',
        [adminHash, 'administrador', 'admin@cine.com']
      );
      console.log('✓ Usuario administrador actualizado');
      console.log('  Email: admin@cine.com');
      console.log('  Contraseña: admin123');
    } else {
      await query(
        `INSERT INTO usuarios (nombre, apellido, email, password, rol, tipo_usuario, fecha_registro, estado, puntos) 
         VALUES (?, ?, ?, ?, ?, ?, CURDATE(), ?, ?)`,
        ['Admin', 'Sistema', 'admin@cine.com', adminHash, 'administrador', 'admin', 'activo', 0]
      );
      console.log('✓ Usuario administrador creado');
      console.log('  Email: admin@cine.com');
      console.log('  Contraseña: admin123');
    }

    // Actualizar usuario normal (usar el primer usuario existente o crear uno nuevo)
    const users = await query('SELECT id, email FROM usuarios WHERE email != ? LIMIT 1', ['admin@cine.com']);
    
    if (users.length > 0) {
      const user = users[0];
      await query(
        'UPDATE usuarios SET password = ?, rol = ? WHERE id = ?',
        [userHash, 'usuario', user.id]
      );
      console.log('✓ Usuario normal actualizado');
      console.log(`  Email: ${user.email}`);
      console.log('  Contraseña: usuario123');
    } else {
      await query(
        `INSERT INTO usuarios (nombre, apellido, email, password, rol, tipo_usuario, fecha_registro, estado, puntos) 
         VALUES (?, ?, ?, ?, ?, ?, CURDATE(), ?, ?)`,
        ['Usuario', 'Prueba', 'usuario@cine.com', userHash, 'usuario', 'cliente', 'activo', 0]
      );
      console.log('✓ Usuario normal creado');
      console.log('  Email: usuario@cine.com');
      console.log('  Contraseña: usuario123');
    }

    console.log('\n✓ Usuarios inicializados correctamente');
  } catch (error) {
    console.error('Error al inicializar usuarios:', error);
    process.exit(1);
  }
}

initUsers();

