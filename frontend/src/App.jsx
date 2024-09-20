import { Registro } from './components/Registro';
import { Login } from './components/Login';
import React, { useState } from 'react';

function App() {
  const [interfaz, setInterfaz] = useState('Registro');

  const cambiarInterfaz= (nuevaInterfaz) =>{
    setInterfaz(nuevaInterfaz);
  };

  return (
    <>
    {interfaz==='Login'&&(<Login onRegistro={() => cambiarInterfaz('Registro')}/>
    )}
    {interfaz==='Registro'&&(<Registro onLogin={() => cambiarInterfaz('Login')}/>
    )}
    </>
    //  <Registro/>
    // <Login />
  );
};

export default App;
