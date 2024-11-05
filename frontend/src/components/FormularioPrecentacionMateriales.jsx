import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import "../styles/PublicarMaterial.css";

export default function FormularioPublicacionMateriales({ material, onCambioMaterial, usuario }) {
  const referenciaInputArchivo = useRef(null);

  const manejarCambioCampo = (e) => {
    onCambioMaterial({ ...material, [e.target.name]: e.target.value });
  };

  const manejarCargaImagen = (e) => {
    if (e.target.files && e.target.files[0]) {
      const archivo = e.target.files[0];
      const nuevaImagen = {
        url: URL.createObjectURL(archivo),
        file: archivo
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
              <img src={img.url} alt={`Vista previa ${indice + 1}`} />
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

      {/* Dropdown for Category */}
      <select
        name="categoria"
        className="campo-entrada"
        value={material.categoria}
        onChange={manejarCambioCampo}
      >
        <option value="">Seleccione una categoría</option>
        <option value="aglomerantes">Aglomerantes</option>
        <option value="aglomerados">Aglomerados</option>
        <option value="metálicos">Metálicos</option>
        <option value="orgánicos">Orgánicos</option>
      </select>
    </div>
  );
}
