// frontend/src/components/Header/Header.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import './header.css';

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/path/to/your/logo.png" alt="App Logo" />
        </Link>
        <div className="hamburger-menu" onClick={toggleMenu}>
          &#9776;
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            <button className="auth-button" onClick={openLoginModal}>Log In</button>
            <button className="auth-button" onClick={openSignupModal}>Sign Up</button>
          </div>
        )}
      </div>
      {showLoginModal && <LoginFormPage onClose={closeLoginModal} />}
      {showSignupModal && <SignupFormPage onClose={closeSignupModal} />}
    </header>
  );
}

export default Header;
