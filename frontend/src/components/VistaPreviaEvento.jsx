import '../styles/VistaPreviaEvento.module.css';
import '../styles/HeaderPrincipal.css';
import '../styles/detalleMatConst.module.css';
import {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {ChevronLeft, ChevronRight} from "lucide-react";

function VistaPreviaEvento({publicacion, empresa, materiales, idPublicacion, Inscript}) {
    const [materiales, setMateriales] = useState([]);
    const [materialActual, setMaterialActual] = useState(0);
    const [imagenActual, setImagenActual] = useState(0);

    useEffect(() => {
        const obtenerMateriales = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/materiales/${idPublicacion}`);
                if (!response.ok) throw new Error('Error al obtener los materiales');
                const data = await response.json();
                console.log("Datos recibidos del servidor:", data);
                setMateriales(data);
            } catch (error) {
                console.error("Error en el frontend:", error);
            }
        };

        obtenerMateriales();
    }, [idPublicacion]);

    const cambiarImagen = (direccion) => {
        const totalImagenes = materiales[materialActual].Imagenes.length;
        setImagenActual((prev) => (prev + direccion + totalImagenes) % totalImagenes);
    };

    const cambiarMaterial = (direccion) => {
        const totalMateriales = materiales.length;
        setMaterialActual((prev) => (prev + direccion + totalMateriales) % totalMateriales);
        setImagenActual(0); // Reset image index when changing material
    };

    if (materiales.length === 0) return <p>Cargando...</p>;

    const material = materiales[materialActual];
    const imagenBase64 = material.Imagenes[imagenActual];

    return (
        <div className="contenedor-vista-previa">
            <div className="material-info">
                {imagenBase64 && (
                    <img
                        src={`data:image/jpeg;base64,${imagenBase64}`}
                        alt={`${material.Nombre} imagen ${imagenActual + 1}`}
                        className="imagen-material"
                    />
                )}
                <div className="contenedor-vista-previa-informacion">
                    <h2 className="titulo-material">{material.Nombre}</h2>
                    <p className="descripcion-material">{material.Descripcion}</p>
                    <div className="detalles-material">
                        <p><strong>Cantidad:</strong> {material.Cantidad}</p>
                        <p><strong>Estado:</strong> {material.Estado_Material}</p>
                        <p><strong>Categoría:</strong> {material.Categoria}</p>
                    </div>

                    {material.Imagenes.length > 1 && (
                        <div className="navegacion-imagenes">
                            <button onClick={() => cambiarImagen(-1)}>
                                <ChevronLeft/>
                            </button>
                            <button onClick={() => cambiarImagen(1)}>
                                <ChevronRight/>
                            </button>
                        </div>
                    )}

                    {materiales.length > 1 && (
                        <div className="navegacion-materiales">
                            <button onClick={() => cambiarMaterial(-1)}>
                                Material Anterior
                            </button>
                            <button onClick={() => cambiarMaterial(1)}>
                                Material Siguiente
                            </button>
                        </div>
                    )}
                </div>
                <button className="boton" onClick={() => Inscript(idPublicacion)}>
                    Ir a Inscripción
                </button>
            </div>
        </div>
    );
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


