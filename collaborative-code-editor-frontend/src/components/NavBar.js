// src/components/NavBar.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './NavBar.css';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Collaborative Editor</div>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">{user.name}</span>
            <button onClick={logout} className="navbar-logout">Logout</button>
          </>
        ) : (
          <span>Login</span>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
