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

const verificarConexion = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexión exitosa:", res.rows[0]);
  } catch (err) {
    console.error("Error al conectar con la base de datos", err);
  }
};

verificarConexion();

const crearBeneficiario = async (req, res) => {
  const { nombre, usuario, email, celular, cedula, password, fecha_nacimiento } = req.body;
  try {
      const resultado = await pool.query(
          'INSERT INTO BENEFICIARIO (nombre, usuario, email, celular, cedula, password, fecha_nacimiento) ' +
          'VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
          [nombre, usuario, email, celular, cedula, password, fecha_nacimiento]
      );

      res.status(201).json(resultado.rows[0]); // Devuelve el beneficiario insertado
  } catch (error) {
      console.error('Error al crear beneficiario:', error);
      res.status(500).json({ message: 'Error en el servidor' }); // Asegúrate de devolver siempre JSON
  }
};

const obtenerBeneficiario = async (req, res) => {
  console.log("Obteniendo beneficiario...");
  const { usuario } = req.body;
  try {
    const resultado = await pool.query("SELECT * FROM BENEFICIARIO WHERE usuario = $1", 
      [usuario]);
      console.log(resultado);
      if (resultado.rows.length === 0) {
        return res.status(404).json({ message: "Beneficiario no encontrado" });
      }
    console.log(resultado.rows[0]);
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  crearBeneficiario,
  obtenerBeneficiario,
};
