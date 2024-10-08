import React, { useState } from "react";
import FormularioPublicacionMateriales from "./FormularioPrecentacionMateriales";
import VistaPreviewMateriales from "./PreViewPublicacionMateriales";
import { ChevronUp, ChevronDown } from 'lucide-react';
import "../styles/PublicarMaterial.css";
import { Header } from './Header';

export const PublicacionMateriales = ({ userId, usuario }) => {
  // Estado para la lista de materiales y el índice del material seleccionado
  const [materiales, setMateriales] = useState([{
    titulo: "",
    cantidad: "",
    descripcion: "",
    imagenes: [],
  }]);

  const [indiceMaterialSeleccionado, setIndiceMaterialSeleccionado] = useState(0);

  const manejarCambioMaterial = (materialActualizado) => {
    const nuevosMateriales = [...materiales];
    nuevosMateriales[indiceMaterialSeleccionado] = materialActualizado;
    setMateriales(nuevosMateriales);
  };

  const crearNuevoMaterial = () => {
    const nuevoMaterial = {
      titulo: "",
      cantidad: "",
      descripcion: "",
      imagenes: [],
    };
    setMateriales([...materiales, nuevoMaterial]);
    setIndiceMaterialSeleccionado(materiales.length); // Selecciona el nuevo material
  };

  const eliminarMaterial = () => {
    if (materiales.length > 1) {
      const nuevosMateriales = materiales.filter((_, index) => index !== indiceMaterialSeleccionado);
      setMateriales(nuevosMateriales);
      setIndiceMaterialSeleccionado(Math.max(indiceMaterialSeleccionado - 1, 0)); // Ajusta el índice
    }
  };

  const seleccionarMaterialAnterior = () => {
    setIndiceMaterialSeleccionado((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const seleccionarMaterialSiguiente = () => {
    setIndiceMaterialSeleccionado((prevIndex) => Math.min(prevIndex + 1, materiales.length - 1));
  };

  const crearPublicacion = async () => {
    try {
      // Solicitar la descripción al usuario mediante un popup
      const descripcionPublicacion = prompt("Por favor, ingrese la descripción de la publicación:");
      if (!descripcionPublicacion || descripcionPublicacion.trim() === "") {
        alert("La descripción no puede estar vacía.");
        return;
      }

      const userId = 1; // Cambia esto según sea necesario
      // 1. Crear la publicación principal
      const responsePublicacion = await fetch('http://localhost:5000/api/crearpublicacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId, // Usuario que crea la publicación
          descripcion: descripcionPublicacion, // Enviar la descripción capturada desde el popup
        }),
      });

      if (!responsePublicacion.ok) {
        throw new Error('Error al crear la publicación');
      }

      const publicacionCreada = await responsePublicacion.json();
      const id_publicacion = publicacionCreada.id_publicacion;

      // 2. Crear los materiales asociados
      for (const material of materiales) {
        const responseMaterial = await fetch('http://localhost:5000/api/crearMaterial', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_publicacion,
            titulo: material.titulo,
            cantidad: material.cantidad,
            descripcion: material.descripcion,
            categoria: material.categoria,
          }),
        });

        if (!responseMaterial.ok) {
          throw new Error('Error al crear el material');
        }

        const materialCreado = await responseMaterial.json();
        const idMaterial = materialCreado.id_material;

        // 3. Subir las imágenes del material
        for (const imagen of material.imagenes) {
          const formData = new FormData();
          const archivoImagen = imagen.file;

          if (archivoImagen instanceof File) {
            formData.append('imagen', archivoImagen);
            formData.append('idMaterial', idMaterial);

            const responseImagen = await fetch('http://localhost:5000/api/crearimagen', {
              method: 'POST',
              body: formData,
            });

            if (!responseImagen.ok) {
              throw new Error('Fallo al subir la imagen');
            }
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
    <>
      <Header />
      <div className="contenedor-publicacion">
        <div className="contenido-publicacion">
          {/* Formulario Section */}
          <div className="seccion-formulario">
            <FormularioPublicacionMateriales
              material={materiales[indiceMaterialSeleccionado]}
              onCambioMaterial={manejarCambioMaterial}
              usuario={usuario}
            />
            <button className="boton-primario" onClick={crearNuevoMaterial}>
              Añadir Nuevo Material
            </button>
            {materiales.length > 1 && (
              <button className="boton-secundario" onClick={eliminarMaterial}>
                Eliminar Material
              </button>
            )}
          </div>

          {/* Vista Previa Section */}
          <div className="seccion-vista-previa">
            <div className="vista-previa-material">
              <button
                className="boton-navegacion arriba"
                onClick={seleccionarMaterialAnterior}
                disabled={indiceMaterialSeleccionado === 0}
              >
                <ChevronUp className="icono-navegacion" />
              </button>

              <VistaPreviewMateriales material={materiales[indiceMaterialSeleccionado]} userId={userId} />

              <button
                className="boton-navegacion abajo"
                onClick={seleccionarMaterialSiguiente}
                disabled={indiceMaterialSeleccionado === materiales.length - 1}
              >
                <ChevronDown className="icono-navegacion" />
              </button>
            </div>
          </div>
        </div>

        {/* Botón único para crear la publicación completa */}
        <div className="seccion-boton-publicacion">
          <button className="boton-crear-publicacion" onClick={crearPublicacion}>
            Crear Publicación
          </button>
        </div>
      </div>
    </>
  );
};
