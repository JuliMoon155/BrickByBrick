import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "../styles/PublicarMaterial.css";

export default function VistaPreviewMateriales({ material }) {
  const [indiceImagenActual, setIndiceImagenActual] = useState(0);

  const siguienteImagen = () => {
    setIndiceImagenActual((indiceAnterior) => (indiceAnterior + 1) % material.imagenes.length);
  };

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/usuarioscon");
      const data = await response.json();
      console.log(data);
      data.forEach(usuario => {
        console.log(`ID: ${usuario.id}, Nombre: ${usuario.nombre}, Email: ${usuario.email}`);
      });

    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const imagenAnterior = () => {
    setIndiceImagenActual((indiceAnterior) => (indiceAnterior - 1 + material.imagenes.length) % material.imagenes.length);
  };

  return (
    <div className="vista-previa-material">
      <div className="carrusel-imagenes">
        <img src={material.imagenes[indiceImagenActual]} alt="Material" className="imagen-material" />
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
      <button className="boton-crear-publicacion" onClick={obtenerUsuarios}>Crear Publicación</button>
    </div>
  );
}