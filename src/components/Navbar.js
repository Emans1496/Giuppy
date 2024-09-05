import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBell, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar({ onPostClick }) {
  return (
    <nav className="bottom-navbar">
      <ul className="navbar-menu">
        {/* Feed */}
        <li>
          <a href="/feed">
            <FontAwesomeIcon icon={faHome} className="navbar-icon" />
            <span>Feed</span>
          </a>
        </li>

        {/* Cerca */}
        <li>
          <a href="/search">
            <FontAwesomeIcon icon={faSearch} className="navbar-icon" />
            <span>Cerca</span>
          </a>
        </li>

        {/* Post */}
        <li>
          <button className="navbar-button" onClick={onPostClick}>
            <FontAwesomeIcon icon={faPlus} className="navbar-icon" />
            <span>Post</span>
          </button>
        </li>

        {/* Notifiche */}
        <li>
          <a href="/notifications">
            <FontAwesomeIcon icon={faBell} className="navbar-icon" />
            <span>Notifiche</span>
          </a>
        </li>

        {/* Profilo */}
        <li>
          <a href="/profile">
            <FontAwesomeIcon icon={faUser} className="navbar-icon" />
            <span>Profilo</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
