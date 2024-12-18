import React, { useEffect, useState } from 'react';
import LikeIcon from '../imgTemp/icons8-me-gusta-50.png';
import DislikeIcon from '../imgTemp/icons8-me-gusta-relleno-50.png';
import CommentIcon from '../imgTemp/icon-comment.png';
import FilledCommentIcon from '../imgTemp/icon-comment-clicked.png';
import ShareIcon from '../imgTemp/icon-share.png';
import UserIcon from '../imgTemp/icons8-usuario-50.png';


export const Contenido = ({ userId, usuario, Consulta }) => {

  // const fechaActual = new Date();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [contenido, setContenido] = useState('');
  const [contcontenidoEditadoenido, setcontenidoEditado] = useState('');
  const [fecha_publicacion, setFecha_publicacion] = useState('');
  const [fk_idbeneficiario, setFk_idbeneficiario] = useState(1);
  const [publicaciones, setPublicaciones] = useState([]);
  const [dropdownStates, setDropdownStates] = useState([]); // Array to track each dropdown
  const [commentVisibility, setCommentVisibility] = useState(Array(publicaciones.length).fill(false));
  const [likesPorPublicacion, setLikesPorPublicacion] = useState({});

//interacciones
const [likeStates, setLikeStates] = useState({});
const [likeId, setLikeId] = useState({});
const [dislikeStates, setDislikeStates] = useState([]);
const [comentarios, setComentarios] = useState([]);


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

  const fetchLikes = async () => {
    try {
      const endpoint = 'http://localhost:5000/api/ObLikes';
      const response = await fetch(endpoint, { method: 'GET' });
      if (!response.ok) throw new Error('Error1 al obtener likes');

      const data = await response.json();

      const likesMap = data.reduce((acc, like) => {
        acc[like.id_publicacion] = parseInt(like.cantidad_likes, 10);
        return acc;
      }, {});
      setLikesPorPublicacion(likesMap);
    } catch (error) {
      console.error('Error2 al obtener likes: ', error);
    }
  };


  const fetchMyLikes = async (userId) => {
    try {
      const endpoint = `http://localhost:5000/api/ObMisLikes/${userId}`;
      const response = await fetch(endpoint, { method: 'GET' });
      if (!response.ok) throw new Error('Error1 al obtener mis likes');

      const data = await response.json();
      const likesMap = data.reduce((acc, item) => {
        acc[item.id_publicacion] = item.dio_like === 1; // true si dio_like es 1
        return acc;
      }, {});

      const likesMap2 = data.reduce((acc, item) => {
        acc[item.id_publicacion] = item.id_interaccion; 
        return acc;
      }, {});

      setLikeStates(likesMap);
      setLikeId(likesMap2);
    } catch (error) {
      console.error('Error2 al obtener mis likes: ', error);
    }
  };

  const fetchComentarios = async (id) => {
    console.log("Obteniendo comentarios para la publicación con ID:", id);

    try {
      const endpoint = `http://localhost:5000/api/ObComentarios/${id}`;
      console.log(endpoint);
      const response = await fetch(endpoint, { method: 'GET' });
      if (!response.ok) throw new Error('Error al obtener los comentarios');
      
      const data = await response.json();
      setComentarios(data);
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
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
    try {
      let datos = { contenido, fecha_publicacion, fk_idbeneficiario };
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
      fetchLikes();
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
      alert('Error al eliminar la publicación');
    }
  };

  const handleEdit = async (id,contenidoEditado) => {
    try {
      const endpoint = 'http://localhost:5000/api/editarPublicacionBen';
      const datos = {
        id,
        contenido: contenidoEditado,
      };
      
      // Log para verificar los datos que se están enviando
      console.log('Datos enviados:', datos);

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });
      
      console.log(response);
      
      if (!response.ok) {
        throw new Error('Error al editar la publicación');
      }

      const data = await response.json();
      console.log('Publicación editada:', data);
      alert('Publicación editada con éxito');

      fetchPublicaciones();  // Recargar las publicaciones después de editar
      setShowPopupEdit(false);  // Cerrar el popup de edición
    } catch (error) {
      console.error('Error al editar la publicación:', error);
      alert('Error al editar la publicación');
    }
};

