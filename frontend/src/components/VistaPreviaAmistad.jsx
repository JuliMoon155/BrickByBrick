import profileDefault from "../imgTemp/profileDefault.png";
import React from "react";
import PropTypes from "prop-types";
import {Amistad} from "./Amistad";

function VistaPreviaAmistad({ amistad, userId, setExtras }) {
    return (
        <div className='amistad' onClick={() => {
            setExtras(<Amistad amistad={amistad} userId={userId} setExtras={setExtras} />)
        }}>
            <img className="icon" src={profileDefault} alt="Imagen de perfil de amistad"/>
            <span className='usuario-amistad'>{amistad.nombre} (@{amistad.usuario})</span>
        </div>
    )
}

VistaPreviaAmistad.propTypes = {
    setExtras: PropTypes.func,
}

export {VistaPreviaAmistad};