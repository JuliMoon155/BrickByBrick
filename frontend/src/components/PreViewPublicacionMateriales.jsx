import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export default function VistaPreviewMateriales({ material }) {
  const [indiceImagenActual, setIndiceImagenActual] = useState(0);

  const siguienteImagen = () => {
    setIndiceImagenActual((indiceAnterior) => (indiceAnterior + 1) % material.imagenes.length);
  };

  const imagenAnterior = () => {
    setIndiceImagenActual((indiceAnterior) => (indiceAnterior - 1 + material.imagenes.length) % material.imagenes.length);
  };

  return (
    <div className="vista-previa-material">
      <div className="carrusel-imagenes">
        <img src={material.imagenes[indiceImagenActual]?.url} alt="Material" className="imagen-material" />
        <button className="boton-navegacion izquierda" onClick={imagenAnterior}>
          <ChevronLeft className="icono-navegacion" />
        </button>
        <button className="boton-navegacion derecha" onClick={siguienteImagen}>
          <ChevronRight className="icono-navegacion" />
        </button>
      </div>
      <h2 className="titulo-material">{material.titulo}</h2>
      <p className="descripcion-material">{material.descripcion}</p>
      <p className="cantidad-material"><strong>Cantidad:</strong> {material.cantidad}</p>
      <p className="categoria-material"><strong>Categoría:</strong> {material.categoria}</p>
      {/* <button className="boton-crear-publicacion">Crear Publicación</button> */}
    </div>
  );
}
