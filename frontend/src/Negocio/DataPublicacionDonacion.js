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

const crearPublicacion = async (req, res) => {
    const {titulo, userId, descripcion, fechaEvento, horaEvento, ubicacionEvento} = req.body;

    const estado = "Activo";
    const cantidad = "5000";
    const fechaPublicacion = new Date();
    const fechaCierre = new Date(fechaPublicacion);
    fechaCierre.setMonth(fechaCierre.getMonth() + 1);

    try {
        const publicacionResultado = await pool.query(
            "INSERT INTO PublicacionDon (Titulo, Fecha_Publicacion, Fecha_Evento, hora_evento, ubicacion_evento, Estado, Descripcion, Cantidad_Disponible, Fecha_Cierre, FK_idEmpresa) " +
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING Id_Publicacion;",
            [titulo, fechaPublicacion, fechaEvento, horaEvento, ubicacionEvento, estado, descripcion, cantidad, fechaCierre, userId]
        );

        const id_publicacion = publicacionResultado.rows[0].id_publicacion;

        res.status(201).json({id_publicacion});
    } catch (error) {
        console.error("Error ACAAAAAAAAAAAAA:", error);
        res.status(500).json({message: "Error en el servidor"});
    }
};

const editarPublicacionDonacion = async (req, res) => {
    const {idPublicacion, titulo, descripcion, fechaCierre, estado} = req.body;
    try {
        const resultadoPublicacion = await pool.query("UPDATE publicaciondon SET titulo = $1, descripcion = $2, fecha_cierre = $3, estado = $4 WHERE id_publicacion = $5", [titulo, descripcion, fechaCierre, estado, idPublicacion]);
        res.status(201).json(resultadoPublicacion.rows);
    } catch (error) {
        console.error("Error ACAAAAAAAAAAAAA:", error);
        res.status(500).json({message: "Error en el servidor"});
    }
}

const buscarPublicacion = async (req, res) => {
    const {texto, categorias, cantidad_minima, cantidad_maxima} = req.body;
    for (let i = 0; i < categorias.length; i++) {
        categorias[i] = "'" + categorias[i] + "'";
    }
    try {
        const result = await pool.query(`select * from buscar_eventos($1, array[${categorias.join("','")}]::text[], $2, $3)`, [texto, cantidad_minima, cantidad_maxima])
        if (result.rows.length === 0) {
            return res.status(404).json({message: "No hay resultados de búsqueda."});
        }
        console.log(result.rows[0].buscar_eventos);
        res.status(201).json(result.rows[0].buscar_eventos);
    } catch (error) {
        console.error("Error ACAAAAAAAAAAAAA:", error);
        res.status(500).json({message: "Error en el servidor"});
    }
}

const obtenerPublicacionesDeEmpresa = async (req, res) => {
    const {idEmpresa} = req.body;
    try {
        const result = await pool.query(`select * from obtener_publicaciones_de_empresa($1)`, [idEmpresa]);
        if (result.rows.length === 0) {
            return res.status(404).json({message: "No hay publicaciones activas"});
        }
        console.log(result.rows[0].obtener_publicaciones_de_empresa);
        res.status(201).json(result.rows[0].obtener_publicaciones_de_empresa);
    } catch (error) {
        console.error("Error ACAAAAAAAAAAAAA:", error);
        res.status(500).json({message: "Error en el servidor"});
    }
}

module.exports = {
    crearPublicacion,
    buscarPublicacion,
    obtenerPublicacionesDeEmpresa,
    editarPublicacionDonacion
};