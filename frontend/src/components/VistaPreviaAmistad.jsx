import profileDefault from "../imgTemp/profileDefault.png";
import React from "react";
import PropTypes from "prop-types";
import {Amistad} from "./Amistad";

function VistaPreviaAmistad({ setExtras }) {
    return (
        <div className='amistad' onClick={() => {
            setExtras(<Amistad setExtras={setExtras} />)
        }}>
            <img className="icon" src={profileDefault} alt="Imagen de perfil de amistad"/>
            <span className='usuario-amistad'>Nombre de usuario</span>
        </div>
    )
}

VistaPreviaAmistad.propTypes = {
    setExtras: PropTypes.func,
}

export {VistaPreviaAmistad};