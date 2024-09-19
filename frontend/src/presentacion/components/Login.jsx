import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className='contenedorPrincipal'>
      
      <div className="camino_registro">
      adios
      </div>

      <div className='login'>
        <div className="formulario">
        <h1>¡BIENVENIDO DE VUELTA!</h1>
        <div className="separador"></div>
        <p className="instruccion">Dinos quien eres.</p>
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
      </div>

    </div>
  )
}

export default Login