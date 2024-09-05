import React, { useContext, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../components/Post';
import { Form, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons'; // Importiamo l'icona di upload
import { ThemeContext } from '../context/ThemeContext';
import './Feed.css';

function Feed() {
  const { isDarkMode } = useContext(ThemeContext);
  const [posts, setPosts] = useState([
    { id: 1, username: 'GiuppyUser1', content: 'Il mio primo post!', imageUrl: null },
    { id: 2, username: 'GiuppyUser2', content: 'Ciao dal cosmo!', imageUrl: null },
  ]);
  const [newPost, setNewPost] = useState('');
  const [image, setImage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPostObj = {
      id: posts.length + 1,
      username: 'GiuppyUser3',
      content: newPost,
      imageUrl: image ? URL.createObjectURL(image) : null,
    };
    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setImage(null);
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

      <Form onSubmit={handleSubmit} className="post-form d-flex align-items-center">
        {/* Immagine del profilo a sinistra */}
        <div className="profile-img-container">
          <img src="profile-image-url.jpg" alt="Profile" className="profile-img" />
        </div>

        {/* Area di testo al centro */}
        <div className="flex-grow-1">
          <Form.Control
            as="textarea"
            rows={1}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="A cosa stai pensando?"
            className="input-text"
          />
        </div>

        {/* Icona per il caricamento dell'immagine */}
        <div className="upload-icon-container">
          <label htmlFor="formFile" className="upload-label">
            <FontAwesomeIcon icon={faUpload} className="upload-icon" />
          </label>
          <input
            accept="image/*"
            type="file"
            id="formFile"
            className="form-control file-input"
            onChange={(e) => setImage(e.target.files[0])}
            hidden
          />
        </div>
      </Form>

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
    </Container>
  );
}

export default Feed;
