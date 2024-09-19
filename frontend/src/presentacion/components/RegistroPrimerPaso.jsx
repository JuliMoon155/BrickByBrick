import React from "react";
import "../styles/Registro.css";

export const RegistroPrimerPaso = () => {
    return (
        <div className="registro">
            <div class="container_logo">
                <span class="horizontal-text">A Ladrillo</span>
                <span class="vertical-text">Ladrillo</span>
            </div>
            <div className="formulario">
                <h1>¡REGISTRATE!</h1>
                <div className="indicador-paso">
                    <div className="rect-acti"></div>
                    <div className="rect-inac"></div>
                    <div className="rect-inac"></div>
                </div>
                <p className="instruccion">Por favor ingresa toda tu info.</p>
                <div className="inputs">
                    <input className="input" type="text" placeholder="¿Cual es tu nombre?" />
                    <input className="input" type="text" placeholder="¿Cual es tu apellido?" />
                    <input className="input" type="text" placeholder="¿Qué edad tienes?" />
                    <div className="ComboBox">
                        <select defaultValue="">
                            <option value="" disabled>
                                ¿Como te identificas?
                            </option>
                            <option>Masculino</option>
                            <option>Femenino</option>
                            <option>Batman, yo soy Batman</option>
                        </select>
                    </div>
                </div>
                <button className="continuar">Continuar</button>
            </div>

            <div className="cambio-login">
                <h2>¿YA TIENES UNA CUENTA?</h2>
                <p>
                    Si ya has hecho este proceso antes, muy probablemente ya tienes una
                    cuenta, haz click en el siguiente botón para iniciar sesión.
                </p>
                <button className="iniciar-sesion">Iniciar Sesión</button>
            </div>
            <div class="container_logo">
                <span class="horizontal-text">A Ladrillo</span>
                <span class="vertical-text">Ladrillo</span>
            </div>
        </div>
    );
};
