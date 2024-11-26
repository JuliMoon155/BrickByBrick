import React, { useState } from 'react';
import "../styles/Header.css";
import PropTypes from "prop-types";
import NotificacionesConst from './NotificacionesConst';

<<<<<<< HEAD
export const Header = ({ esEmpresa, cambiarInterfaz, activa = 1 }) => {

=======
export const Header = ({ esEmpresa = false, cambiarInterfaz, activa = 1, usuarioId }) => {
>>>>>>> a8b8fdbc3c10e5a0deec105f0a82eb7fc95e5d34
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
<<<<<<< HEAD

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
                    <li
                        className={paso === 2 ? "elementoSel" : "elemento"}
                        onClick={() => {
                            setPaso(4);
                            if (esEmpresa) {
                                cambiarInterfaz("NotiEmpresas");
                            } else {
                                
                            }
                        }}
                    >
                        <a href="#">Mensajes</a>
                    </li>
                    <li className={paso === 5 ? 'elementoSel' : 'elemento'} onClick={() => { setPaso(5) }}><a href="#">Notificaciones</a></li>
                    {esEmpresa && (<li className={paso === 6 ? 'elementoSel' : 'elemento'} onClick={() => {
                        setPaso(6);
                        cambiarInterfaz('GestionEventos');
                    }}><a
                        href="#">Eventos</a></li>)}
                </ul>
            </nav>
=======
                    <li className={paso === 2 ? 'elementoSel' : 'elemento'} onClick={() => { setPaso(2) }}><a href="#">Calendario</a></li>
                    <li className={paso === 3 ? 'elementoSel' : 'elemento'} onClick={() => { setPaso(3) }}><a href="#">Comunidad</a></li>
                    <li className={paso === 4 ? 'elementoSel' : 'elemento'} onClick={() => { setPaso(4) }}><a href="#">Mensajes</a></li>
                        <li className={paso === 5 ? 'elementoSel' : 'elemento'} onClick={() => {
                            setPaso(5);
                            setMostrarNotificaciones(true);
                        }}><a href="#">Notificaciones</a></li>
                    {esEmpresa && (<li className={paso === 6 ? 'elementoSel' : 'elemento'} onClick={() => {
                        setPaso(6);
                        cambiarInterfaz('GestionEventos');
                    }}><a href="#">Eventos</a></li>)}
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
>>>>>>> a8b8fdbc3c10e5a0deec105f0a82eb7fc95e5d34
        </div>
    );
};

Header.propTypes = {
    esEmpresa: PropTypes.bool,
    cambiarInterfaz: PropTypes.func
};
