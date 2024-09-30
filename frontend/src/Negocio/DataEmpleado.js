    //import { Pool } from 'pg';
    const { Pool } = require('pg');

    // Configuración de conexión
    const config = {
      user: 'postgres',      // El usuario de tu base de datos
      host: 'localhost',       // El host donde corre PostgreSQL (generalmente localhost)
      database: 'brick', // El nombre de tu base de datos
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
/*
    //metodo para crear un empleado
    function insertarEmpleado(nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento){
        const text = 'INSERT INTO EMPLEADO (nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento)'
         +'VALUES($1, $2, $3, $4, $5, $6, $7);';
         const values = [nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento];
         try {
            const res = pool.query(text, values);
            console.log('Registro creado:', res.rows[0]);
            alert('ya');
          } catch (err) {
            console.error(err);
          }
    }*/

    const crearEmpleado = async (req, res) => {
      const { nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento } = req.body;
      try {
        const resultado = await pool.query(
          'INSERT INTO EMPLEADO (nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento)'
         +'VALUES($1, $2, $3, $4, $5, $6, $7);',
          [nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento]
        );
        res.json(resultado.rows[0]);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
      }
    };
/*
    //metodo para consultar un empleado
    function consultarEmpleado(cedula){
        const text = 'SELECT * FROM EMPLEADO WHERE cedula = $1;'
         const values = [cedula];
         try {
            const res = pool.query(text, values);
            if (res.rows.length > 0) {
                console.log('Registro encontrado:', res.rows[0]);
                return res.rows[0]; // Devuelve el primer resultado encontrado
            } else {
            console.log('No se encontró ningún registro');
            }
          } catch (err) {
            console.error(err);
          }
    }

    //metodo para actualizar un empleado
    function actualizarEmpleado(cedula, camposParaActualizar){
        if (Object.keys(camposParaActualizar).length === 0) {
            console.log('No se proporcionaron campos para actualizar');
            return;
          }
        
          // Construir la consulta SQL dinámicamente
          let setClause = [];
          let values = [];
          let index = 1;
        
          // Recorrer los campos para crear la consulta
          for (const campo in camposParaActualizar) {
            setClause.push(`${campo} = $${index}`);
            values.push(camposParaActualizar[campo]);
            index++;
          }
        
          // Agregar la cédula como último valor para la cláusula WHERE
          values.push(cedula);
        
          const text = `UPDATE EMPLEADO SET ${setClause.join(', ')} WHERE cedula = $${index};`;
        
          try {
            const res = pool.query(text, values);
            if (res.rowCount > 0) {
              console.log('Registro actualizado');
            } else {
              console.log('No se encontró ningún registro para actualizar');
            }
          } catch (err) {
            console.error(err);
          }
    }

*/