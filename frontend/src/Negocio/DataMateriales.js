// Importar el módulo 'pg' para la conexión con PostgreSQL
const { Pool } = require("pg");

// Configuración de conexión a la base de datos
const config = {
  user: "postgres",
  host: "localhost",
  database: "brick2",
  password: "1234",
  port: 5432,
};

const pool = new Pool(config);

// Controlador para agregar materiales a una publicación existente
const agregarMateriales = async (req, res) => {
  const { id_publicacion, titulo, cantidad, descripcion } = req.body;

  try {
    // Insertar los nuevos materiales asociados a la publicación existente
    const resultado = await pool.query(
      "INSERT INTO Material_Donar (Nombre, Cantidad, Descripcion, FK_idPublicacionDon) " +
        "VALUES ($1, $2, $3, $4) RETURNING ID_Material;",
      [titulo, cantidad, descripcion, id_publicacion]
    );

    const id_material = resultado.rows[0].id_material;

    // Responder con el ID del nuevo material agregado
    res.status(201).json({ id_material });
  } catch (error) {
    console.error("Error al agregar material a la publicación:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { agregarMateriales };
