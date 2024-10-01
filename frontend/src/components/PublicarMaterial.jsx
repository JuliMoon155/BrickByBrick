import React, { useState } from "react";
import FormularioPublicacionMateriales from "./FormularioPrecentacionMateriales";
import VistaPreviewMateriales from "./PreViewPublicacionMateriales";
import "../styles/PublicarMaterial.css";

export const PublicacionMateriales = () => {
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
    <div className="contenedor-publicacion">
      <div className="contenido-publicacion">
        <div className="seccion-formulario">
          <FormularioPublicacionMateriales
            material={material}
            onCambioMaterial={manejarCambioMaterial}
          />
        </div>
        <div className="seccion-vista-previa">
          <VistaPreviewMateriales material={material} />
        </div>
      </div>
    </div>
  );
}