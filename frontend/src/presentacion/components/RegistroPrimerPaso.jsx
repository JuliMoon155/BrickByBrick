import React, { useState} from "react";
import "../styles/Registro.css";

export const RegistroPrimerPaso = () => {

    const[paso, setPaso] = useState(1);

    const siguientePaso = () => {
        if(paso < 3){
            setPaso(paso + 1);
        }
    };

    const anteriorPaso = () => {
        if(paso > 1){
            setPaso(paso - 1);
        }
    };

    const pasosDeRegistro = () =>{
        switch(paso){
            case 1:
                return(
                    <div className="inputs">

                    <input className="input" type="text" placeholder="¿Cuál es tu nombre?" />
                    <input className="input" type="text" placeholder="¿Cuál es tu apellido?" />
                    <input className="input" type="text" placeholder="¿Qué edad tienes?" />

                    <div className="ComboBox">
                        <select defaultValue="">
                            <option value="" disabled>
                                ¿Como te identificas?
                            </option>
                            <option>Masculino</option>
                            <option>Femenino</option>
                            <option>Otro</option>
                        </select>
                    </div>
                    <div className="Botones">
                    {paso < 3 && <button onClick={siguientePaso} className="continuar">Continuar</button>}
                    </div>
                </div>
                );
            case 2:
                return(
                    <div className="inputs">

                    <input className="input" type="text" placeholder="¿Cuál es tu nombre?" />
                    <input className="input" type="text" placeholder="¿Cuál es tu apellido?" />
                    <input className="input" type="text" placeholder="¿Qué edad tienes?" />

                    <div className="ComboBox">
                        <select defaultValue="">
                            <option value="" disabled>
                                ¿Como te identificas?
                            </option>
                            <option>Masculino</option>
                            <option>Femenino</option>
                            <option>Otro</option>
                        </select>
                    </div>
                    <div className="Botones">
                    {paso > 1 && <button onClick={anteriorPaso} className="regresar">Regresar</button>}
                    {paso < 3 && <button onClick={siguientePaso} className="continuar">Continuar</button>}
                    </div>
                </div>
                );
            case 3:
                return(
                    <div className="inputs">

                    <input className="input" type="text" placeholder="¿Cuál es tu nombre?" />
                    <input className="input" type="text" placeholder="¿Cuál es tu apellido?" />
                    <input className="input" type="text" placeholder="¿Qué edad tienes?" />

                    <div className="ComboBox">
                        <select defaultValue="">
                            <option value="" disabled>
                                ¿Como te identificas?
                            </option>
                            <option>Masculino</option>
                            <option>Femenino</option>
                            <option>Otro</option>
                        </select>
                    </div>
                    <div className="Botones">
                    {paso > 1 && <button onClick={anteriorPaso} className="regresar">Regresar</button>}
                    {paso <= 3 && <button onClick={siguientePaso} className="continuar">Continuar</button>}
                    </div>
                </div>
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
                <p className="instruccion">Por favor ingresa toda tu info.</p>
                {pasosDeRegistro()}
            </div>

            <div className="cambio-login">
                <h2 className="Titulo2">¿YA TIENES UNA CUENTA?</h2>
                <p> 
                    Si ya has hecho este proceso antes, muy probablemente ya tienes una
                    cuenta, haz click en el siguiente botón para iniciar sesión.
                </p>
                <button className="iniciar-sesion">Iniciar Sesión</button>
            </div>
            <div className="container_logo2">
                <span className="vertical-text2">Ladrillo</span>
                <span className="horizontal-text2">Ladrillo A</span>
            </div>

        </div>
    );
};
