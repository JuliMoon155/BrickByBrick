import React from 'react';
// import { fetchBeneficiarios } from '../Api/api.js';
import "../styles/Login.css";

export const Login = ({onRegistro}) => {
  return (
    <div className='Login'>
      <div className="container_logo">
                <span className="horizontal-text">A Ladrillo</span>
                <span className="vertical-text">Ladrillo</span>
            </div>

            <div className="cambio-registro">
                <h2 className="titulo_Log2">¿NO TIENES UNA CUENTA?</h2>
                <p className="instruccion_res"> 
                ¿No podemos encontrarte? De pronto no te has registrado aún, 
                no esperes más, haz click en el siguiente boton para registrate.
                </p>
                <button className="Registrate" onClick={onRegistro}>Registrarme</button>
            </div>

            <div className="formulario_Log">
                <h1 className="titulo_Log">¡BIENVENIDO DE VUELTA!</h1>
                <div className="divisor"></div>
                <p className="instruccion_Log">Dinos quién eres.</p>
                <div className="inputs_Log">
                    <input className="input_Log" type="text" placeholder="Ingresa tu usuario o email" />
                    <input className="input_Log" type="password" placeholder="¿Cuál es tu contraseña?" />
                </div>
                <div className="forgot-password">¿Olvidaste tu contraseña?</div>
                <button className="continuar_Log">Continuar</button>
            </div>

            <div className="container_logo2">
                <span className="vertical-text2">Ladrillo</span>
                <span className="horizontal-text2">Ladrillo A</span>
            </div>
    </div>
  )
}
