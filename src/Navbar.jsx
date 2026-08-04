import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <style>{`
        @media (max-width: 768px) {
          .nav-container {
            padding: 10px 15px !important;
          }
          .nav-links {
            display: ${mobileMenuOpen ? 'flex' : 'none'} !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #ffffff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            padding: 15px 0;
            z-index: 999;
          }
          .nav-links a, .nav-links button {
            padding: 10px 20px;
            width: 100%;
            text-align: left;
            box-sizing: border-box;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>

      <div style={styles.brand} onClick={() => navigate('/')}>
        <img 
          src="/logo.png" 
          alt="Logo" 
          style={styles.logo} 
          onError={(e) => { e.target.style.display = 'none'; }} 
        />
        <span style={styles.brandTitle}>VARAN THEDUM VARAM</span>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button 
        className="mobile-toggle" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={styles.hamburgerBtn}
      >
        ☰
      </button>

      {/* Links Container */}
      <div className="nav-links" style={styles.linksContainer}>
        <Link to="/" style={styles.link} onClick={() => setMobileMenuOpen(false)}>HOME</Link>
        <Link to="/profiles" style={styles.link} onClick={() => setMobileMenuOpen(false)}>SEARCH PROFILES</Link>
        <Link to="/plans" style={styles.link} onClick={() => setMobileMenuOpen(false)}>PLANS</Link>
        <Link to="/contact" style={styles.link} onClick={() => setMobileMenuOpen(false)}>CONTACT</Link>

        {/* User Profile Section */}
        {user ? (
          <div style={styles.userSection}>
            <button 
              onClick={() => { navigate(`/profile/${user._id || user.id}`); setMobileMenuOpen(false); }}
              style={styles.profileBtn}
            >
              <img 
                src={user.profileImage?.url || user.profileImage || user.photo?.url || user.photo || 'https://via.placeholder.com/35'} 
                alt="Profile" 
                style={styles.avatar} 
              />
              <span style={styles.userName}>{user.name || 'My Profile'}</span>
            </button>
            <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} style={styles.loginBtn}>Login</button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 25px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxSizing: 'border-box',
    width: '100%',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  logo: {
    height: '35px',
  },
  brandTitle: {
    fontWeight: 'bold',
    color: '#7a1c1c',
    fontSize: '18px',
  },
  hamburgerBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    color: '#333',
  },
  linksContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '600',
    fontSize: '13px',
    letterSpacing: '0.5px',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  profileBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid #7a1c1c',
  },
  userName: {
    fontWeight: '600',
    fontSize: '13px',
    color: '#333',
  },
  loginBtn: {
    backgroundColor: '#7a1c1c',
    color: '#fff',
    border: 'none',
    padding: '7px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  logoutBtn: {
    backgroundColor: '#f4f4f4',
    color: '#555',
    border: '1px solid #ccc',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
};
