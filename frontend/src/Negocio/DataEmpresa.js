class Empresa{
    // Id;
    nombre; 
    usuario;
    contraseña;
    descripción;
    email;


    constructor(){
    }

    //metodo para crear un empresa
    async insertarEmpresa(nombre, usuario, contraseña, descripcion, email){
        const text = 'INSERT INTO EMPRESA (nombre, usuario, contraseña, descripcion, email)'
         +'VALUES($1, $2, $3, $4, $5);';
         const values = [nombre, usuario, contraseña, descripcion, email];
         try {
            const res = await pool.query(text, values);
            console.log('Registro creado:', res.rows[0]);
          } catch (err) {
            console.error(err);
          }
    }

    //metodo para consultar un empresa
    async consultarEmpresa(usuario){
        const text = 'SELECT * FROM EMPRESA WHERE usuario = $1;'
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

    //metodo para actualizar un empresa
    async actualizarEmpresa(cedula, camposParaActualizar){
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
        
          const text = `UPDATE EMPRESA SET ${setClause.join(', ')} WHERE cedula = $${index};`;
        
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