import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with email and password:', error);
      setError('Failed to sign in. Please check your email and password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to NeuroAI</h1>
        <p className="login-subtitle">Sign in to access your dashboard</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleEmailSignIn} className="login-form">
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
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="email-sign-in-button">
            Sign in with Email
          </button>
        </form>
        <div className="divider">
          <span>OR</span>
        </div>
        <button className="google-sign-in-button" onClick={handleGoogleSignIn}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="google-logo"
          />
          Sign in with Google
        </button>
        <div className="sign-up-option">
          <p>Don't have an account?</p>
          <Link to="/register" className="sign-up-link">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

