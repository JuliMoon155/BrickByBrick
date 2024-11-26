import React, { useState } from 'react';
import "../styles/Header.css";
import PropTypes from "prop-types";
import NotificacionesConst from './NotificacionesConst';

export const Header = ({ esEmpresa = false, cambiarInterfaz, activa = 1, usuarioId }) => {
    const [paso, setPaso] = useState(activa);
    const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);

    return (
        <div className='Encabezado'>
            <nav className='Header'>
                <ul className='navegador'>
                    <li className={paso === 1 ? 'elementoSel' : 'elemento'} onClick={() => {
                        setPaso(1);
                        if (esEmpresa) {
                            cambiarInterfaz('PublicacionMateriales');
                        } else {
                            cambiarInterfaz('HomePage');
                        }
                    }}><a href="#">Inicio</a></li>

                    <li
                        className={paso === 2 ? "elementoSel" : "elemento"}
                        onClick={() => {
                            setPaso(2);
                            if (esEmpresa) {
                            } else {
                                cambiarInterfaz("CalendarioEventoUsr");
                            }
                        }}
                    >
                        <a href="#">Calendario</a>
                    </li>
                    <li className={paso === 3 ? 'elementoSel' : 'elemento'} onClick={() => { setPaso(3) }}><a href="#">Comunidad</a></li>
                    <li className={paso === 4 ? 'elementoSel' : 'elemento'} onClick={() => { setPaso(4) }}><a href="#">Mensajes</a></li>
                    <li
                        className={paso === 5 ? "elementoSel" : "elemento"}
                        onClick={() => {
                            setPaso(5);
                            if (esEmpresa) {
                                <NotificacionesConst activar={true} empresaId={usuarioId} />
                                setMostrarNotificaciones(true);
                            } else {
                                //cuado sea False hara esto pero es apra usuarios no empresas pero toca configurar lo
                                <NotificacionesConst activar={true} empresaId={usuarioId} /> 
                                setMostrarNotificaciones(true);
                            }
                        }}
                    >
                        <a href="#">Notificaciones</a>
                    </li>
                    {esEmpresa && (<li className={paso === 6 ? 'elementoSel' : 'elemento'} onClick={() => {
                        setPaso(6);
                        cambiarInterfaz('GestionEventos');
                    }}><a
                        href="#">Eventos</a></li>)}
                </ul>
            </nav>
            {/* Popup de Notificaciones para Constructoras */}
            {mostrarNotificaciones && (
                <NotificacionesConst
                    activar={mostrarNotificaciones}
                    cerrarPopup={() => setMostrarNotificaciones(false)}
                    empresaId={usuarioId}
                />
            )}
        </div>
    );
};

Header.propTypes = {
    esEmpresa: PropTypes.bool,
    cambiarInterfaz: PropTypes.func
};
