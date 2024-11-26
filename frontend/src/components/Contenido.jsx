import React, { useEffect, useState } from 'react';
import LikeIcon from '../imgTemp/icons8-me-gusta-50.png';
import DislikeIcon from '../imgTemp/icons8-me-gusta-relleno-50.png';
import CommentIcon from '../imgTemp/icon-comment.png';
import FilledCommentIcon from '../imgTemp/icon-comment-clicked.png';
import ShareIcon from '../imgTemp/icon-share.png';
import UserIcon from '../imgTemp/icons8-usuario-50.png';

export const Contenido = ({ userId, usuario, Consulta }) => {
  const [showPopup, setShowPopup] = useState(false); 
  const [showPopupEdit, setShowPopupEdit] = useState(false); 
  const [contenido, setContenido] = useState(''); 
  const [fk_idbeneficiario, setFk_idbeneficiario] = useState(1);
  const [publicaciones, setPublicaciones] = useState([]);
  const [dropdownStates, setDropdownStates] = useState([]); 
  const [commentVisibility, setCommentVisibility] = useState([]);
  const [likeStates, setLikeStates] = useState([]);
  const [likeCounts, setLikeCounts] = useState([]); 
  const [comments, setComments] = useState({}); 

  useEffect(() => {
    fetchPublicaciones();
  }, [Consulta]);

  const fetchPublicaciones = async () => {
    try {
      let endpoint = Consulta === "General"
        ? 'http://localhost:5000/api/ObPublicacionesBen'
        : `http://localhost:5000/api/ObPublicacionesBenPropias?id=${userId}`;
      
      const response = await fetch(endpoint, { method: 'GET' });
      if (!response.ok) throw new Error('Error al obtener publicaciones');
      
      const data = await response.json();
      setPublicaciones(data);
      setDropdownStates(new Array(data.length).fill(false));
      setCommentVisibility(new Array(data.length).fill(false));
      setLikeStates(data.map(pub => pub.userHasLiked || false)); 
      setLikeCounts(data.map(pub => pub.likesCount || 0)); 
      setComments(data.reduce((acc, pub) => {
        acc[pub.idpublicacion] = pub.comments || [];
        return acc;
      }, {}));
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
    }
  };

  const toggleLike = async (index, id_beneficiario, id_contenidoBeneficiario) => {
    const newLikeState = !likeStates[index];
    setLikeStates(prev => {
      const updated = [...prev];
      updated[index] = newLikeState;
      return updated;
    });
    setLikeCounts(prev => {
      const updated = [...prev];
      updated[index] += newLikeState ? 1 : -1;
      return updated;
    });

    try {
      const endpoint = 'http://localhost:5000/api/publicaciones/like';
      const options = {
        method: newLikeState ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_beneficiario, id_contenidoBeneficiario }),
      };
      await fetch(endpoint, options);
    } catch (error) {
      console.error('Error al cambiar el estado de like:', error);
    }
  };

  const handleCommentSubmit = async (index, id_contenidoBeneficiario, newComment) => {
    try {
      const endpoint = 'http://localhost:5000/api/publicaciones/comment';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_contenidoBeneficiario, comentario: newComment }),
      });

      if (!response.ok) throw new Error('Error al agregar comentario');

      setComments(prev => {
        const updated = { ...prev };
        updated[id_contenidoBeneficiario] = [
          ...updated[id_contenidoBeneficiario],
          { comentario: newComment, autor: usuario },
        ];
        return updated;
      });
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  const toggleCommentVisibility = index => {
    setCommentVisibility(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <>
      <button className='addPublicacion' onClick={() => setShowPopup(true)}>+</button>
      <div className='PublicacionesExistentes'>
        {publicaciones.map((publicacion, index) => (
          <div className='PublicacionBen' key={publicacion.idpublicacion}>
            <div className="header_PublicacionBen">
              <img src={UserIcon} alt="User Icon" className="userIcon_PublicacionBen" />
              <span className="userName_PublicacionBen">Username</span>
              <div 
                className="menuIcon" 
                onClick={() => toggleDropdown(index)}
              >⋮</div>
              {dropdownStates[index] && (
                <div className="dropdownMenu">
                {Consulta !== "General" && (
                  <button id='editPBen' onClick={() => setShowPopupEdit(true)}>Editar</button>
                )}
                <button id='deletePBen' onClick={() => handleDelete(publicacion.id)}>Eliminar</button>
              </div>
              )}
            </div>
            <p className='contenido_PublicacionBen'>{publicacion.contenido}</p>
            <p className='fecha_PublicacionBen'>{new Date(publicacion.fecha_publicacion).toLocaleDateString()}</p>
            <div className="interactionIcons_PublicacionBen">
              <span className="icon" id='like' onClick={() => toggleLike(index, fk_idbeneficiario, publicacion.idpublicacion)}>
                <img src={likeStates[index] ? DislikeIcon : LikeIcon} />
                <span>{likeCounts[index]}</span>
              </span>
              <span className="icon" id='comment' onClick={() => toggleCommentVisibility(index)}>
                <img src={commentVisibility[index] ? FilledCommentIcon : CommentIcon} />
              </span>
            </div>
            {commentVisibility[index] && (
              <div className="commentSection">
                {comments[publicacion.idpublicacion]?.map((comment, idx) => (
                  <p key={idx}><strong>{comment.autor}</strong>: {comment.comentario}</p>
                ))}
                <textarea 
                  className="commentInput" 
                  placeholder="Escribe un comentario..." 
                  onBlur={(e) => handleCommentSubmit(index, publicacion.idpublicacion, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
