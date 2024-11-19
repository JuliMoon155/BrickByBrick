import React, { useState } from "react";
import '../styles/Registro.css';

export const Registro = ({ onLogin }) => {

    //setters
    const [rol, setRol] = useState('Beneficiario');
    const [textoCambioRol, setTextoCambioRol] = useState('Para Empresas');

    const [paso, setPaso] = useState(1);
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');

    const [email, setEmail] = useState('');
    const [confirmarEmail, setConfirmarEmail] = useState('');
    const [celular, setCelular] = useState('');

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');

    const [descripcion, setDescripcion] = useState('');



    const siguientePaso = () => { if (paso < 3) { setPaso(paso + 1); } };
    const anteriorPaso = () => { if (paso > 1) { setPaso(paso - 1); } };


    const handelClickCambioRol = () =>{
        if (textoCambioRol === 'Para Empresas') {
          setRol('Empresario');
          setTextoCambioRol('Para Beneficiarios');
        }else if (textoCambioRol === 'Para Beneficiarios') {
          setRol('Beneficiario');
          setTextoCambioRol('Para Empresas');
        };
      };

    const guardarUsuario = async () => {
        try {
            let datos;
            let endpoint;   

            if (rol === 'Beneficiario') {
                datos = {
                    nombre, 
                    usuario,
                    email,
                    celular,
                    cedula,
                    password,
                    Fecha_nacimiento: fechaNacimiento 
                };
                endpoint = "http://localhost:5000/api/Beneficiarios";
            } else if (rol === 'Empresario') {
                datos = {
                    nombre,
                    password,
                    descripcion,
                    usuario
                };
                endpoint = "http://localhost:5000/api/Empresas";
            }
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(datos),
            });
    
            if (!response.ok) {
                throw new Error('Error en el servidor');
            }
    
            const data = await response.json();
            console.log('Usuario guardado:', data);
            alert('usuario creado con exito');

            onLogin();
        } catch (error) {
            console.error("Error al guardar el usuario:", error);
            alert("error");
        }
    };
    


    const pasosDeRegistro = () => {
        switch (paso) {
            case 1:
                return (
                    <>
                        <p className="instruccion">Por favor ingresa toda tu info.</p>
                        <div className="inputs">
                            <input className="input" id="input_rol" placeholder={rol} disabled/>
                            <input className="input" type="text" placeholder="¿Como te llamas?" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            <input className={rol !== 'Beneficiario' ? 'input_deac' : 'input'} type="text" placeholder="¿Cuál es tu cedula?" disabled={rol !== 'Beneficiario'}
                                value={cedula} onChange={(e) => setCedula(e.target.value)} />
                            <input className={rol !== 'Beneficiario' ? 'input_deac' : 'input'} type="date" placeholder="¿Cuando naciste?" disabled={rol !== 'Beneficiario'}
                                value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />

                            <div className="Botones">
                                {paso < 3 && <button onClick={siguientePaso} className="continuar">Continuar</button>}
                            </div>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <p className="instruccion">¿Cómo te contactamos?</p>
                        <div className="inputs">

                            <input className="input" type="email" placeholder="¿Cuál es tu email?"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input className="input" type="email" placeholder="Por favor confirma tu email"
                                value={confirmarEmail} onChange={(e) => setConfirmarEmail(e.target.value)} />
                            <input className="input" type="text" placeholder={rol !== 'Beneficiario' ? "¿Como describirias a tu empresa?" : "¿Cuál es tu telefono?"}
                                value={rol !== 'Beneficiario' ? descripcion : celular} onChange={rol !== 'Beneficiario' ? (e) => setDescripcion(e.target.value) : (e) => setCelular(e.target.value)} />

                            <div className="Botones">
                                {paso > 1 && <button onClick={anteriorPaso} className="regresar">Regresar</button>}
                                {paso < 3 && <button onClick={siguientePaso} className="continuar">Continuar</button>}
                            </div>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <p className="instruccion">¿Cómo te reconocemos?</p>
                        <div className="inputs">

                            <input className="input" type="text" placeholder="¿Cuál va a ser tu usuario?"
                                value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                            <input className="input" type="password" placeholder="¿Cuál sera tu contraseña?"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input className="input" type="password" placeholder="Por favor confirma tu contraseña"
                                value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} />

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
                    <div className={paso === 1 ? "rect-acti" : "rect-inac"}></div>
                    <div className={paso === 2 ? "rect-acti" : "rect-inac"}></div>
                    <div className={paso === 3 ? "rect-acti" : "rect-inac"}></div>
                </div>
                {pasosDeRegistro()}
            </div>
            <div className="CambioRol2" onClick={handelClickCambioRol}>{textoCambioRol}</div>

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
