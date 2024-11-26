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


const deletePublicacionBen = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await pool.query(
            'DELETE FROM PUBLICACIONBEN WHERE id = $1 RETURNING *;',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        res.status(200).json({ message: 'Publicación eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la publicación:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


//interactuar con la publicacion
//consultar likes generales de cada publicacion
const obtenerLikesPublicacion = async (req, res) => {
    console.log("Obteniendo cantidad de likes...");
    try {
        const conteo = await pool.query(`
            SELECT 
                p.id AS id_publicacion,
                COUNT(CASE WHEN i.tipo = 'like' THEN 1 END) AS cantidad_likes
            FROM 
                publicacionben p
            LEFT JOIN 
                interaccion i
            ON 
                p.id = i.fk_idPublicacionBen
            GROUP BY 
                p.id;
        `);

        if (conteo.rows.length === 0) {
            return res.status(404).json({ message: "No hay interacciones existentes" });
        }
        
        console.log(conteo.rows);
        res.json(conteo.rows);
    } catch (error) {
        console.error("Error al obtener cantidad de likes:", error);
        res.status(500).send("Error en el servidor");
    }
};

const obtenerMisLikes = async (req, res) => {
    const { fk_idBeneficiario } = req.params;
    console.log("Obteniendo mis likes...");
    try {
        const resultado = await pool.query(`
            SELECT 
                p.id AS id_publicacion,
                CASE 
                    WHEN i.id_interaccion IS NOT NULL THEN 1
                    ELSE 0
                END AS dio_like,
                i.id_interaccion
            FROM 
                publicacionben p
            LEFT JOIN 
                interaccion i
            ON 
                p.id = i.fk_idPublicacionBen
                AND i.fk_idBeneficiario = $1
                AND i.tipo = 'like';
        `, [fk_idBeneficiario]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "No hay interacciones existentes" });
        }
        
        console.log(resultado.rows);
        res.json(resultado.rows);
    } catch (error) {
        console.error("Error al obtener likes:", error);
        res.status(500).send("Error en el servidor");
    }
};

// Agregar un like
const likePublicacionBen = async (req, res) => {
    const { fk_idbeneficiario, fK_idPublicacionBen} = req.body;
    const tipo = 'like';

    try {
        const resultado = await pool.query(
            'INSERT INTO INTERACCION (tipo, fK_idPublicacionBen, fk_idbeneficiario)'+
            'VALUES($1, $2, $3) RETURNING *;',
            [tipo, fK_idPublicacionBen, fk_idbeneficiario]
        );
        res.status(201).json(resultado.recordset[0]);
    } catch (error) {
        console.error('Error al agregar like:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar un like
const removeLikePublicacionBen = async (req, res) => {
    const { id_interaccion } = req.body;

    try {
        const resultado = await pool.query(
           'DELETE FROM INTERACCION WHERE id = $1 RETURNING *;',
            [id_interaccion]
        );

        if (resultado.rowsAffected > 0) {
            res.status(200).json({ message: 'Like eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'No se encontró el like para eliminar' });
        }
    } catch (error) {
        console.error('Error al eliminar like:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


module.exports = {
    crearPublicacionBen,
    obtenerPublicacionesBen,
    deletePublicacionBen,

    //metodos para interaccion tipo like
    obtenerLikesPublicacion,
    obtenerMisLikes,
    likePublicacionBen,
    removeLikePublicacionBen
};