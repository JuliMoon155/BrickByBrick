import React, { useState} from "react";
import "..//styles/Registro.css";
import Beneficiario from "../Negocio/DataBeneficiario";

export const Registro = ({onLogin}) => {

    //setters
    const[rol, setRol] = useState('Beneficiario');
    const[paso, setPaso] = useState(1);
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');

    const [email, setEmail] = useState('');
    const [confirmarEmail, setConfirmarEmail] = useState('');
    const [celular, setCelular] = useState('');

    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');


    const siguientePaso = () => {if(paso < 3){setPaso(paso + 1);}};
    const anteriorPaso = () => {if(paso > 1){setPaso(paso - 1);}};
    const guardarUsuario =  () => {
        const data = {nombre, usuario, email, celular, cedula, contraseña, fechaNacimiento};
        try{
            //const beneficiario = new Beneficiario();
            //beneficiario.insertarBeneficiario(data.nombre, data.usuario, data.email, data.cedula, data.cedula, data.contraseña, data.fechaNacimiento);
            console.log('Usuario guardado correctamente', data);
            alert('usuario exitosamente creado');
        } catch (err){
            console.error('Error al guardar el usuario: ', err);
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
                    <input className="input" type="text" placeholder="¿Como te llamas?" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                    <input className={rol !== 'Beneficiario' ? 'input_deac' : 'input'} type="text" placeholder="¿Cuál es tu cedula?" disabled={rol !== 'Beneficiario'} 
                    value={cedula} onChange={(e) => setCedula(e.target.value)}/>
                    <input className={rol !== 'Beneficiario' ? 'input_deac' : 'input'} type="date" placeholder="¿Cuando naciste?" disabled={rol !== 'Beneficiario'}
                    value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>
                    
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

                    <input className="input" type="email" placeholder="¿Cuál es tu email?" 
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input className="input" type="email" placeholder="Por favor confirma tu email" 
                    value={confirmarEmail} onChange={(e) => setConfirmarEmail(e.target.value)}/>
                    <input className="input" type="text" placeholder={rol !== 'Beneficiario' ? "¿Como describirias a tu empresa?" : "¿Cuál es tu telefono?"} 
                    value={celular} onChange={(e) => setCelular(e.target.value)}/>

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

                    <input className="input" type="text" placeholder="¿Cuál va a ser tu usuario?" 
                    value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
                    <input className="input" type="password" placeholder="¿Cuál sera tu contraseña?" 
                    value={contraseña} onChange={(e) => setContraseña(e.target.value)}/>
                    <input className="input" type="password" placeholder="Por favor confirma tu contraseña" 
                    value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)}/>

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
