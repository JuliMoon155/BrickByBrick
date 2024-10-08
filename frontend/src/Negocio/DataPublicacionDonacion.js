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

const crearPublicacion = async (req, res) => {
  const {  descripcion, userId, categoria } = req.body;

  const estado = "Activo";
  const cantidad = "5000";
  const fechaPublicacion = new Date();
  const fechaCierre = new Date(fechaPublicacion);
  fechaCierre.setMonth(fechaCierre.getMonth() + 1);

  try {
    const publicacionResultado = await pool.query(
      "INSERT INTO PublicacionDon (Fecha_Publicacion, Estado, Descripcion, Cantidad_Disponible, Fecha_Cierre, FK_idEmpresa) " +
      "VALUES ($1, $2, $3, $4, $5, $6) RETURNING Id_Publicacion;",
      [fechaPublicacion, estado, descripcion, cantidad, fechaCierre, userId ]
    );

    const id_publicacion = publicacionResultado.rows[0].id_publicacion;

    res.status(201).json({ id_publicacion });
  } catch (error) {
    console.error("Error ACAAAAAAAAAAAAA:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports ={
  crearPublicacion,
};