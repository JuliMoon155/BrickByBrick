import styles from "../styles/VistaMaterialesPublicados.module.css"

import {useEffect, useState} from "react";
import {Header} from "./Header";

export function VistaMaterialesPublicados({idEmpresa, cambiarInterfaz}) {
    const [materialesPorDonar, setMaterialesPorDonar] = useState([]);
    const buscarMaterialesPorDonar = async () => {
        const respuestaBusqueda = await fetch("http://localhost:5000/api/buscarMaterialesPorDonar", {
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
    };

    const cambiarCantidadMaterial = async (cantidad, idMaterial) => {
        const respuestaCambio = await fetch("http://localhost:5000/api/SetCantidadMaterial", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "cantidad": cantidad,
                "idMaterial": idMaterial,
            })
        })
        if (!respuestaCambio.ok) {
            throw new Error('Error al cambiar la cantidad de material por donar');
        }
        return await respuestaCambio.json();
    }

    const cargarMaterialesPorDonar = async () => {
        const data = await buscarMaterialesPorDonar(idEmpresa);
        setMaterialesPorDonar(data);
    }

    useEffect(() => {
        cargarMaterialesPorDonar();
    }, []);

    return (
        <>
            <Header esEmpresa={true} cambiarInterfaz={cambiarInterfaz} activa={6}/>
            {materialesPorDonar.map((materialPorDonar) =>
                <div key={materialPorDonar.id_material} className={styles.container_grande}>
                    <div className={styles.container_informacion}>
                        <h1>{materialPorDonar.nombre}</h1>
                        <p>Cantidad: {materialPorDonar.cantidad}</p>
                        <p>Estado: {materialPorDonar.estado_material}</p>
                        <p>Descripción: {materialPorDonar.descripcion}</p>
                        <p>Categoría: {materialPorDonar.categoria.toLowerCase()}</p>
                    </div>
                    <div className={styles.container_controles}>
                        <button onClick={async () => {
                            let cantidad = prompt("Ingresa la nueva cantidad", materialPorDonar.cantidad);
                            if (isNaN(cantidad)) {
                                cantidad = materialPorDonar.cantidad;
                            } else {
                                cantidad = cantidad < 0 ? 0 : cantidad;
                            }
                            await cambiarCantidadMaterial(cantidad, materialPorDonar.id_material);
                            await cargarMaterialesPorDonar();
                        }}>Cambiar cantidad</button>
                    </div>
                </div>
            )}
        </>
    );
}