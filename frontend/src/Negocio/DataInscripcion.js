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

module.exports = {
    crearInscripcion
};