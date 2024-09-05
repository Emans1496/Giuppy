import React, { useContext, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { ThemeContext } from '../context/ThemeContext';  // Importiamo il contesto del tema
import './Profile.css';

function Profile() {
  const { isDarkMode } = useContext(ThemeContext);  // Otteniamo il tema corrente
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Container className={`profile-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h2>Il mio profilo</h2>
      <p>Nome utente: GiuppyUser</p>
      <p>Bio: Amo osservare le stelle!</p>

      <Button variant={isFollowing ? "danger" : "primary"} onClick={handleFollowClick}>
        {isFollowing ? 'Smetti di Seguire' : 'Segui'}
      </Button>
    </Container>
  );
}

export default Profile;
