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

const crearInscripcion = async (req, res) => {
    const { fk_idPublicacionDon, fk_idBeneficiario, nombre, apellido, celular, correo } = req.body;

    try {
        const inscripcionResultado = await pool.query(
            "INSERT INTO Inscripcion (FK_idPublicacionDon, FK_idBeneficiario, Nombre, Apellido, Celular, Correo) " +
            "VALUES ($1, $2, $3, $4, $5, $6) RETURNING ID_Inscripcion;",
            [fk_idPublicacionDon, fk_idBeneficiario, nombre, apellido, celular, correo]
        );

        const id_inscripcion = inscripcionResultado.rows[0].id_inscripcion;

        res.status(201).json({ id_inscripcion });
    } catch (error) {
        console.error("Error al crear inscripción:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

const obtenerInscripcionesXEmpresa = async(req, res) =>{
    console.log("Obteniendo notificaciones...");
    const { empresa } = req.body;
    try {
        const resultado = await pool.query("SELECT" +
            "i.id_inscripcion AS id_inscripcion, "+
            "i.nombre AS nombre_beneficiario, "+
            "i.apellido AS apellido_beneficiario, "+
            "i.celular, "+
            "i.correo, "+
            "i.fecha_creacion, "+
            "p.titulo AS titulo_publicacion, "+
            "e.nombre AS nombre_empresa "+
            "FROM empresa e "+
            "JOIN publicaciondon p ON e.id = p.fk_idempresa "+
            "JOIN inscripcion i ON p.id_publicacion = i.fk_idpublicaciondon "+
            "WHERE e.id = $1 "+
            "ORDER BY i.fecha_creacion DESC;", 
            [empresa]);
            console.log(resultado);
            if (resultado.rows.length === 0) {
                return res.status(404).json({ message: "No existen notificaciones" });
            }
            console.log(resultado.rows[0]);
            res.json(resultado.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error en el servidor");
        }
}

module.exports = {
    crearInscripcion,
    obtenerInscripcionesXEmpresa,
};