import '../styles/VistaPreviaEvento.css';
import '../styles/HeaderPrincipal.css';
import '../styles/detalleMatConst.module.css';
import {useState, useEffect} from 'react';
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import {ChevronLeft, ChevronRight} from "lucide-react";

function VistaPreviaEvento({publicacion, empresa, materiales, idPublicacion, Inscript}) {
  const [materialActual, setMaterialActual] = useState(0); // Index of the current material

  // function elPopup(){
  //     // {materiales.map((material) =>
  //     <div className="detalles-material">
  //       <h2>Material {materiales}</h2>
  //       <p><strong>Nombre:</strong> {materiales.nombre}</p>
  //       <p><strong>Descripción:</strong> {materiales.descripcion}</p>
  //       <p><strong>Cantidad:</strong> {materiales.cantidad}</p>
  //       <p><strong>Estado:</strong> {materiales.estado}</p>
  //       <p><strong>Categoría:</strong> {materiales.categoria}</p>
  //       <button className="boton" onClick={() => Inscript(publicacion.id)}>Ir a Inscripción</button>      
  //   </div>
  //     // )}
  // }  

  const cambiarMaterial = (direccion) => {
    const totalMateriales = materiales.length;
    setMaterialActual((prev) => (prev + direccion + totalMateriales) % totalMateriales);
  };

  const material = materiales[materialActual];

  return (
        <div className="contenedor-vista-previa">
            <div className="material-info"> 
                <img
                    src={`https://picsum.photos/200/300?random=${publicacion.id}`}
                    alt={`Una imagen random`}
                    className="imagen-material"
                />
                    <h2 className="titulo-material">{publicacion.titulo}</h2>
                    <p className="descripcion-material">{publicacion.descripcion}</p>
                    <Popup trigger={<button className='detalle-material-btn'>Mostrar Detalles</button>} position="right center">
                      <div className="detalles-material">
                        <h2>Material {material.id}</h2>
                        <h3 className='nombreMat'>Nombre: </h3> <p>{material.nombre}</p>
                        <h3 className='descriMat'>Descripción: </h3> <p>{material.descripcion}</p>
                        <h3 className='cantMat'>Cantidad: </h3> <p>{material.cantidad}</p>
                        <h3 className='estadoMat'>Estado: </h3> <p>{material.estado}</p>
                        <h3 className='catMat'>Categoría: </h3> <p>{material.categoria}</p>
                        <center><button className="boton" onClick={() => Inscript(publicacion.id)}>Ir a Inscripción</button></center>     
                        {materiales.length > 1 && (
                        <div className="navegacion-materiales">
                          <button onClick={() => cambiarMaterial(-1)}>
                            Previo
                          </button>
                          <button onClick={() => cambiarMaterial(1)}>
                            Siguiente
                          </button>
                        </div>
                      )}
                      </div>  
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


