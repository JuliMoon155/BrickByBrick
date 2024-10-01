const { Pool } = require("pg");

// Configuración de conexión
const config = {
  user: "postgres",
  host: "localhost",
  database: "brick2",
  password: "1234",
  port: 5432,
};

const pool = new Pool(config);

// controladorImagen.js
const multer = require("multer");
const upload = multer(); // Usamos multer para gestionar la subida de archivos

const agregarImagen = async (req, res) => {
  const imagen = req.file; // La imagen enviada por el cliente
  const idMaterial = req.body.idMaterial; // ID del material que viene con la imagen

  if (!idMaterial || !imagen) {
    return res
      .status(400)
      .json({ message: "Falta la imagen o el id del material" });
  }

  try {
    const resultado = await pool.query(
      "INSERT INTO Imagenes_Material (Imagen, FK_ID_Material) VALUES ($1, $2) RETURNING *;",
      [imagen.buffer, idMaterial]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error("ErrorEspecial", error);
    res.status(500).json({ message: "Jummm" });
  }
};

module.exports = { agregarImagen };
