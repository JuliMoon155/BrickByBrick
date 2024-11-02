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

const verificarConexion = async () => {
    try {
        const res = await pool.query("SELECT NOW()");
        console.log("Conexión exitosa:", res.rows[0]);
    } catch (err) {
        console.error("Error al conectar con la base de datos", err);
    }
};

verificarConexion();

const crearPublicacionBen = async (req, res) => {
    const {contenido, fk_idbeneficiario} = req.body;
    const fechaPublicacion = new Date();
    try {
        const resultado = await pool.query(
            'INSERT INTO PUBLICACIONBEN (contenido, fecha_publicacion, fk_idbeneficiario) ' +
            'VALUES($1, $2, $3) RETURNING *;',
            [contenido, fechaPublicacion, fk_idbeneficiario]
        );

        res.status(201).json(resultado.rows[0]); // Devuelve el beneficiario insertado
    } catch (error) {
        console.error('Error al crear la publicacion:', error);
        res.status(500).json({message: 'Error en el servidor'}); // Asegúrate de devolver siempre JSON
    }
};

const obtenerPublicacionesBen = async (req, res) => {
    console.log("Obteniendo publicacion...");
    const {fk_idbeneficiario} = req.body;
    try {
        const resultado = await pool.query("SELECT * FROM PUBLICACIONBEN");
        // [fk_idbeneficiario]);
        console.log(resultado);
        if (resultado.rows.length === 0) {
            return res.status(404).json({message: "No hay publicaciones existentes"});
        }
        console.log(resultado.rows);
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
};

module.exports = {
    crearPublicacionBen,
    obtenerPublicacionesBen,
};