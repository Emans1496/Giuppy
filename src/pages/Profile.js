import React, { useState } from 'react';

function Profile() {
  // Simuliamo i dati del profilo dell'utente
  const [username, setUsername] = useState('GiuppyUser1');
  const [bio, setBio] = useState('Amo osservare le stelle!');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui faremo una chiamata API per aggiornare il profilo
    console.log({ username, bio });
  };

  return (
    <div className="profile-container">
      <h2>Il mio profilo</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <textarea 
          value={bio} 
          onChange={(e) => setBio(e.target.value)} 
        />
        <button type="submit">Aggiorna profilo</button>
      </form>
    </div>
  );
}

export default Profile;
