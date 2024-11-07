import '../styles/VistaPreviaEvento.module.css';
import '../styles/HeaderPrincipal.css';
import '../styles/detalleMatConst.module.css';
import {useState, useEffect} from 'react';
import Popup from "reactjs-popup"
import PropTypes from "prop-types";
import {ChevronLeft, ChevronRight} from "lucide-react";

function VistaPreviaEvento({publicacion, empresa, materiales, idPublicacion, Inscript}) {
    return (
        <div className="contenedor-vista-previa">
            <div className="material-info">
                <img
                    src={`https://picsum.photos/200/300?random=${publicacion.id}`}
                    alt={`Una imagen random`}
                    className="imagen-material"
                />
                <div className="contenedor-vista-previa-informacion">
                    <h2 className="titulo-material">{publicacion.titulo}</h2>
                    <p className="descripcion-material">{publicacion.descripcion}</p>
                    <Popup trigger={
                      <div className="detalles-material">
                      {materiales.map((material) =>
                          <>
                              <h2>Material {material.id}</h2>
                              <p><strong>Nombre:</strong> {material.nombre}</p>
                              <p><strong>Descripción:</strong> {material.descripcion}</p>
                              <p><strong>Cantidad:</strong> {material.cantidad}</p>
                              <p><strong>Estado:</strong> {material.estado}</p>
                              <p><strong>Categoría:</strong> {material.categoria}</p>
                          </>
                      )}
                  </div>
                    } position={"center center"}>

                    </Popup>

                    {/*{materiales[0].Imagenes.length > 1 && (*/}
                    {/*    <div className="navegacion-imagenes">*/}
                    {/*        <button onClick={() => cambiarImagen(-1)}>*/}
                    {/*            <ChevronLeft/>*/}
                    {/*        </button>*/}
                    {/*        <button onClick={() => cambiarImagen(1)}>*/}
                    {/*            <ChevronRight/>*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    {/*{materiales.length > 1 && (*/}
                    {/*    <div className="navegacion-materiales">*/}
                    {/*        <button onClick={() => cambiarMaterial(-1)}>*/}
                    {/*            Material Anterior*/}
                    {/*        </button>*/}
                    {/*        <button onClick={() => cambiarMaterial(1)}>*/}
                    {/*            Material Siguiente*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
                <button className="boton" onClick={() => Inscript(publicacion.id)}>
                    Ir a Inscripción
                </button>
            </div>
        </div>
    )
        ;
}

VistaPreviaEvento.propTypes = {
    publicacion: PropTypes.shape({
        descripcion: PropTypes.string,
        fecha_cierre: PropTypes.string,
        fecha_publicacion: PropTypes.string,
        id: PropTypes.number,
        titulo: PropTypes.string,
    }),
    empresa: PropTypes.shape({
        descripcion: PropTypes.string,
        id: PropTypes.number,
        nombre: PropTypes.string,
    }),
    materiales: PropTypes.arrayOf(PropTypes.shape({
        cantidad: PropTypes.number,
        categoria: PropTypes.string,
        descripcion: PropTypes.string,
        estado: PropTypes.string,
        id: PropTypes.number,
        nombre: PropTypes.string,
    })),
    idPublicacion: PropTypes.string.isRequired,
};

export default VistaPreviaEvento;


