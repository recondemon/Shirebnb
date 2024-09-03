import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './signupForm.css';

function SignupFormPage({ onClose }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dob, setDob] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordStrength, setPasswordStrength] = useState('');
	const [passwordStrengthColor, setPasswordStrengthColor] = useState(''); // New state for color
	const [errors, setErrors] = useState({});
	const [showPasswordError, setShowPasswordError] = useState(false);

	useEffect(() => {
		if (sessionUser) {
			onClose();
		}
	}, [sessionUser, onClose]);

	const evaluatePasswordStrength = password => {
		let strength = 'Weak';
		let color = 'red'; // Default color

		const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

		if (regexStrong.test(password)) {
			strength = 'Strong';
			color = 'green';
		} else if (regexMedium.test(password)) {
			strength = 'Medium';
			color = 'orange';
		}

		setPasswordStrength(strength);
		setPasswordStrengthColor(color);
	};

	const handlePasswordChange = e => {
		const value = e.target.value;
		setPassword(value);
		if (value) {
			evaluatePasswordStrength(value);
		} else {
			setPasswordStrength('');
			setPasswordStrengthColor('');
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		setErrors({});
		setShowPasswordError(true);

		if (password !== confirmPassword) {
			setErrors(prevErrors => ({
				...prevErrors,
				confirmPassword: 'Passwords do not match.',
			}));
			return;
		}

		if (passwordStrength !== 'Strong') {
			setErrors(prevErrors => ({
				...prevErrors,
				password:
					'Password is not strong enough. Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
			}));
			return;
		}

		return dispatch(
			sessionActions.signup({
				email,
				username,
				firstName,
				lastName,
				dob,
				password,
			})
		).catch(async res => {
			const data = await res.json();
			if (data?.errors) setErrors(data.errors);
		});
	};

	const isFormComplete = () => {
		return (
			email &&
			username &&
			firstName &&
			lastName &&
			dob &&
			password &&
			confirmPassword
		);
	};

	return (
		<div className="signup-modal-overlay">
			<div className="signup-modal-content">
				<button className="signup-close-button" onClick={onClose}>
					&times;
				</button>
				<h1 className="signup-header">Sign Up</h1>
				<form onSubmit={handleSubmit} className="signup-form">
					<div className="signup-name-group">
						<input
							type="text"
							placeholder="First Name"
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
							required
							className="signup-input"
						/>
						<input
							type="text"
							placeholder="Last Name"
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							required
							className="signup-input"
						/>
					</div>
					<div className="signup-username-dob">
						<input
							type="text"
							placeholder="Username"
							value={username}
							onChange={e => setUsername(e.target.value)}
							required
							className="signup-input"
						/>
						<input
							className="signup-dob-input signup-input"
							type="date"
							placeholder="Date of Birth"
							value={dob}
							onChange={e => setDob(e.target.value)}
							required
						/>
					</div>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						className="signup-input"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={handlePasswordChange}
						required
						className="signup-input"
					/>
					{password && (
						<p
							className="signup-password-strength"
							style={{ color: passwordStrengthColor }}
						>
							Password strength: {passwordStrength}
						</p>
					)}
					{showPasswordError && errors.password && (
						<p className="signup-error-message">{errors.password}</p>
					)}
					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						required
						className="signup-input"
					/>
					{showPasswordError && errors.confirmPassword && (
						<p className="signup-error-message">{errors.confirmPassword}</p>
					)}
					{errors.email && (
						<p className="signup-error-message">{errors.email}</p>
					)}
					{errors.username && (
						<p className="signup-error-message">{errors.username}</p>
					)}
					<button
						type="submit"
						disabled={!isFormComplete()}
						className={
							!isFormComplete() ? 'signup-disabled-button' : 'signup-button'
						}
					>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignupFormPage;
