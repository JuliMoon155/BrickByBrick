import React, { useState } from "react";
import FormularioPublicacionMateriales from "./FormularioPrecentacionMateriales";
import VistaPreviewMateriales from "./PreViewPublicacionMateriales";
import "../styles/PublicarMaterial.css";
import { Header } from './Header';

export const PublicacionMateriales = ({ userId, usuario }) => {
  const [material, setMaterial] = useState({
    titulo: "",
    cantidad: "",
    descripcion:
      "",
    imagenes: [""],
  });

  const manejarCambioMaterial = (materialActualizado) => {
    setMaterial(materialActualizado);
  };

  return (
    <>
      <Header />
      <div className="contenedor-publicacion">
        <div className="contenido-publicacion">
          <div className="seccion-formulario">
            <FormularioPublicacionMateriales
              material={material}
              onCambioMaterial={manejarCambioMaterial}
              usuario={usuario}
            />
          </div>
          <div className="seccion-vista-previa">
            <VistaPreviewMateriales material={material} userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
}