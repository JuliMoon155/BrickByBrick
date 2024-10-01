import '../styles/VisualizarMaterial.css';
import '../styles/HeaderPrincipal.css';
import '../styles/detalleMatConst.css';
//import 
import PropTypes, { func } from "prop-types";
import Popup from 'reactjs-popup';

function VistaPreviaMaterial({ material }) {
    // let vistaPrevMat = () => {
    //     console.log("Si entra a la function");
    // };

    return (
        <div className="contenedor-vista-previa">
            <img src={material.urlFoto} alt="foto"/>    
            <div className="contenedor-vista-previa-informacion">
                <h2 className="titulo-material">{material.titulo}</h2>  
                {/* <p>{material.de scripcion}</p> */}
                <Popup
                trigger={open => (
                <button className='botondelPopUp'>VER DETALLES</button>)}
                position="right center"
                closeOnDocumentClick>
                    <div className="container-popup">
                        <div className="material">
                          <div className="info">
                            <div className="title">
                              <h1>NOMBRE DEL MATERIAL</h1>
                            </div>
                            <div className="cant">
                              <p>Cantidad:<br />70KG</p>
                            </div>
                            <div className="status">
                              <p>Estado:<br />Re bueno</p>
                            </div>
                            <div className="description">
                              <p>Descripción:<br />{material.descripcion}</p>
                            </div>
                            <div className="btn-detalle-material">
                              <center><button className="detalle-material-btn">Inscribirse al evento</button>
                              </center>
                            </div>
                          </div>
                          {/* <div className="image">
                            <center><img src= {material.urlFoto} /></center>
                          </div> */}
                        </div>
                    </div>
                </Popup>
            </div>
        </div>
    );
}

VistaPreviaMaterial.propTypes = {
    material: PropTypes.shape({
        urlFoto: PropTypes.string,
        titulo: PropTypes.string,
        descripcion: PropTypes.string,
        cantidad: PropTypes.string,
        estado: PropTypes.string,
    }),
    onClick: PropTypes.func,
}

export default VistaPreviaMaterial;