import React, { useEffect, useState } from 'react';
import LikeIcon from '../imgTemp/icons8-me-gusta-50.png';
import DislikeIcon from '../imgTemp/icons8-me-gusta-relleno-50.png';
import CommentIcon from '../imgTemp/icon-comment.png';
import FilledCommentIcon from '../imgTemp/icon-comment-clicked.png';
import ShareIcon from '../imgTemp/icon-share.png';
import UserIcon from '../imgTemp/icons8-usuario-50.png';


export const Contenido = ({ userId, usuario}) => {

// const fechaActual = new Date();
const [showPopup, setShowPopup] = useState(false); 
const [showPopupEdit, setShowPopupEdit] = useState(false); 
const [contenido, setContenido] = useState(''); 
const [fecha_publicacion, setFecha_publicacion] = useState(''); 
const [fk_idbeneficiario, setFk_idbeneficiario] = useState(1);
const [publicaciones, setPublicaciones] = useState([]);
const [dropdownStates, setDropdownStates] = useState([]); // Array to track each dropdown
const [commentVisibility, setCommentVisibility] = useState(Array(publicaciones.length).fill(false));

//interacciones
const [likeStates, setLikeStates] = useState([]);
const [dislikeStates, setDislikeStates] = useState([]);


  const fetchPublicaciones = async () => {
    try {
      const endpoint = 'http://localhost:5000/api/ObPublicacionesBen';
      const response = await fetch(endpoint, { method: 'GET' });
      if (!response.ok) throw new Error('Error al obtener publicaciones');
      
      const data = await response.json();
      setPublicaciones(data);
      setDropdownStates(new Array(data.length).fill(false));
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
    }
  };

  const toggleLike = async (index, id_interaccion, id_beneficiario, id_contenidoBeneficiario) => {
    const newLikeState = !likeStates[index];
    setLikeStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = newLikeState;
        return newStates;
    });

    try {
      const endpoint = 'http://localhost:5000/api/publicaciones/like';
      const options = {
          method: newLikeState ? 'POST' : 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_beneficiario, id_contenidoBeneficiario }),
      };

      const response = await fetch(endpoint, options);

      if (!response.ok) throw new Error('Error en la interacción de like');
      console.log(newLikeState ? 'Like agregado' : 'Like eliminado');
  } catch (error) {
      console.error('Error al cambiar el estado de like:', error);
  }
};


const toggleCommentVisibility = (index) => {
  setCommentVisibility((prevState) => {
    const newState = [...prevState];
    newState[index] = !newState[index]; // Toggle comment visibility
    return newState;
  });
};

  const handlePopup = () => {
    setShowPopup(!showPopup); 
  };

  const handlePopupEdit = () => {
    setShowPopupEdit(!showPopupEdit); 
  };

  const handleContenidoChange = (e) => {
    setContenido(e.target.value);
  };

  const handleSubmit = async () => {
    console.log("Publicación creada:", contenido);
    try{
        let datos = {contenido, fecha_publicacion, fk_idbeneficiario};
        let endpoint = "http://localhost:5000/api/PublicacionesBen";

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(datos),
        });

        if (!response.ok) {
            throw new Error('Error en el servidor');
        }

        const data = await response.json();
        console.log('Publicacion Creada:', data);
        alert('Publicacion creada con exito');

        setShowPopup(false);
        fetchPublicaciones(); 
    } catch (error) {
        console.error("Error al guardar la publicacion:", error);
        alert("error");
    }
  };

  const handleDelete = async (id) => {
    try {
        const endpoint = `http://localhost:5000/api/EliminarPublicacion/${id}`;
        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la publicación');
        }

        const data = await response.json();
        console.log('Publicación eliminada:', data);
        alert('Publicación eliminada con éxito');

        fetchPublicaciones(); 
    } catch (error) {
        console.error('Error al eliminar la publicación:', error);
        alert('Error al eliminar la publicación');
    }
};

  const toggleDropdown = (index) => {  // Using index here
    setDropdownStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index]; // Toggle only the clicked dropdown
      return newStates;
    });
  };


    useEffect(() => {
      if (userId && usuario) {
        setFk_idbeneficiario(userId);
        fetchPublicaciones();
      }
    }, [userId, usuario]);


    return (
        <>
        <button className='addPublicacion' onClick={handlePopup}>+</button>
        <input className='buscar' placeholder='Buscar'></input>
        <div className='PublicacionesExistentes'>
        {/* Mapeo de publicaciones */}
        {publicaciones.map((publicacion, index) => ( 
          <div className='PublicacionBen' key={publicacion.idpublicacion}>
            <div className="header_PublicacionBen">
              <img src={UserIcon} alt="User Icon" className="userIcon_PublicacionBen" />
              <span className="userName_PublicacionBen">Username</span>
              <div 
                className="menuIcon" 
                onClick={() => toggleDropdown(index)} // Using index here
              >⋮</div>
              {dropdownStates[index] && ( // Checking dropdownStates[index] for condition
                <div className="dropdownMenu">
                  <button id='editPBen' onClick={handlePopupEdit}>Editar</button>
                  <button id='deletePBen'onClick={() => handleDelete(publicacion.id)}>Eliminar</button>
                  <button onClick={() => console.log("Report post")}>Reportar</button>
                </div>
              )}
            </div>
            <p className='contenido_PublicacionBen'>{publicacion.contenido}</p>
            <p className='fecha_PublicacionBen'>{new Date(publicacion.fecha_publicacion).toLocaleDateString()}</p>
            <div className="interactionIcons_PublicacionBen">
              <span className="icon" id='share'><img src={ShareIcon}/></span>
              <span className="icon" id='comment' onClick={() => toggleCommentVisibility(index)}>
                <img src={commentVisibility[index] ? FilledCommentIcon : CommentIcon} />
              </span>              
              <span 
                className="icon" 
                id="like" 
                onClick={() => toggleLike(
                  index, 
                  fk_idbeneficiario, 
                  publicaciones[index].idpublicacion 
                )}
              >
                <img 
                  src={likeStates[index] ? DislikeIcon : LikeIcon} 
                  alt="Like Icon" 
                />
              </span>
            </div>
            {commentVisibility[index] && (
              <div className="commentSection">
                <textarea className="commentInput" placeholder="Escribe un comentario..."></textarea>
                <button className="submitComment">Comentar</button>
              </div>
            )}
          </div>
        ))}
        </div>
        {/* Popup */}
        {showPopup && (
            <div className="popup">
            <div className="popup-inner">
                <h2>Nueva Publicación</h2>
                <textarea
                placeholder="Escribe una descripción..."
                value={contenido}
                onChange={handleContenidoChange}
                />
                <div className="popup-actions">
                <button onClick={handleSubmit}>Publicar</button>
                <button onClick={handlePopup}>Cancelar</button>
                </div>
            </div>
            </div>
        )}

        {/* Popup editar */}
        {showPopupEdit && (
            <div className="popup">
            <div className="popup-inner">
                <h2>Editar Publicación</h2>
                <textarea
                placeholder="Edita la publicación..."
                value={publicaciones.contenido}
                onChange={handleContenidoChange}
                />
                <div className="popup-actions">
                <button onClick={handleSubmit}>Guardar</button>
                <button onClick={handlePopupEdit}>Cancelar</button>
                </div>
            </div>
            </div>
        )}        
        </>
  );
};