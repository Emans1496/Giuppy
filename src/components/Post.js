import React, { useContext, useState } from 'react';
import { Card, Button, Form, Modal, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEllipsisH, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../context/ThemeContext';
import './Post.css';
import moment from 'moment';

function Post({ postId, username, content, imageUrl, videoUrl, profileImage, createdAt, mood, location, deletePost }) {
  const { isDarkMode } = useContext(ThemeContext); // Otteniamo il tema corrente
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  // Funzione per inviare un commento
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.length > 0 && newComment.length <= 500) {
      const commentObj = {
        id: comments.length + 1,
        text: newComment,
        createdAt: new Date(),
      };
      setComments([...comments, commentObj]);
      setNewComment('');
    }
  };

  // Funzione per mettere "Mi Piace"
  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  // Funzione per gestire il doppio click sull'immagine
  const handleDoubleClick = () => {
    if (!liked) {
      handleLike();
    }
  };

  // Funzione per mostrare più commenti
  const toggleShowComments = () => {
    setShowAllComments(!showAllComments);
  };

  // Funzione per gestire la modifica del post
  const handleEditPost = () => {
    setShowEditModal(true);
  };

  // Funzione per eliminare il post (gestita dall'esterno)
  const handleDeletePost = () => {
    deletePost(postId); // Funzione passata come prop che esegue la cancellazione reale
  };

  // Placeholder per l'immagine del profilo
  const getProfileImage = () => {
    return profileImage ? profileImage : 'https://via.placeholder.com/50x50.png?text=' + username[0];
  };

  return (
    <>
      {/* Card del Post */}
      <Card className={`post ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Card.Body>
          {/* Header del Post */}
          <div className="post-header">
            <img
              src={getProfileImage()}
              alt={`${username} profile`}
              className="profile-img"
            />
            <div className="user-info">
              <span className="username">{username}</span>
              {/* Stato d'animo e posizione */}
              {mood && <span className="mood">{mood.emoji} {mood.label}</span>}
              {location && <span className="location">📍 {location}</span>}
              <span className="post-time">{moment(createdAt).fromNow()}</span>
            </div>

            {/* Opzioni di modifica/cancellazione */}
            <Dropdown className="post-options">
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                <FontAwesomeIcon icon={faEllipsisH} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEditPost}>
                  <FontAwesomeIcon icon={faEdit} /> Modifica Post
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDeletePost}>
                  <FontAwesomeIcon icon={faTrash} /> Elimina Post
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Contenuto del post */}
          <Card.Text>{content}</Card.Text>

          {/* Immagine del post con doppio click per like */}
          {imageUrl && (
            <div className="post-image-container" onDoubleClick={handleDoubleClick}>
              <img
                src={imageUrl}
                alt="Post image"
                className="post-image"
                loading="lazy" // Lazy loading per le immagini
              />
            </div>
          )}

          {/* Gestione dei video con caricamento progressivo */}
          {videoUrl && (
            <div className="post-video-container">
              <video controls preload="metadata" className="post-video">
                <source src={videoUrl} type="video/mp4" />
                Il tuo browser non supporta il video.
              </video>
            </div>
          )}

          <div className="post-actions">
            <button
              type="button"
              className={`like-button btn btn-link ${liked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="heart"
                className="svg-inline--fa fa-heart"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill={liked ? 'red' : 'currentColor'}
                  d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                ></path>
              </svg>
              Mi Piace ({likes})
            </button>
            <button
              type="button"
              className="comment-button btn btn-link"
              onClick={() => setShowCommentInput(true)}
            >
              💬 Commenta
            </button>
          </div>

          {/* Sezione dei commenti */}
          {comments.slice(0, showAllComments ? comments.length : 3).map((comment) => (
            <div key={comment.id} className="comment">
              <p><strong>Anonimo:</strong> {comment.text}</p>
              <span className="comment-time">{moment(comment.createdAt).fromNow()}</span>
            </div>
          ))}

          {/* Mostra bottone per visualizzare più commenti se ce ne sono più di 3 */}
          {comments.length > 3 && (
            <button className="btn btn-link more-comments" onClick={toggleShowComments}>
              {showAllComments ? 'Nascondi commenti' : `Visualizza altri commenti (${comments.length - 3})`}
            </button>
          )}

          {/* Input per scrivere un commento */}
          {showCommentInput && (
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group controlId="newComment">
                <Form.Control
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Scrivi un commento (max 500 caratteri)..."
                  maxLength={500}
                />
                <small>{newComment.length}/500 caratteri</small>
              </Form.Group>
              <Button variant="secondary" type="submit" className="mt-2 w-100">
                Aggiungi Commento
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>

      {/* Modale per modificare il post */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editedContent">
              <Form.Control
                as="textarea"
                rows={3}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={() => setShowEditModal(false)}>
            Salva modifiche
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Post;
