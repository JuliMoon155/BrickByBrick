import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import "../styles/PublicarMaterial.css";

export default function FormularioPublicacionMateriales({ material, onCambioMaterial , usuario }) {
  const referenciaInputArchivo = useRef(null);
  console.log(usuario+" El supuesto usuario");
  const manejarCambioCampo = (e) => {
    onCambioMaterial({ ...material, [e.target.name]: e.target.value });
  };

  const manejarCargaImagen = (e) => {
    if (e.target.files && e.target.files[0]) {
      const archivo = e.target.files[0]; // Obtener el archivo original
      const nuevaImagen = {
        url: URL.createObjectURL(archivo), // Guardar la URL para la vista previa
        file: archivo // Guardar el archivo para la subida al servidor
      };
      onCambioMaterial({ ...material, imagenes: [...material.imagenes, nuevaImagen] });
    }
  };

  const eliminarImagen = (indice) => {
    onCambioMaterial({
      ...material,
      imagenes: material.imagenes.filter((_, i) => i !== indice)
    });
  };

  return (
    <div className="formulario-publicacion">
      <h2 className="titulo-formulario">Publicación de contenido</h2>
      <div className="informacion-autor">
        <img src="/placeholder.svg?height=40&width=40" alt="Avatar" className="avatar-autor" />
        <span>{usuario}</span>
      </div>
      <div className="seccion-carga-fotos">
        <p className="contador-fotos">Fotos {material.imagenes.length}/10. Usted puede agregar un máximo de 10 fotos</p>
        <div className="contenedor-imagenes">
          {material.imagenes.map((img, indice) => (
            <div key={indice} className="preview-imagen">
              <img src={img.url} alt={`Vista previa ${indice + 1}`} /> {/* Usar img.url para la previsualización */}
              <button className="boton-eliminar-imagen" onClick={() => eliminarImagen(indice)}>
                <X size={16} />
              </button>
            </div>
          ))}
          {material.imagenes.length < 10 && (
            <label className="placeholder-imagen">
              <Upload size={24} />
              <input
                type="file"
                accept="image/*"
                onChange={manejarCargaImagen}
                ref={referenciaInputArchivo}
                className="input-archivo-oculto"
              />
            </label>
          )}
        </div>
      </div>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        className="campo-entrada"
        value={material.titulo}
        onChange={manejarCambioCampo}
      />
      <input
        type="text"
        name="cantidad"
        placeholder="Cantidad"
        className="campo-entrada"
        value={material.cantidad}
        onChange={manejarCambioCampo}
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        className="campo-entrada campo-descripcion"
        value={material.descripcion}
        onChange={manejarCambioCampo}
      ></textarea>
      <div className="contenedor-botones">
        <button className="boton boton-primario">Otro material</button>
        <button className="boton boton-secundario">Eliminar material</button>
      </div>
    </div>
  );
}
