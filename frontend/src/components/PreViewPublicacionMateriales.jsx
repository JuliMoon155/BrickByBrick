import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "../styles/PublicarMaterial.css";

export default function VistaPreviewMateriales({ material }) {
  const [indiceImagenActual, setIndiceImagenActual] = useState(0);

  const siguienteImagen = () => {
    setIndiceImagenActual((indiceAnterior) => (indiceAnterior + 1) % material.imagenes.length);
  };

  const imagenAnterior = () => {
    setIndiceImagenActual((indiceAnterior) => (indiceAnterior - 1 + material.imagenes.length) % material.imagenes.length);
  };

  const validarCampos = () => {
    if (!material.titulo || material.titulo.trim() === "") {
      alert("Por favor ingresa un título.");
      return false;
    }
    if (!material.cantidad || isNaN(material.cantidad) || Number(material.cantidad) <= 0) {
      alert("Por favor ingresa una cantidad válida.");
      return false;
    }
    if (!material.descripcion || material.descripcion.trim() === "") {
      alert("Por favor ingresa una descripción.");
      return false;
    }
    if (material.imagenes.length === 0) {
      alert("Por favor sube al menos una imagen.");
      return false;
    }
    return true;
  };

  const obtenerUsuarios = async () => {
    if (!validarCampos()) {
      return; // Si la validación falla, no se sigue con la creación de la publicación
    }

    try {
      const userId = 1; // ID del usuario (esto puede cambiar dependiendo de cómo lo manejes)
      // 1. Crear la publicación del material
      const responseMaterial = await fetch('http://localhost:5000/api/crearpublicacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: material.titulo,
          cantidad: material.cantidad,
          descripcion: material.descripcion,
          empresaId: userId,
        }),
      });

      if (!responseMaterial.ok) {
        throw new Error('Error al crear la publicación');
      }

      const materialCreado = await responseMaterial.json();
      const idMaterial = materialCreado.id_material; // Obtener el ID del material creado

      // Subir las imágenes asociadas al material
      for (const imagenObj of material.imagenes) {
        const formData = new FormData();
        const archivoImagen = imagenObj.file;

        if (archivoImagen instanceof File) {
          formData.append('imagen', archivoImagen);
          formData.append('idMaterial', idMaterial);

          const responseImagen = await fetch(`http://localhost:5000/api/crearimagen`, {
            method: 'POST',
            body: formData,
          });

          if (!responseImagen.ok) {
            throw new Error('Fallo al subir la imagen');
          }
        }
      }

      alert('Publicación creada con éxito!');
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      alert('Hubo un error al crear la publicación');
    }
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
      <button className="boton-crear-publicacion" onClick={obtenerUsuarios}>Crear Publicación</button>
    </div>
  );
}
