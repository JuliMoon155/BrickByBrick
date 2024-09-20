// db.js
const { Pool } = require('pg');

// Configuración de conexión
const pool = new Pool({
  user: 'postgres',      // El usuario de tu base de datos
  host: 'localhost',       // El host donde corre PostgreSQL (generalmente localhost)
  database: 'ladrillo', // El nombre de tu base de datos
  password: '1234', // La contraseña del usuario
  port: 5432,              // El puerto de PostgreSQL, por defecto es 5432
});

// Exportamos el pool de conexiones para usar en otras partes de la aplicación
module.exports = pool;
