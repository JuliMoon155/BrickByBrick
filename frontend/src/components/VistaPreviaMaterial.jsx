import '../styles/VisualizarMaterial.module.css';
import '../styles/HeaderPrincipal.css';
import '../styles/detalleMatConst.module.css';
//import 
import PropTypes, { func } from "prop-types";
//import Popup from 'reactjs-popup';

function VistaPreviaMaterial({ material }) {
    let inscripcion = () => {
         alert("Te has inscrito al evento;)");
     };

    return (
        <div className="contenedor-vista-previa">
            <img src={material.urlFoto} alt="foto"/>    
            <div className="contenedor-vista-previa-informacion">
                <h2 className="titulo-material">{material.titulo}</h2>  
                {/* <p>{material.de scripcion}</p> */}
                <Popup className='elPopUp'
                trigger={open => (
                <button className='botondelPopUp'>VER DETALLES</button>)}
                position="right center"
                closeOnDocumentClick>
                    <div className="material">
                      <div className="info">
                        <div className="title">
                          <h1 className='h1tit'>{material.titulo}</h1>
                        </div>
                        <div className="cant">
                          <p className="cantp">Cantidad:<br />70KG</p>
                        </div>
                        <div className="status">
                          <p className="statusp">Estado:<br />Re bueno</p>
                        </div>
                        <div className="description">
                          <p className="descriptionp">Descripción:<br />{material.descripcion}</p>
                        </div>
                        <div className="btn-detalle-material">
                          <center><button className="detalle-material-btn" onClick={inscripcion}>Inscribirse al evento</button>
                          </center>
                        </div>
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