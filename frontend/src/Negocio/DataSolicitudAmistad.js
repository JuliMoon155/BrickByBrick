const {Pool} = require('pg');

// Configuración de conexión
const config = {
    user: 'postgres',      // El usuario de tu base de datos
    host: 'localhost',       // El host donde corre PostgreSQL (generalmente localhost)
    database: 'brick2', // El nombre de tu base de datos
    password: '1234', // La contraseña del usuario
    port: 5432,              // El puerto de PostgreSQL, por defecto es 5432
};

const pool = new Pool(config);

const crearSolicitudAmistad = async (req, res) => {
    const { id_solicitante, id_solicitado } = req.body;
    try {
        const resultado = await pool.query('INSERT INTO solicitud_amistad (id_solicitante, id_solicitado, estado) VALUES ($1, $2, \'pendiente\') RETURNING *', [id_solicitante, id_solicitado]);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al crear solicitud de amistad:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const obtenerMisSolicitudesAmistad = async (req, res) => {
    const { userId } = req.body;
    try {
        const resultado = await pool.query('SELECT solicitud_amistad.id_solicitud, solicitud_amistad.id_solicitante, solicitud_amistad.id_solicitado, beneficiario.nombre, beneficiario.usuario FROM solicitud_amistad LEFT JOIN beneficiario ON solicitud_amistad.id_solicitante = beneficiario.id WHERE solicitud_amistad.id_solicitado = $1 and estado = \'pendiente\'', [userId]);
        res.status(201).json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener solicitud de amistad:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const editarEstadoSolicitud = async (req, res) => {
    const { id_solicitud, estado } = req.body;
    try {
        const resultado = await pool.query('UPDATE solicitud_amistad SET estado = $2 WHERE id_solicitud = $1 RETURNING *', [id_solicitud, estado]);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al editar el estado de la solicitud de amistad:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

module.exports = {
    crearSolicitudAmistad,
    obtenerMisSolicitudesAmistad,
    editarEstadoSolicitud
}