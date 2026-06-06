import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      onLoginSuccess(result.user);
    } else {
      setError(result.message || 'Invalid email or password');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-bg-circle login-bg-circle--top"></div>
      <div className="login-bg-circle login-bg-circle--bottom"></div>

      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-mark">AB</div>
          <div className="login-logo-info">
            <div className="login-logo-text">AussieBuild</div>
            <div className="login-logo-sub">Compliance & Asset Tracking</div>
          </div>
        </div>

        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Sign in to your site dashboard</p>

        {error && (
          <div className="login-error">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input
              className="form-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in to dashboard →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;