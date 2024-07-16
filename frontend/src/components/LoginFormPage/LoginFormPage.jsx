// frontend/src/components/LoginFormPage/LoginFormPage.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './loginForm.css';

function LoginFormPage({ onClose }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (sessionUser) {
      onClose();
    }
  }, [sessionUser, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemoLogin = () => {
    dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'demopassword' }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
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
          {errors.credential && <p className="error-message">{errors.credential}</p>}
          <button type="submit" disabled={credential.length < 4 || password.length < 6}>
            Log In
          </button>
          <button type="button" onClick={handleDemoLogin}>
            Log in as Demo User
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
