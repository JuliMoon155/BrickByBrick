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

const editarPublicacionBen = async (req, res) => {
    const { id, contenido } = req.body;  // Asegúrate de que se pase el id y el contenido
    try {
        const resultado = await pool.query(
            'UPDATE PUBLICACIONBEN SET contenido = $1 WHERE id = $2 RETURNING *;',
            [contenido, id]
        );

        if (resultado.rows.length > 0) {
            res.status(200).json(resultado.rows[0]);  // Retorna la publicación actualizada
        } else {
            res.status(404).json({ message: 'Publicación no encontrada' });
        }
    } catch (error) {
        console.error('Error al editar la publicación:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const ObPublicacionesBenPropias = async (req, res) => {
    console.log("Obteniendo publicaciones del beneficiario...");
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: "El parámetro id es requerido" });
    }

    try {
        const resultado = await pool.query(
            "SELECT * FROM PUBLICACIONBEN WHERE fk_idbeneficiario = $1",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "No hay publicaciones existentes para este beneficiario" });
        }

        console.log(resultado.rows);
        res.json(resultado.rows);
    } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
        res.status(500).send("Error en el servidor");
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

        // Contar likes en tiempo real
        const contador = await pool.query(
            'SELECT COUNT(*) AS total FROM INTERACCION WHERE tipo = $1 AND FK_idPublicacionBen = $2;',
            [tipo, id_contenidoBeneficiario]
        );

        res.status(201).json({
            like: resultado.rows[0],
            totalLikes: contador.rows[0].total
        });
    } catch (error) {
        console.error('Error al agregar like:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar un like
const removeLikePublicacionBen = async (req, res) => {
    const { id_interaccion, id_contenidoBeneficiario } = req.body;

    try {
        const resultado = await pool.query(
           'DELETE FROM INTERACCION WHERE id = $1 RETURNING *;',
            [id_interaccion]
        );

        if (resultado.rowCount > 0) {
            // Contar likes en tiempo real
            const contador = await pool.query(
                'SELECT COUNT(*) AS total FROM INTERACCION WHERE tipo = $1 AND FK_idPublicacionBen = $2;',
                ['like', id_contenidoBeneficiario]
            );

            res.status(200).json({
                message: 'Like eliminado correctamente',
                totalLikes: contador.rows[0].total
            });
        } else {
            res.status(404).json({ message: 'No se encontró el like para eliminar' });
        }
    } catch (error) {
        console.error('Error al eliminar like:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Contar likes
const contaLikes = async (req, res) => {
    const { id_contenidoBeneficiario } = req.body;

    try {
        const contador = await pool.query(
            'SELECT COUNT(*) AS total FROM INTERACCION WHERE tipo = $1 AND FK_idPublicacionBen = $2;',
            ['like', id_contenidoBeneficiario]
        );

        res.status(200).json({ totalLikes: contador.rows[0].total });
    } catch (error) {
        console.error('Error al contar likes:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Agregar un comentario
const comentarPublicacionBen = async (req, res) => {
    const { id_beneficiario, id_contenidoBeneficiario, mensaje } = req.body;
    const tipo = 'Comentario';

    try {
        const resultado = await pool.query(
            'INSERT INTO INTERACCION (tipo, Detalle, FK_idBeneficiario, FK_idPublicacionBen) VALUES ($1, $2, $3, $4) RETURNING *;',
            [tipo, mensaje, id_beneficiario, id_contenidoBeneficiario]
        );

        res.status(201).json({ comentario: resultado.rows[0] });
    } catch (error) {
        console.error('Error al agregar comentario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Consultar comentarios
const getComentariosPublicacionBen = async (req, res) => {
    const { id_contenidoBeneficiario } = req.body;

    try {
        const comentarios = await pool.query(
            'SELECT Detalle, FK_idBeneficiario FROM INTERACCION WHERE tipo = $1 AND FK_idPublicacionBen = $2;',
            ['Comentario', id_contenidoBeneficiario]
        );

        res.status(200).json(comentarios.rows);
    } catch (error) {
        console.error('Error al consultar comentarios:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


module.exports = {
    crearPublicacionBen,
    obtenerPublicacionesBen,
    deletePublicacionBen,
    ObPublicacionesBenPropias,
    editarPublicacionBen,
    //metodos para interaccion tipo like
    obtenerLikesPublicacion,
    obtenerMisLikes,
    likePublicacionBen,
    removeLikePublicacionBen
};