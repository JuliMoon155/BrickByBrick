class Beneficiario{
    nombre;
    usuario; 
    email;
    celular; 
    cedula;
    contraseña;
    fecha_nacimiento;

    constructor(nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento){
        this.nombre = nombre;
        this.usuario = usuario;
        this.email = email;
        this.celular = celular;
        this.cedula = cedula;
        this.contraseña = contraseña;
        this.fecha_nacimiento = fecha_nacimiento;
    }

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

    async consultarBeneficiario(nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento){
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

    async actualizarBeneficiario(nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento){
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
}
