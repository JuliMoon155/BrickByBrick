import styles from "../styles/GestionEventos.module.css"

import React, {useEffect, useState} from "react";
import {Header} from "./Header";

export function GestionEventos({idEmpresa, cambiarInterfaz}) {
    let [eventos, setEventos] = useState([]);
    let [popup, setPopup] = useState(<></>);

    const buscarEventos = async () => {
        const respuestaBusqueda = await fetch("http://localhost:5000/api/ObPublicacionesDeEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "idEmpresa": idEmpresa,
            })
        });
        if (!respuestaBusqueda.ok) {
            throw new Error('Error al buscar materiales por donar');
        }
        return await respuestaBusqueda.json();
    }

    const guardarCambiosEvento = async (publicacion, materiales) => {
        const respuestaEdicionPublicacion = await fetch("http://localhost:5000/api/editarPublicacionDonacion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "idPublicacion": publicacion.id,
                "titulo": publicacion.titulo,
                "descripcion": publicacion.descripcion,
                "fechaCierre": publicacion.fecha_cierre,
                "estado": Date() < publicacion.fecha_cierre ? "Activo" : "Inactivo"
            })
        });
        if (!respuestaEdicionPublicacion.ok) {
            throw new Error("Error al editar datos de publicación con id:" + publicacion.id);
        }
        for (const [idMaterial, material] of Object.entries(materiales)) {
            const respuestaEdicionMaterial = await fetch("http://localhost:5000/api/editarMaterial", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "idMaterial": idMaterial,
                    "nombre": material.nombre,
                    "descripcion": material.descripcion,
                    "categoria": material.categoria,
                    "cantidad": material.cantidad,
                    "estado": material.estado
                })
            });
            if (!respuestaEdicionMaterial.ok) {
                throw new Error("Error al editar datos de material con id:" + idMaterial);
            }
        }
    }

    const handleChangeTituloPublicacion = (event, publicacion) => {
        console.log(event.target.value);
        publicacion.titulo = event.target.value;
    }

    const handleChangeDescripcionPublicacion = (event, publicacion) => {
        console.log(event.target.value);
        publicacion.descripcion = event.target.value;
    }

    const handleChangeFechaCierrePublicacion = (event, publicacion) => {
        console.log(event.target.value);
        publicacion.fecha_cierre = event.target.value;
    }

    const handleChangeNombreMaterial = (event, materiales, idMaterial) => {
        console.log(event.target.value);
        materiales[idMaterial].nombre = event.target.value;
    }

    const handleChangeDescripcionMaterial = (event, materiales, idMaterial) => {
        console.log(event.target.value);
        materiales[idMaterial].descripcion = event.target.value;
    }

    const handleChangeCategoriaMaterial = (event, materiales, idMaterial) => {
        console.log(event.target.value);
        materiales[idMaterial].categoria = event.target.value;
    }

    const handleChangeCantidadMaterial = (event, materiales, idMaterial) => {
        console.log(event.target.value);
        materiales[idMaterial].cantidad = event.target.value;
    }

    const handleChangeEstadoMaterial = (event, materiales, idMaterial) => {
        console.log(event.target.value);
        materiales[idMaterial].estado = event.target.value;
    }

    const componentePopup = (publicacion, materiales) => {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <h2>Título</h2>
                    <input type="text" defaultValue={publicacion.titulo} onChange={(event) => {
                        handleChangeTituloPublicacion(event, publicacion);
                    }}/>
                    <h2>Descripción</h2>
                    <textarea cols="30" rows="10" defaultValue={publicacion.descripcion} onChange={(event) => {
                        handleChangeDescripcionPublicacion(event, publicacion);
                    }}></textarea>
                    <h2>Fecha de cierre</h2>
                    <input type="date" defaultValue={publicacion.fecha_cierre} onChange={(event) => {
                        handleChangeFechaCierrePublicacion(event, publicacion);
                    }}/>
                    <h2>Materiales</h2>
                    <div className={styles.container_materiales}>
                        {Object.entries(materiales).map(([idMaterial, material]) => {
                            return (
                                <div key={idMaterial} className={styles.container_material}>
                                    <h3>Nombre</h3>
                                    <input type="text" defaultValue={material.nombre} onChange={(event) => {
                                        handleChangeNombreMaterial(event, materiales, idMaterial);
                                    }}/>
                                    <h3>Descripción</h3>
                                    <textarea cols="30" rows="10" defaultValue={material.descripcion} onChange={(event) => {
                                        handleChangeDescripcionMaterial(event, materiales, idMaterial);
                                    }}></textarea>
                                    <h3>Categoría</h3>
                                    <select defaultValue={material.categoria} onChange={(event) => {
                                        handleChangeCategoriaMaterial(event, materiales, idMaterial);
                                    }}>
                                        {["aglomerados", "aglomerantes", "orgánicos", "metálicos"].map((categoria) => {
                                            return (
                                                <option key={idMaterial + "-categoria-" + categoria} value={categoria}>{categoria[0].toUpperCase() + categoria.substring(1)}</option>
                                            );
                                        })}
                                    </select>
                                    <h3>Cantidad</h3>
                                    <input type="number" defaultValue={material.cantidad} onChange={(event) => {
                                        handleChangeCantidadMaterial(event, materiales, idMaterial);
                                    }}/>
                                    <h3>Estado</h3>
                                    <input type="text" defaultValue={material.estado} onChange={(event) => {
                                        handleChangeEstadoMaterial(event, materiales, idMaterial);
                                    }}/>
                                </div>
                            );
                        })}
                    </div>
                    <div className="popup-actions">
                        <button onClick={async () => {
                            await guardarCambiosEvento(publicacion, materiales);
                            setPopup(<></>);
                        }}>OK
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    useEffect(() => {
        async function cargarEventos() {
            const data = await buscarEventos(idEmpresa);
            setEventos(data);
        }

        cargarEventos()
    }, []);

    return (
        <>
            <Header esEmpresa={true} cambiarInterfaz={cambiarInterfaz} activa={6}/>
            {eventos.map((evento) => {
                if (evento.materiales instanceof Array) {
                    evento.materiales = evento.materiales.reduce((accumulator, currentValue) => {
                        accumulator[currentValue.id] = {
                            "nombre": currentValue.nombre,
                            "descripcion": currentValue.descripcion,
                            "categoria": currentValue.categoria,
                            "cantidad": currentValue.cantidad,
                            "estado": currentValue.estado,
                        };
                        return accumulator;
                    }, {});
                }

                return (
                    <div key={evento.publicacion.id} className={styles.container_evento}>
                        <img src={`https://picsum.photos/200/300?random=${evento.publicacion.id}`} alt="Una imagen random"/>
                        <div className={styles.container_informacion_evento}>
                            <h1>{evento.publicacion.titulo}</h1>
                            <p>{evento.publicacion.descripcion}</p>
                        </div>
                        <div className={styles.container_botones_evento}>
                            <button onClick={() => {
                                setPopup(componentePopup(evento.publicacion, evento.materiales));
                            }}>Editar</button>
                        </div>
                    </div>
                );
            })}
            {popup}
        </>
    );
}