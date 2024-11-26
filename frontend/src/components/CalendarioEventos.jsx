import React, { useEffect, useState } from 'react';
import '../styles/CalendarioEventos.css';

export const CalendarioEventos = ({ userId , cambiarInterfaz}) => {
  const [fechaActual, setFechaActual] = useState(new Date(2024, 10, 1)); 
  const [eventos, setEventos] = useState([]); // Lista de eventos
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null); // Evento seleccionado

  const handleFetchInscripciones = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/consultarInscripcion?userId=${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            const data = await response.json();
            // Mapear los datos recibidos para ajustarlos al formato de eventos
            const eventosRecibidos = data.map((publicacion) => ({
                idInscripcion: publicacion.id_inscripcion,
                id: publicacion.id_publicacion,
                fecha: new Date(publicacion.fecha_evento),
                titulo: publicacion.titulo,
                descripcion: publicacion.descripcion,
                hora: publicacion.hora_evento,  
                ubicacion: publicacion.ubicacion_evento,
                estado: publicacion.estado,
                cantidad: publicacion.cantidad_disponible,
            }));
            setEventos(eventosRecibidos);
        } else {
            console.error('Error al consultar inscripciones');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
  };

  const eliminarInscripcion = async (idInscripcion) => {
    try {
      const response = await fetch(`http://localhost:5000/api/EliminarInscripcion/${idInscripcion}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert("Inscripción eliminada correctamente");
        setEventos(eventos.filter(evento => evento.idInscripcion !== idInscripcion));  // Filtrar por idInscripcion
        cerrarPopup();
      } else {
        console.error('Error al eliminar inscripción');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const diasEnMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0).getDate();
  const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1).getDay();

  const mesAnterior = () => {
    setFechaActual(new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 1, 1));
  };

  const mesSiguiente = () => {
    setFechaActual(new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 1));
  };

  const obtenerEventosDia = (dia) => {
    if (!eventos) return []; // Si eventos no está definido, devolver un array vacío
    return eventos.filter(evento => 
      evento.fecha.getDate() === dia &&
      evento.fecha.getMonth() === fechaActual.getMonth() &&
      evento.fecha.getFullYear() === fechaActual.getFullYear()
    );
  };

  const seleccionarEvento = (evento) => {
    setEventoSeleccionado(evento);
  };

  const cerrarPopup = () => {
    setEventoSeleccionado(null);
  };

  useEffect(() => {
    handleFetchInscripciones(); 
  }, [userId]);

  return (
    <div className="calendario">
      <div className="cabecera-calendario">
        <button onClick={mesAnterior}>&lt;</button>
        <h2>{fechaActual.toLocaleString('es', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={mesSiguiente}>&gt;</button>
        <button type="button" onClick={() => cambiarInterfaz("HomePage")}>
            Cancelar
          </button>
      </div>
      <div className="dias-semana">
        {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(dia => (
          <div key={dia}>{dia}</div>
        ))}
      </div>
      <div className="dias-mes">
        {Array.from({ length: primerDiaMes }).map((_, index) => (
          <div key={`empty-${index}`} className="dia vacio" />
        ))}
        {Array.from({ length: diasEnMes }).map((_, index) => {
          const dia = index + 1;
          const eventosDia = obtenerEventosDia(dia); // Obtener eventos del día
          return (
            <div key={dia} className={`dia ${eventosDia.length > 0 ? 'con-evento' : ''}`}>
              <span className="numero-dia">{dia}</span>
              {eventosDia.map(evento => (
                <div 
                  key={evento.id} 
                  className="evento-dia"
                  onClick={() => seleccionarEvento(evento)}
                >
                  Evento
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {eventoSeleccionado && (
        <div className="popup">
          <div className="contenido-popup">
            <button className="cerrar-popup" onClick={cerrarPopup} aria-label="Cerrar">×</button>
            <h3>{eventoSeleccionado.titulo}</h3>
            <p><strong>Fecha:</strong> {eventoSeleccionado.fecha.toLocaleDateString()}</p>
            <p><strong>Hora:</strong> {eventoSeleccionado.hora}</p>
            <p><strong>Descripción:</strong> {eventoSeleccionado.descripcion}</p>
            <p><strong>Ubicación:</strong> {eventoSeleccionado.ubicacion}</p>
            <p><strong>Estado:</strong> {eventoSeleccionado.estado}</p>
            <p><strong>Cantidad disponible:</strong> {eventoSeleccionado.cantidad}</p>
            <button onClick={() => eliminarInscripcion(eventoSeleccionado.idInscripcion)} className="cancelar-inscripcion">Cancelar Inscripción</button>
          </div>
        </div>
      )}
    </div>
  );
};
