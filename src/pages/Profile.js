import React, { useContext, useState } from 'react';
import { Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import { ThemeContext } from '../context/ThemeContext';
import Post from '../components/Post';
import './Profile.css';

function Profile({ isMyProfile }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(150); // Numero iniziale di follower
  const [followingCount, setFollowingCount] = useState(120); // Numero iniziale di seguiti
  const [showModal, setShowModal] = useState(false);
  const [bio, setBio] = useState('Amo osservare le stelle!');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [nickname, setNickname] = useState('GiuppyUser'); // Nuovo campo per il nickname
  const [activeTab, setActiveTab] = useState('posts');
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null); // Per gestire l'immagine corrente visualizzata nel modal
  const [posts] = useState([
    {
      id: 1,
      username: 'GiuppyUser',
      content: 'Il mio primo post!',
      imageUrl: 'https://via.placeholder.com/300',
      mood: { emoji: '😊', label: 'Felice' },
      location: 'Napoli',
      createdAt: new Date(),
    },
    {
      id: 2,
      username: 'GiuppyUser',
      content: 'Ciao a tutti!',
      imageUrl: null,
      mood: { emoji: '🤔', label: 'Pensieroso' },
      location: 'Roma',
      createdAt: new Date(),
    }
  ]);

  const [photos] = useState([
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/200'
  ]);

  const [friends] = useState([
    { username: 'Amico1', profileImage: 'https://via.placeholder.com/50' },
    { username: 'Amico2', profileImage: 'https://via.placeholder.com/50' },
    { username: 'Amico3', profileImage: 'https://via.placeholder.com/50' }
  ]);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      setFollowerCount(followerCount + 1);
    } else {
      setFollowerCount(followerCount - 1);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = () => {
    setShowModal(false);
  };

  const openImageModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  return (
    <Container className={`profile-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Sezione Header Profilo */}
      <Row className="profile-header">
        <Col md={3} className="profile-avatar">
          <img
            src={profileImage}
            alt="Foto profilo"
            className="profile-img"
          />
          {isMyProfile && (
            <Button className="edit-profile-btn" variant="outline-secondary" onClick={() => setShowModal(true)}>
              Modifica Profilo
            </Button>
          )}
        </Col>
        <Col md={9}>
          <h2 className="profile-username">{nickname}</h2>
          <p className="profile-bio">{bio}</p>
          <div className="follow-info">
            <span>{followerCount} Follower</span>
            <span>{followingCount} Seguiti</span>
          </div>
          {!isMyProfile && (
            <Button className="follow-button" variant={isFollowing ? "danger" : "primary"} onClick={handleFollowClick}>
              {isFollowing ? 'Smetti di Seguire' : 'Segui'}
            </Button>
          )}
        </Col>
      </Row>

      {/* Sezione Tab per navigazione nel profilo */}
      <Row className="profile-tabs">
        <Col className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
          Post
        </Col>
        <Col className={`profile-tab ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => setActiveTab('photos')}>
          Foto
        </Col>
        <Col className={`profile-tab ${activeTab === 'friends' ? 'active' : ''}`} onClick={() => setActiveTab('friends')}>
          Amici
        </Col>
      </Row>

      {/* Sezione Posts */}
      {activeTab === 'posts' && (
        <Row className="user-posts mt-4">
          <Col>
            <h3 className="section-title">Post recenti</h3>
            {posts.map(post => (
              <Post
                key={post.id}
                username={post.username}
                content={post.content}
                imageUrl={post.imageUrl}
                mood={post.mood}
                location={post.location}
                createdAt={post.createdAt}
              />
            ))}
          </Col>
        </Row>
      )}

      {/* Sezione Foto */}
      {activeTab === 'photos' && (
        <Row className="user-photos mt-4">
          <Col>
            <h3 className="section-title">Foto</h3>
            <div className="photo-grid">
              {photos.map((photo, index) => (
                <img key={index} src={photo} alt="User photos" className="photo-item" onClick={() => openImageModal(photo)} />
              ))}
            </div>
          </Col>
        </Row>
      )}

      {/* Sezione Amici */}
      {activeTab === 'friends' && (
        <Row className="user-friends mt-4">
          <Col>
            <h3 className="section-title">Amici</h3>
            <div className="friends-grid">
              {friends.map((friend, index) => (
                <div key={index} className="friend-item">
                  <img src={friend.profileImage} alt={friend.username} className="friend-img" />
                  <p>{friend.username}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      )}

      {/* Modal per modificare la bio, nickname e immagine del profilo */}
      {isMyProfile && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica Profilo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formProfileImage">
              <Form.Label>Cambia immagine del profilo</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleProfileImageChange} />
            </Form.Group>
            <Form.Group controlId="formBio" className="mt-3">
              <Form.Label>Modifica la tua bio</Form.Label>
              <Form.Control as="textarea" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formNickname" className="mt-3">
              <Form.Label>Modifica il tuo nickname</Form.Label>
              <Form.Control type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Chiudi
            </Button>
            <Button variant="primary" onClick={handleSaveProfile}>
              Salva modifiche
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal per visualizzare le immagini a schermo intero */}
      <Modal show={showImageModal} onHide={closeImageModal} centered>
        <Modal.Body>
          <img src={currentImage} alt="Immagine ingrandita" className="img-fluid" />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Profile;
