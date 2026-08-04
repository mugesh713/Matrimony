import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: 'male',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('gender', formData.gender);
    if (file) data.append('profilePic', file);

    try {
      const res = await API.post('/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @media (max-width: 480px) {
          .reg-card {
            padding: 20px 16px !important;
            border-radius: 12px !important;
          }
          .reg-gender-btn {
            padding: 8px 4px !important;
            font-size: 12px !important;
          }
        }
      `}</style>

      <div style={styles.card} className="reg-card">
        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join us today! Fill in your details below.</p>
        </div>

        {error && <div style={styles.errorBadge}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.avatarContainer}>
            <label htmlFor="profilePic" style={styles.avatarLabel}>
              {preview ? (
                <img src={preview} alt="Preview" style={styles.avatarImg} />
              ) : (
                <div style={styles.avatarPlaceholder}>
                  <span style={{ fontSize: '24px' }}>📷</span>
                  <span style={{ fontSize: '11px', marginTop: '4px' }}>Upload Pic</span>
                </div>
              )}
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              required
              style={styles.input}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

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

          <div style={styles.inputGroup}>
            <label style={styles.label}>Gender</label>
            <div style={styles.genderGroup}>
              {['male', 'female', 'other'].map((g) => (
                <button
                  type="button"
                  key={g}
                  className="reg-gender-btn"
                  style={{
                    ...styles.genderBtn,
                    ...(formData.gender === g ? styles.genderBtnActive : {}),
                  }}
                  onClick={() => setFormData({ ...formData, gender: g })}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>
            Sign In
          </Link>
        </p>
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
    padding: '16px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    padding: '32px',
    boxSizing: 'border-box',
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
    gap: '16px',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  avatarLabel: {
    cursor: 'pointer',
  },
  avatarPlaceholder: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#f4f7fe',
    border: '2px dashed #4318ff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4318ff',
  },
  avatarImg: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #4318ff',
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
    boxSizing: 'border-box',
    width: '100%'
  },
  genderGroup: {
    display: 'flex',
    gap: '8px',
  },
  genderBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #e0e5f2',
    backgroundColor: '#fff',
    color: '#2b3674',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  genderBtnActive: {
    backgroundColor: '#4318ff',
    color: '#fff',
    borderColor: '#4318ff',
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: '8px',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#4318ff',
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