const handleLike = async (fK_idPublicacionBen) => {
  try {
    const fk_idbeneficiario = userId;

    let datos = { fk_idbeneficiario, fK_idPublicacionBen };
    let endpoint = "http://localhost:5000/api/like";

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

    
  } catch (error) {
    fetchLikes();
    console.error("Error al dar like:", error);
  }
};

const handleDisLike = async (id_interaccion) => {
  try {
    let endpoint = "http://localhost:5000/api/Dislike";

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id_interaccion),
    });

    if (!response.ok) {
      throw new Error('Error en el servidor');
    }

    fetchLikes();
  } catch (error) {
    console.error("Error al dar like:", error);
    alert("error");
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
      fetchLikes();
      fetchMyLikes(userId);
    }
  }, [userId, usuario]);


  return (
    <>
      <button className='addPublicacion' onClick={handlePopup}>+</button>
      <input className='buscar' placeholder='Buscar'></input>
      <div className='PublicacionesExistentes'>
        {/* Mapeo de publicaciones */}
        {publicaciones.map((publicacion, index) => (
          <div className='PublicacionBen' key={publicacion.id}>
            <div className="header_PublicacionBen">
              <img src={UserIcon} alt="User Icon" className="userIcon_PublicacionBen" />
              <span className="userName_PublicacionBen">Username</span>
              <div
                className="menuIcon"
                onClick={() => toggleDropdown(index)} // Using index here
              >⋮</div>
              {dropdownStates[index] && ( // Checking dropdownStates[index] for condition
                <div className="dropdownMenu">
                  {Consulta === "General" ? (
                    <>
                      <button onClick={() => console.log("Report post")}>Reportar</button>
                    </>
                  ) : (
                    Consulta !== "General" && (
                      <>
                        <button id='editPBen' onClick={() => { setShowPopupEdit(true); setSelectedId(publicacion.id); toggleDropdown(index); }}>Editar</button>
                        <button id='deletePBen' onClick={() => handleDelete(publicacion.id)}>Eliminar</button>

                      </>
                    )
                  )}
                </div>
              )}
            </div>
            <p className='contenido_PublicacionBen'>{publicacion.contenido}</p>
            <p className='fecha_PublicacionBen'>{new Date(publicacion.fecha_publicacion).toLocaleDateString()}</p>
            <div className="interactionIcons_PublicacionBen">
              <span className="icon" id='share'><img src={ShareIcon}/></span>
              <span className="icon" id='comment' onClick={() => {fetchComentarios(publicacion.id); toggleCommentVisibility(index); }}>
                <img src={commentVisibility[index] ? FilledCommentIcon : CommentIcon} />
              </span>
              <span className="icon" id="like" onClick={() => {
                  const isLiked = likeStates[publicacion.id]; 
                  if (isLiked) {
                    const id_interaccion = likeId[publicacion.id].id_interaccion; 
                    handleDisLike(id_interaccion);  
                  } else {
                    handleLike(publicacion.id); 
                  }
                }}>
                <img src={likeStates[publicacion.id] ? DislikeIcon : LikeIcon} alt="Like Icon"/>
                <div className='contador_likes'>{likesPorPublicacion[publicacion.id] || 0}</div>
              </span>
            </div>
            {commentVisibility[index] && (
              <div className="commentSection">
                <div className='commentsVisibility'>
                {/* Mapeo de comentarios */}
                {comentarios.map((comentario) => (
                  <span key={comentario.id_comentario}>
                    {comentario.comentario} @{comentario.id_autor}
                  </span>
                ))}
                </div>
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
              value={contenido}  
              onChange={handleContenidoChange}  
            />
            <div className="popup-actions">
              <button onClick={() => handleEdit(selectedId,contenido)}>Guardar</button>  {/* Llama a handleEdit */}
              <button onClick={handlePopupEdit}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};