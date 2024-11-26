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

const consultarInscripcion = async (req, res) => {
    const { userId } = req.query; // Obtener el ID del usuario desde la query string
    console.log(`${userId} recibido en consulta`);

    try {
        // Consultar inscripciones activas del usuario
        const inscripcionesResultado = await pool.query(
            "SELECT fk_idpublicaciondon, id_inscripcion " + // Asegúrate de que el campo tiene el nombre correcto
            "FROM Inscripcion " +
            "WHERE fk_idBeneficiario = $1;",
            [userId]
        );

        const inscripciones = inscripcionesResultado.rows;
        console.log("Inscripciones obtenidas:", inscripciones);

        if (inscripciones.length === 0) {
            return res.status(404).json({ message: "No se encontraron inscripciones activas" });
        }
        const publicacionesInfo = [];

        for (const inscripcion of inscripciones) {
            console.log("Inscripción:", inscripcion);
            const { fk_idpublicaciondon, id_inscripcion } = inscripcion;
            console.log(`Consultando publicación con fk_idPublicacionDon: ${fk_idpublicaciondon}`);

            if (!fk_idpublicaciondon) {
                console.log("fk_idpublicaciondon es undefined o null, se salta esta inscripción.");
                continue;
            }

            const publicacionResultado = await pool.query(
                "SELECT * FROM PublicacionDon WHERE id_publicacion = $1;",
                [fk_idpublicaciondon]
            );

            if (publicacionResultado.rows.length > 0) {
                const publicacion = publicacionResultado.rows[0];

                publicacionesInfo.push({
                    id_inscripcion,
                    ...publicacion
                });
                console.log(publicacionesInfo + "222");
            } else {
                console.log(`No se encontró publicación para fk_idPublicacionDon: ${fk_idpublicaciondon}`);
            }
        }

        console.log(publicacionesInfo);
        res.status(200).json(publicacionesInfo);
    } catch (error) {
        console.error("Error al consultar inscripciones:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};


const eliminarInscripcion = async (req, res) => {
    const { idInscripcion } = req.params;

    console.log(idInscripcion);  

    if (!idInscripcion || isNaN(idInscripcion)) {
        return res.status(400).json({ message: "ID de inscripción inválido" });
    }


    try {
        const resultado = await pool.query(
            "DELETE FROM inscripcion WHERE id_inscripcion = $1 RETURNING *;", 
            [idInscripcion] 
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Inscripción no encontrada" });
        }
        
     
        res.status(200).json({ message: "Inscripción eliminada correctamente", data: resultado.rows[0] });
    } catch (error) {

        console.error("Error al eliminar inscripción:", error);
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
    consultarInscripcion,
    eliminarInscripcion,
    obtenerInscripcionesXEmpresa,
};