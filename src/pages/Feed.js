import React, { useContext, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../components/Post';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoVideo, faUserTag, faMapMarkerAlt, faSmile, faVideo } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../context/ThemeContext';
import Navbar from '../components/Navbar'; // Importiamo Navbar
import './Feed.css';

function Feed() {
  const { isDarkMode } = useContext(ThemeContext);
  const [posts, setPosts] = useState([
    { id: 1, username: 'GiuppyUser1', content: 'Il mio primo post!', imageUrl: null },
    { id: 2, username: 'GiuppyUser2', content: 'Ciao dal cosmo!', imageUrl: null },
  ]);
  const [newPost, setNewPost] = useState('');
  const [showModal, setShowModal] = useState(false); // Stato per il modale
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [showPostBar, setShowPostBar] = useState(true); // Stato per controllare la visibilità della barra post
  const [lastScrollY, setLastScrollY] = useState(0);

  // Controllo dello scroll
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowPostBar(false); // Nascondi se l'utente scorre verso il basso
    } else {
      setShowPostBar(true); // Mostra se l'utente scorre verso l'alto
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPostObj = {
      id: posts.length + 1,
      username: 'GiuppyUser3',
      content: newPost,
      imageUrl: image ? URL.createObjectURL(image) : null,
      videoUrl: video ? URL.createObjectURL(video) : null, // Caricamento video
    };
    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setImage(null);
    setVideo(null);
    setShowModal(false); // Chiudi il modale dopo aver postato
  };

  const fetchMorePosts = () => {
    setTimeout(() => {
      const newPosts = [
        { id: posts.length + 1, username: 'GiuppyUser3', content: 'Nuovo post!' },
        { id: posts.length + 2, username: 'GiuppyUser4', content: 'Altro post!' },
      ];
      setPosts([...posts, ...newPosts]);

      if (posts.length >= 20) {
        setHasMore(false);
      }
    }, 1500);
  };

  return (
    <Container className={`feed-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h2>Feed</h2>

      {/* Barra di creazione post, visibile o nascosta in base allo scroll */}
      {showPostBar && (
        <Form className="post-form" onClick={() => setShowModal(true)}>
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="A cosa stai pensando?"
            className="input-text"
            readOnly
          />
        </Form>
      )}

      {/* Modale per creare il post */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crea post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="user-info">
            <img src="profile-image-url.jpg" alt="Profile" className="profile-img-modal" />
            <strong>Emanuele Squillante</strong>
          </div>

          {/* Testo del post */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="newPost">
              <Form.Control
                as="textarea"
                rows={3}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="A cosa stai pensando?"
              />
            </Form.Group>

            {/* Opzioni aggiuntive */}
            <div className="post-options">
              <Button variant="light" className="option-button">
                <FontAwesomeIcon icon={faPhotoVideo} /> 
                <label>
                  Foto/Video
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file.type.startsWith('video') && file.duration > 60) {
                        alert('Il video non può superare 1 minuto');
                      } else {
                        file.type.startsWith('video') ? setVideo(file) : setImage(file);
                      }
                    }}
                    hidden
                  />
                </label>
              </Button>
              <Button variant="light" className="option-button">
                <FontAwesomeIcon icon={faUserTag} /> Tagga persone
              </Button>
              <Button variant="light" className="option-button">
                <FontAwesomeIcon icon={faSmile} /> Stato d'animo/attività
              </Button>
              <Button variant="light" className="option-button">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Registrati
              </Button>
              <Button variant="light" className="option-button">
                <FontAwesomeIcon icon={faVideo} /> Video in diretta
              </Button>
            </div>

            {/* Bottone per postare */}
            <Button variant="primary" type="submit" className="mt-3 w-100">
              Posta
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<h4>Caricamento...</h4>}
        endMessage={<p className="end-message">Hai visto tutti i post!</p>}
      >
        {posts.map(post => (
          <Post key={post.id} username={post.username} content={post.content} imageUrl={post.imageUrl} />
        ))}
      </InfiniteScroll>

      {/* Passiamo la funzione di apertura del modale alla navbar */}
      <Navbar onPostClick={() => setShowModal(true)} />
    </Container>
  );
}

export default Feed;
