import React from "react";
import profileDefault from '../imgTemp/profileDefault.png';
import "../styles/ItemNotiConst.css";

const ItemNotiConst = ({
  nombreConstructora,
  fechaCreacionRegistro,
  nombreCompletoBeneficiarioRegistrado,
  tituloPublicacion,
  celularBeneficiario,
  correoBeneficiario,
}) => {
  return (
    <div className="notificacion-item">
      <div className="notificacion-circulo"><img src={profileDefault} alt="Imagen de perfil" className='fotoPerfilNoti' /></div>
      <div className="notificacion-contenido">
        <h3 className="saludo">
          <center>¡Hola! {nombreConstructora}</center>
        </h3>
        <p><center>{fechaCreacionRegistro}</center></p>
        <p>
          {nombreCompletoBeneficiarioRegistrado} se acaba de registrar a tu evento{" "}
          <b>{tituloPublicacion}</b> con los siguientes datos:
        </p>
        <ul>
        <li><p>Celular: {celularBeneficiario}</p></li>
        <li><p>Correo: {correoBeneficiario}</p></li>
        </ul>
      </div>
    </div>
  );
};

export default ItemNotiConst;