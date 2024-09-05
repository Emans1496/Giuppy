import React from 'react';
import Post from '../components/Post';

function Feed() {
  // Questo array simulerà i post che verranno ottenuti dal backend
  const mockPosts = [
    { id: 1, username: 'GiuppyUser1', content: 'Primo post!' },
    { id: 2, username: 'GiuppyUser2', content: 'Ciao dal cosmo!' },
  ];

  return (
    <div className="feed-container">
      <h2>Feed</h2>
      <div className="posts-list">
        {mockPosts.map((post) => (
          <Post key={post.id} username={post.username} content={post.content} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
