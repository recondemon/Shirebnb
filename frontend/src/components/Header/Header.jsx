import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { logout } from '../../store/session';
import LoginFormPage from '../LoginFormPage/LoginFormPage';
import SignupFormPage from '../SignupFormPage/SignupFormPage';
import './header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/');
    });
    setMenuOpen(false);
  };

  const handleClickOutside = useCallback(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [menuOpen]);

  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen, handleClickOutside]);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="App Logo" />
          <h1>Shirebnb</h1>
        </Link>
        <div className="right-section">
          {sessionUser && (
            <Link to="/spots/new" className="create-spot-link">Create a New Spot</Link>
          )
          }
          <div className="icon-group" onClick={toggleMenu}>
            <div className="hamburger-menu">&#9776;</div>
            <User className="user-icon" />
          </div>
          {menuOpen && (
            <div className="dropdown-menu" onClick={handleMenuClick}>
              {sessionUser ? (
                <>
                  <p>Hello, {sessionUser.firstName}</p>
                  <p>{sessionUser.email}</p>
                  <hr />
                  <Link to="/manage-spots" className="dropdown-link" onClick={() => setMenuOpen(false)}>Manage Spots</Link>
                  <hr />
                  <button className="auth-button" onClick={handleLogout}>Log Out</button>
                </>
              ) : (
                <>
                  <button className="auth-button" onClick={openLoginModal}>Log In</button>
                  <button className="auth-button" onClick={openSignupModal}>Sign Up</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {showLoginModal && <LoginFormPage onClose={closeLoginModal} />}
      {showSignupModal && <SignupFormPage onClose={closeSignupModal} />}
    </header>
  );
}

export default Header;
