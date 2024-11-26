const { Pool } = require('pg');

// Configuración de conexión
const config = {
    user: 'postgres',      // El usuario de tu base de datos
    host: 'localhost',       // El host donde corre PostgreSQL (generalmente localhost)
    database: 'brick2', // El nombre de tu base de datos
    password: '1234', // La contraseña del usuario
    port: 5432,              // El puerto de PostgreSQL, por defecto es 5432
};

const pool = new Pool(config);

// const crearNotificacion = async (req, res) => {
//     const { id_recipiente, id_emisor, tipo } = res.body;
//     try {
//         const resultado = await pool.query('INSERT INTO notificacionesben (id_recipiente, id_emisor, tipo, fecha, hora, por_leer) VALUES ($1, $2, $3, now()::date, now()::time, TRUE) RETURNING *', [id_recipiente, id_emisor, tipo]);
//         res.status(201).json(resultado.rows[0]);
//     } catch (error) {
//         console.error('Error al crear notificación:', error);
//         res.status(500).json({ message: 'Error en el servidor' });
//     }
// }

module.exports = {
    // crearNotificacion
}