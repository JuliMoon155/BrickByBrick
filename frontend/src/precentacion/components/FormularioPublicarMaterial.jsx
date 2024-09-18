import React from "react";
import { ImagenAddPublicarMaterial } from "./ImagenAddPublicarMaterial";
import '../styles/FormularioPublicarMaterial.css';
import '../ImagenTemporal.jpg';
export const FormularioPublicarMaterial = () => {



    return (
        <div className="FormularioBad">
            <div className="Encabezado">
                <h1>Publica tus materiales</h1>
                <hr />
                <div className="Titulo-Usuario">
                    <img src="../ImagenTemporal.jpg" alt="Imagen" />
                    <h2>Usuario</h2>
                </div>
            </div>
            <hr />
            <p>Fotos x/10. Usted puede agregar un maciomo de 10 fotos</p>
            <ImagenAddPublicarMaterial />
            <div className="Form">
                <label htmlFor="NombreMaterial">Nombre del material.</label>
                <input type="text" name="NombreMaterial" id="NombreMaterial" placeholder="Nombre" />

                <label htmlFor="CantidadDispo">Cantidad Disponible.</label>
                <input type="text" name="CantidadDispo" id="CantidadDispo" placeholder="Cantidad" />

                <label htmlFor="Fecha">Fecha Limite de inscripcion.</label>
                <input type="text" name="Fecha" id="Fecha " placeholder="Fecha Limite" />

                <label htmlFor="Descripcion">Descripcion del material.</label>
                <textarea name="Descripcion" id="Descripcion" cols={30} rows={5}></textarea>
            </div>
            <div className="Botones">
                <button>Otro material</button>
                <button>Eliminar material</button>
            </div>
        </div>
    );
};
