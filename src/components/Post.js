import React, { useContext, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { ThemeContext } from '../context/ThemeContext';  // Importiamo il contesto del tema
import './Post.css';

function Post({ username, content, imageUrl }) {
  const { isDarkMode } = useContext(ThemeContext);  // Otteniamo il tema corrente
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentObj = {
      id: comments.length + 1,
      text: newComment,
    };
    setComments([...comments, commentObj]);
    setNewComment('');
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleLike = () => {
    setLikes(likes + 1);
    setLiked(true);
    setTimeout(() => setLiked(false), 300);
  };

  return (
    <Card className={`post ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Card.Body>
        <Card.Title>{username}</Card.Title>
        <Card.Text>{content}</Card.Text>

        {imageUrl && <img src={imageUrl} alt="Post image" className="post-image" loading="lazy" />}

        <div className="star-rating mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>

        <Button
          variant="primary"
          className={`mb-3 like-button ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          Mi Piace ({likes})
        </Button>

        <div className="comments-section mb-3">
          {comments.map((comment) => (
            <p key={comment.id}><strong>Commento:</strong> {comment.text}</p>
          ))}
        </div>

        <Form onSubmit={handleCommentSubmit}>
          <Form.Group controlId="newComment">
            <Form.Control
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Scrivi un commento..."
            />
          </Form.Group>
          <Button variant="secondary" type="submit" className="mt-2 w-100">
            Aggiungi Commento
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Post;
