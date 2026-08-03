import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isAdminLogin ? '/admin/login' : '/auth/login';

    try {
      const res = await API.post(endpoint, formData);
      const userData = res.data.user || res.data.admin;
      login(userData, res.data.token);

      if (isAdminLogin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Login Type Switcher Tabs */}
        <div style={styles.tabContainer}>
          <button
            type="button"
            style={{
              ...styles.tab,
              ...(!isAdminLogin ? styles.activeTab : {}),
            }}
            onClick={() => {
              setIsAdminLogin(false);
              setError('');
            }}
          >
            User Login
          </button>
          <button
            type="button"
            style={{
              ...styles.tab,
              ...(isAdminLogin ? styles.activeTab : {}),
            }}
            onClick={() => {
              setIsAdminLogin(true);
              setError('');
            }}
          >
            Admin Login
          </button>
        </div>

        <div style={styles.header}>
          <h2 style={styles.title}>
            {isAdminLogin ? 'Admin Portal' : 'Welcome Back'}
          </h2>
          <p style={styles.subtitle}>
            Enter your email and password to access your account.
          </p>
        </div>

        {error && <div style={styles.errorBadge}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              required
              style={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              style={styles.input}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.submitBtn,
              backgroundColor: isAdminLogin ? '#1b2559' : '#4318ff',
            }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : isAdminLogin ? 'Login as Admin' : 'Sign In'}
          </button>
        </form>

        {!isAdminLogin && (
          <p style={styles.footerText}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.link}>
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f7fe',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    padding: '32px',
    boxSizing: 'border-box',
  },
  tabContainer: {
    display: 'flex',
    backgroundColor: '#f4f7fe',
    borderRadius: '10px',
    padding: '4px',
    marginBottom: '24px',
  },
  tab: {
    flex: 1,
    padding: '10px',
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#a3aed0',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  activeTab: {
    backgroundColor: '#ffffff',
    color: '#2b3674',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
    color: '#1b2559',
  },
  subtitle: {
    marginTop: '6px',
    fontSize: '14px',
    color: '#a3aed0',
  },
  errorBadge: {
    backgroundColor: '#fff2f2',
    color: '#e53e3e',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '20px',
    border: '1px solid #fed7d7',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#2b3674',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid #e0e5f2',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  submitBtn: {
    marginTop: '6px',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  footerText: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#7090b0',
  },
  link: {
    color: '#4318ff',
    fontWeight: '600',
    textDecoration: 'none',
  },
};