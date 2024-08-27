import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './signupForm.css';

function SignupFormPage({ onClose }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(''); // New DOB state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (sessionUser) {
      onClose();
    }
  }, [sessionUser, onClose]);

  const evaluatePasswordStrength = (password) => {
    let strength = 'Weak';
    let message = 'Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character.';
    
    const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (regexStrong.test(password)) {
      strength = 'Strong';
      message = 'Strong password!';
    } else if (regexMedium.test(password)) {
      strength = 'Medium';
      message = 'Password could be stronger. Consider adding special characters.';
    }

    setPasswordStrength(strength);
    setPasswordStrengthMessage(message);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    evaluatePasswordStrength(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match.',
      }));
      return;
    }

    if (passwordStrength !== 'Strong') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password is not strong enough.',
      }));
      return;
    }

    return dispatch(sessionActions.signup({ email, username, firstName, lastName, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='name-group'>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className='username-dob'>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className='dob-input'
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
       
        
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
            {passwordStrengthMessage}
          </p>
          {errors.password && <p className="error-message">{errors.password}</p>}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          {errors.email && <p className="error-message">{errors.email}</p>}
          {errors.username && <p className="error-message">{errors.username}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
