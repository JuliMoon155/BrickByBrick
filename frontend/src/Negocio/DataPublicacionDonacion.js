// Importar el módulo 'pg' para la conexión con PostgreSQL
const { Pool } = require("pg");

// Configuración de conexión a la base de datos
const config = {
  user: "postgres", // Usuario de la base de datos
  host: "localhost", // Host (generalmente 'localhost')
  database: "brick2", // Nombre de la base de datos
  password: "1234", // Contraseña del usuario
  port: 5432, // Puerto (por defecto 5432)
};

const pool = new Pool(config);

// Controlador para crear una publicación con materiales asociados
const crearPublicacion = async (req, res) => {
  // Datos recibidos del cuerpo de la solicitud
  const { titulo, cantidad, descripcion, empresaId } = req.body;

  // Valores estáticos: Estado, Fecha de cierre, Fecha de publicación
  const estado = "Activo";
  const fechaPublicacion = new Date(); // Fecha actual
  const fechaCierre = new Date(fechaPublicacion); // Fecha de cierre un mes después
  fechaCierre.setMonth(fechaCierre.getMonth() + 1);

  try {
    // Crear la publicación en la tabla PublicacionDon
    const publicacionResultado = await pool.query(
      "INSERT INTO PublicacionDon (Fecha_Publicacion, Estado, Descripcion, Cantidad_Disponible, Fecha_Cierre, FK_idEmpresa) " +
        "VALUES ($1, $2, $3, $4, $5, $6) RETURNING Id_Publicacion;",
      [fechaPublicacion, estado, descripcion, cantidad, fechaCierre, empresaId]
    );

    const id_publicacion = publicacionResultado.rows[0].id_publicacion;

    // Insertar los materiales asociados a la publicación
    const resultadoMaterial = await pool.query(
      "INSERT INTO Material_Donar (Nombre, Cantidad, Estado_Material, Descripcion, FK_idPublicacionDon) " +
        "VALUES ($1, $2, $5, $3, $4) RETURNING ID_Material;",
      [titulo, cantidad, descripcion, id_publicacion, estado]
    );

    const id_material = resultadoMaterial.rows[0].id_material;

    // Responder con los ID generados
    res.status(201).json({ id_publicacion, id_material });
  } catch (error) {
    console.error("Error al crear la publicación:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { crearPublicacion };
