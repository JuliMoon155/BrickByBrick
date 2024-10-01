import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "../styles/PublicarMaterial.css";

export default function VistaPreviewMateriales({ material }) {
  const [indiceImagenActual, setIndiceImagenActual] = useState(0);
  const idEmpresa = 1; // ID local del empresario, por ahora estático

  const siguienteImagen = () => {
    setIndiceImagenActual((indiceAnterior) => (indiceAnterior + 1) % material.imagenes.length);
  };

  const obtenerUsuarios = async () => {
    try {
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
          empresaId: idEmpresa, // Incluimos el ID del empresario
        }),
      });

      if (!responseMaterial.ok) {
        throw new Error('Error al crear la publicación');
      }

      const materialCreado = await responseMaterial.json();
      const idMaterial = materialCreado.id_material; // Obtener el ID del material creado
      console.log(materialCreado);
      console.log(material.imagenes);
      console.log(material.imagenes.length);
      for (const imagenObj of material.imagenes) {
        const formData = new FormData();

        // Acceder al archivo original en lugar de la URL
        const archivoImagen = imagenObj.file; // Aquí 'file' será el archivo real

        if (archivoImagen instanceof File) {
          formData.append('imagen', archivoImagen); // Añadir el archivo
          formData.append('idMaterial', idMaterial); // Añadir el ID del material

          console.log('Archivo:', archivoImagen);
          console.log('Tipo de Archivo:', archivoImagen instanceof File ? 'File' : 'Otro tipo');
          console.log('Nombre de Archivo:', archivoImagen.name || 'No tiene nombre');

          const responseImagen = await fetch(`http://localhost:5000/api/crearimagen`, {
            method: 'POST',
            body: formData,
          });

          if (!responseImagen.ok) {
            throw new Error('Fallo al subir la imagen');
          }
        } else {
          console.error('La imagen no es un archivo válido.');
        }
      }

      alert('Publicación creada con éxito!');
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      alert('Hubo un error al crear la publicación');
    }
  };

  const imagenAnterior = () => {
    setIndiceImagenActual((indiceAnterior) => (indiceAnterior - 1 + material.imagenes.length) % material.imagenes.length);
  };

  return (
    <div className="vista-previa-material">
      <div className="carrusel-imagenes">
        <img src={material.imagenes[indiceImagenActual]?.url} alt="Material" className="imagen-material" /> {/* Usar el url para la previsualización */}
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
