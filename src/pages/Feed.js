import React, { useContext, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../components/Post";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhotoVideo,
  faMapMarkerAlt,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import "./Feed.css";

// Opzioni di stato d'animo
const moodOptions = [
  { emoji: "😊", label: "Felice" },
  { emoji: "😍", label: "Amato" },
  { emoji: "😢", label: "Triste" },
  { emoji: "🤪", label: "Pazzo" },
  { emoji: "🤩", label: "Fantastico" },
  { emoji: "😎", label: "Cool" },
  { emoji: "🥱", label: "Annoiato" },
  { emoji: "😴", label: "Rilassato" },
  { emoji: "🤒", label: "Ammalato" },
  { emoji: "😤", label: "Arrabbiato" },
  { emoji: "🤬", label: "Furioso" },
  { emoji: "🤔", label: "Dubbioso" },
  { emoji: "🤢", label: "Disgustato" },
  { emoji: "😥", label: "Perplesso" },
];

function Feed() {
  const { isDarkMode } = useContext(ThemeContext);
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "GiuppyUser1",
      content: "Il mio primo post!",
      imageUrl: null,
    },
    {
      id: 2,
      username: "GiuppyUser2",
      content: "Ciao dal cosmo!",
      imageUrl: null,
    },
  ]);
  const [newPost, setNewPost] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(""); // Stato per la posizione inserita manualmente
  const [showModal, setShowModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false); // Stato per la finestra modale della posizione
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Funzione per cancellare un post
  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  // Resetta lo stato quando la modale principale viene chiusa
  const handleClosePostModal = () => {
    setNewPost("");
    setSelectedMood(null);
    setSelectedLocation(""); // Reset della posizione inserita manualmente
    setImage(null);
    setVideo(null);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPostObj = {
      id: posts.length + 1,
      username: "GiuppyUser3",
      content: newPost,
      imageUrl: image ? URL.createObjectURL(image) : null,
      videoUrl: video ? URL.createObjectURL(video) : null,
    };
    setPosts([newPostObj, ...posts]);
    handleClosePostModal(); // Chiudi e resetta il modale
  };

  const fetchMorePosts = () => {
    setTimeout(() => {
      const newPosts = [
        {
          id: posts.length + 1,
          username: "GiuppyUser3",
          content: "Nuovo post!",
        },
        {
          id: posts.length + 2,
          username: "GiuppyUser4",
          content: "Altro post!",
        },
      ];
      setPosts([...posts, ...newPosts]);

      if (posts.length >= 20) {
        setHasMore(false);
      }
    }, 1500);
  };

  return (
    <Container
      className={`feed-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <div className="top-header">
        <h2>Feed</h2>
      </div>

      {/* Barra di creazione post */}
      <Form className="post-form" onClick={() => setShowModal(true)}>
        <Form.Control
          as="textarea"
          rows={1}
          placeholder="A cosa stai pensando?"
          className="input-text"
          readOnly
        />
      </Form>

      {/* Modale per creare il post */}
      <Modal show={showModal} onHide={handleClosePostModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crea post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="user-info">
            <img
              src="profile-image-url.jpg"
              alt="Profile"
              className="profile-img-modal"
            />
            <strong>Emanuele Squillante</strong>
            {selectedMood && (
              <span className="selected-mood">
                {selectedMood.emoji} {selectedMood.label}
              </span>
            )}
            {selectedLocation && (
              <span className="selected-location">
                📍 {selectedLocation}
              </span>
            )}
          </div>

          {/* Anteprima immagine o video */}
          {image && (
            <div className="preview-container">
              <img
                src={URL.createObjectURL(image)}
                alt="Anteprima"
                className="preview-img"
              />
              <Button
                variant="danger"
                className="mt-2"
                onClick={() => setImage(null)}
              >
                Rimuovi Immagine
              </Button>
            </div>
          )}
          {video && (
            <div className="preview-container">
              <video
                controls
                src={URL.createObjectURL(video)}
                className="preview-video"
              />
              <Button
                variant="danger"
                className="mt-2"
                onClick={() => setVideo(null)}
              >
                Rimuovi Video
              </Button>
            </div>
          )}

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
                      if (file.type.startsWith("video") && file.duration > 60) {
                        alert("Il video non può superare 1 minuto");
                      } else {
                        file.type.startsWith("video")
                          ? setVideo(file)
                          : setImage(file);
                      }
                    }}
                    hidden
                  />
                </label>
              </Button>
              <Button
                variant="light"
                className="option-button"
                onClick={() => setShowMoodModal(true)}
              >
                <FontAwesomeIcon icon={faSmile} /> Stato d'animo/attività
              </Button>

              {/* Aggiungere la posizione manualmente */}
              <Button
                variant="light"
                className="option-button"
                onClick={() => setShowLocationModal(true)}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Posizione
              </Button>
            </div>

            {/* Bottone per postare */}
            <Button variant="primary" type="submit" className="mt-3 w-100">
              Posta
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modale per selezionare lo stato d'animo/attività */}
      <Modal
        show={showMoodModal}
        onHide={() => setShowMoodModal(false)}
        centered
        className="mood-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Come ti senti?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mood-grid">
            {moodOptions.map((mood) => (
              <div
                key={mood.label}
                className="mood-option"
                onClick={() => {
                  setSelectedMood(mood);
                  setShowMoodModal(false);
                }}
              >
                <span className="mood-emoji">{mood.emoji}</span>
                <span className="mood-label">{mood.label}</span>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>

      {/* Modale per inserire manualmente la posizione */}
      <Modal
        show={showLocationModal}
        onHide={() => setShowLocationModal(false)}
        centered
        className="location-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Inserisci la posizione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="locationInput">
            <Form.Control
              type="text"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="Inserisci la posizione"
            />
          </Form.Group>
          <Button
            variant="primary"
            className="mt-3 w-100"
            onClick={() => setShowLocationModal(false)}
          >
            Salva Posizione
          </Button>
        </Modal.Body>
      </Modal>

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<h4>Caricamento...</h4>}
        endMessage={<p className="end-message">Hai visto tutti i post!</p>}
      >
        {posts.map((post) => (
          <Post
            key={post.id}
            username={post.username}
            content={post.content}
            imageUrl={post.imageUrl}
            deletePost={() => deletePost(post.id)}
          />
        ))}
      </InfiniteScroll>

      <Navbar onPostClick={() => setShowModal(true)} />
    </Container>
  );
}

export default Feed;
