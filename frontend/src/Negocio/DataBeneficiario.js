//const pool = require('../Datos/conexionsPG');
//import pool from '../Datos/conexionsPG';

class Beneficiario{
    nombre;
    usuario; 
    email;
    celular; 
    cedula;
    contraseña;
    fecha_nacimiento;

    constructor(){
    }

    //metodo para crear un beneficiario
   async insertarBeneficiario(nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento){
        const text = 'INSERT INTO BENEFICIARIO (nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento)'
         +'VALUES($1, $2, $3, $4, $5, $6, $7);';
         const values = [nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento];
         try {
            const res = await pool.query(text, values);
            console.log('Registro creado:', res.rows[0]);
          } catch (err) {
            console.error(err);
          }
    }

    //metodo para consultar un beneficiario
    async consultarBeneficiario(usuario){
        const text = 'SELECT * FROM BENEFICIARIO WHERE usuario = $1;'
         const values = [usuario];
         try {
            const res = await pool.query(text, values);
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

    //metodo para actualizar un beneficiario
    async actualizarBeneficiario(cedula, camposParaActualizar){
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
        
          const text = `UPDATE BENEFICIARIO SET ${setClause.join(', ')} WHERE cedula = $${index};`;
        
          try {
            const res = await pool.query(text, values);
            if (res.rowCount > 0) {
              console.log('Registro actualizado');
            } else {
              console.log('No se encontró ningún registro para actualizar');
            }
          } catch (err) {
            console.error(err);
          }
    }
}

export default Beneficiario;