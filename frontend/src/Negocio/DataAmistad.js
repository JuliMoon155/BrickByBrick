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

const crearAmistad = async (req, res) => {
    const { id_solicitante, id_solicitado, id_solicitud } = req.body;
    try {
        const resultado = await pool.query('INSERT INTO amistad values (default, $1, $2, $3, now()::date, null, \'activa\') RETURNING *', [id_solicitante, id_solicitado, id_solicitud]);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al crear amistad:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const buscarAmistades = async (req, res) => {
    const { userId, texto } = req.body;
    try {
        const resultado = await pool.query('select beneficiario.nombre, beneficiario.usuario, amistad.id_amistad from amistad left join beneficiario on (amistad.id_solicitado = beneficiario.id or amistad.id_solicitante = beneficiario.id) where beneficiario.id != $1 and (beneficiario.nombre ~* $2 or beneficiario.usuario ~* $2) and amistad.estado = \'activa\'', [userId, texto]);
        res.status(201).json(resultado.rows);
    } catch (error) {
        console.error('Error al crear amistad:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const obtenerAmistades = async (req, res) => {
    const { userId } = req.body;
    try {
        const resultado = await pool.query('SELECT beneficiario.nombre, beneficiario.usuario, amistad.id_amistad FROM amistad LEFT JOIN beneficiario ON (beneficiario.id = amistad.id_solicitante or beneficiario.id = amistad.id_solicitado) WHERE beneficiario.id != $1 and amistad.estado != \'eliminada\'', [userId]);
        res.status(201).json(resultado.rows);
    } catch (error) {
        console.error('Error al crear amistad:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const editarEstadoAmistad = async (req, res) => {
    const { id_amistad, estado } = req.body;
    const fecha_final = estado === 'eliminada' ? new Date().toISOString().split('T')[0] : null;
    try {
        const resultado = await pool.query('UPDATE amistad SET estado = $2, fecha_final = $3 WHERE id_amistad = $1 RETURNING *', [id_amistad, estado, fecha_final]);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al crear amistad:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

module.exports = {
    crearAmistad,
    buscarAmistades,
    obtenerAmistades,
    editarEstadoAmistad
}