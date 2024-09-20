import React, { useState} from "react";
import "../styles/Registro.css";

export const Registro = ({onLogin}) => {

    const[rol, setRol] = useState('Beneficiario');
    const[paso, setPaso] = useState(1);

    const siguientePaso = () => {
        if(paso < 3){
            setPaso(paso + 1);
        }
    };

    async function guardarUsuario(nombre, usuario, email, celular, cedula, contraseña, fecha_nacimiento){
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

    const anteriorPaso = () => {
        if(paso > 1){
            setPaso(paso - 1);
        }
    };

    const pasosDeRegistro = () =>{
        switch(paso){
            case 1:
                return(
                    <>
                    <p className="instruccion">Por favor ingresa toda tu info.</p>
                    <div className="inputs">
                    <div className="ComboBox">
                    <select defaultValue="" onChange={(e) => setRol(e.target.value)}>
                        <option value="" disabled>
                        ¿Qué rol ocupas?
                        </option>
                        <option value="Beneficiario">Beneficiario</option>
                        <option value="Empresa">Empresa</option>
                    </select>
                    </div>
                    <input className="input" type="text" placeholder="¿Como te llamas?" />
                    <input className={rol !== 'Beneficiario' ? 'input_deac' : 'input'} type="text" placeholder="¿Cuál es tu cedula?" disabled={rol !== 'Beneficiario'}/>
                    <input className={rol !== 'Beneficiario' ? 'input_deac' : 'input'} type="date" placeholder="¿Cuando naciste?" disabled={rol !== 'Beneficiario'}/>
                    
                    <div className="Botones">
                    {paso < 3 && <button onClick={siguientePaso} className="continuar">Continuar</button>}
                    </div>
                </div>
                </>
                );
            case 2:
                return(
                    <>
                    <p className="instruccion">¿Cómo te contactamos?</p>
                    <div className="inputs">

                    <input className="input" type="email" placeholder="¿Cuál es tu email?" />
                    <input className="input" type="email" placeholder="Por favor confirma tu email" />
                    <input className="input" type="number" placeholder="¿Cuál es tu telefono?" />

                    <div className="Botones">
                    {paso > 1 && <button onClick={anteriorPaso} className="regresar">Regresar</button>}
                    {paso < 3 && <button onClick={siguientePaso} className="continuar">Continuar</button>}
                    </div>
                </div>
                </>
                );
            case 3:
                return(
                    <>
                    <p className="instruccion">¿Cómo te reconocemos?</p>
                    <div className="inputs">

                    <input className="input" type="text" placeholder="¿Cuál va a ser tu usuario?" />
                    <input className="input" type="password" placeholder="¿Cuál sera tu contraseña?" />
                    <input className="input" type="password" placeholder="Por favor confirma tu contraseña" />

                    <div className="Botones">
                    {paso > 1 && <button onClick={anteriorPaso} className="regresar">Regresar</button>}
                    {paso <= 3 && <button onClick={guardarUsuario} className="continuar">Guardar</button>}
                    </div>
                </div>
                </>
                );
            default:
                return null;
        }
    }


    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        edad: '',
        comentario: '',
      });

    return (
        <div className="registro">
            <div className="container_logo">
                <span className="horizontal-text">A Ladrillo</span>
                <span className="vertical-text">Ladrillo</span>
            </div>
            <div className="formulario">
                <h1 className="Titulo">¡REGISTRATE!</h1>
                <div className="indicador-paso">
                    <div className={paso===1?"rect-acti":"rect-inac"}></div>
                    <div className={paso===2?"rect-acti":"rect-inac"}></div>
                    <div className={paso===3?"rect-acti":"rect-inac"}></div>
                </div>
                {pasosDeRegistro()}
            </div>

            <div className="cambio-login">
                <h2 className="Titulo2">¿YA TIENES UNA CUENTA?</h2>
                <p> 
                    Si ya has hecho este proceso antes, muy probablemente ya tienes una
                    cuenta, haz click en el siguiente botón para iniciar sesión.
                </p>
                <button className="iniciar-sesion" onClick={onLogin}>Iniciar Sesión</button>
            </div>
            <div className="container_logo2">
                <span className="vertical-text2">Ladrillo</span>
                <span className="horizontal-text2">Ladrillo A</span>
            </div>

        </div>
    );
};
