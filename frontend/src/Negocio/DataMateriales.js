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

const agregarMateriales = async (req, res) => {
  const {id_publicacion, titulo, cantidad, descripcion, categoria } = req.body;

  const estado = "Activo";
  console.log("no me mando School"+id_publicacion);
  const fechaPublicacion = new Date();
  const fechaCierre = new Date(fechaPublicacion);
  fechaCierre.setMonth(fechaCierre.getMonth() + 1);

  try {

    const resultadoMaterial = await pool.query(
      "INSERT INTO Material_Donar (Nombre, Cantidad, Estado_Material, Descripcion, Categoria, FK_idPublicacionDon) " +
      "VALUES ($1, $2, $5, $3, $6, $4) RETURNING ID_Material;",
      [titulo, cantidad, descripcion, id_publicacion, estado, categoria]
    );

    const id_material = resultadoMaterial.rows[0].id_material;

    res.status(201).json({ id_publicacion, id_material });
  } catch (error) {
    console.error("Error ACAAAAAAAAAAAAA:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const setCantidadMaterial = async (req, res) => {
  const {cantidad, idMaterial} = req.body;
  try {
    const resultadoMaterial = await pool.query(
        "UPDATE material_donar SET cantidad=$1 WHERE id_material=$2 RETURNING *",
        [cantidad, idMaterial]
    );
    res.status(201).json(resultadoMaterial.rows[0]);
  } catch (error) {
    console.error("Error ACAAAAAAAAAAAAA:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

const obtenerMaterialesDonados = async (req, res) => {
  const {idEmpresa} = req.body;
  try {
    const resultadosMateriales = await pool.query(
        "SELECT material_donar.* FROM material_donar INNER JOIN publicaciondon ON publicaciondon.fk_idempresa=$1 AND material_donar.fk_idpublicaciondon=publicaciondon.id_publicacion ORDER BY material_donar.id_material",
        [idEmpresa]
    )
    res.status(201).json(resultadosMateriales.rows);
  } catch (error) {
    console.error("Error ACAAAAAAAAAAAAA:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

module.exports ={
  agregarMateriales,
  obtenerMaterialesDonados,
  setCantidadMaterial,
};
