import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './header.css';

Modal.setAppElement('#root');

function Header() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await dispatch(sessionActions.login({ credential, password }));
      setIsModalOpen(false);
    } catch (res) {
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
    }
  };

  const handleDemoLogin = async () => {
    setErrors([]);
    try {
      await dispatch(sessionActions.login({ credential: 'demo', password: 'password' }));
      setIsModalOpen(false);
    } catch (res) {
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCredential('');
    setPassword('');
    setErrors([]);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/path/to/your/logo.png" alt="App Logo" />
        </Link>
        <div className="auth-buttons">
          {sessionUser ? (
            <div>Welcome, {sessionUser.username}</div>
          ) : (
            <>
              <button onClick={() => setIsModalOpen(true)} className="auth-button">Log in</button>
              <Link to="/signup" className="auth-button">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.map((error, idx) => (
            <p key={idx} className="error">{error}</p>
          ))}
          <button type="submit" disabled={credential.length < 4 || password.length < 6}>
            Log In
          </button>
          <button type="button" onClick={handleDemoLogin}>
            Log in as Demo User
          </button>
        </form>
      </Modal>
    </header>
  );
}

export default Header;
