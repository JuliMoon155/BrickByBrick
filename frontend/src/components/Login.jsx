
import React, { useState } from "react";
import "../styles/Login.css";

export const Login = ({ onRegistro, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ usuario: '', password: '' });
  const [endpoint, setEndpoint] = useState("http://localhost:5000/api/ObBeneficiarios");
  const [error, setError] = useState('');
  const [rol, setRol] = useState('Beneficiario');
  const [textoCambioRol, setTextoCambioRol] = useState('Para Empresas');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };
  
  const handelClickCambioRol = () =>{
    if (textoCambioRol === 'Para Empresas') {
      setRol('Empresario')
      setEndpoint("http://localhost:5000/api/ObEmpresas")
      setTextoCambioRol('Para Beneficiarios')
    }else if (textoCambioRol === 'Para Beneficiarios') {
      setRol('Beneficiario')
      setEndpoint("http://localhost:5000/api/ObBeneficiarios")
      setTextoCambioRol('Para Empresas')
    };
  };

  const obtenerUsuarios = async () => {
    if (!credentials.usuario || !credentials.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario: credentials.usuario }),
      });
      console.log(response);
      if (!response.ok) {
        alert("Error de autenticación");
      }

      const data = await response.json();
      console.log(data.password);
      console.log(credentials.password);
      if (credentials.usuario === data.usuario && credentials.password === data.password) {
        onLoginSuccess(data.id, rol, data.usuario, data);
      } else {
        alert("Usuario o contraseña incorrectos.");
      }

    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      setError("Hubo un problema al iniciar sesión. Intenta de nuevo más tarde.");
    }
  };

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
      <div className="CambioRol" onClick={handelClickCambioRol}>{textoCambioRol}</div>
      <div className="formulario_Log">
        <h1 className="titulo_Log">¡BIENVENIDO DE VUELTA!</h1>
        <div className="divisor"></div>
        <p className="instruccion_Log">Hola <span className="Idendidad">{rol}</span>, dinos quién eres.</p>

        {error && <div className="error-message">{error}</div>}

        <div className="inputs_Log">
          <input className="input_Log" type="text" name="usuario" placeholder="Ingresa tu usuario" value={credentials.usuario} onChange={handleChange} />
          <input className="input_Log" type="password" name="password" placeholder="¿Cuál es tu contraseña?" value={credentials.password} onChange={handleChange} />
        </div>
        <div className="forgot-password">¿Olvidaste tu contraseña?</div>
        <button className="continuar_Log" onClick={obtenerUsuarios}>Continuar</button>
      </div>

      <div className="container_logo2">
        <span className="vertical-text2">Ladrillo</span>
        <span className="horizontal-text2">Ladrillo A</span>
      </div>
    </div>
  );
};
