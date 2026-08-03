import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import SearchProfiles from './pages/SearchProfiles';
import Plans from './pages/Plans';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import { AppProvider } from './AppContext';
import AdminPanel from './pages/AdminPanel';
import FullProfileView from './pages/FullProfileView';

// Guard component to protect admin routes
const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Custom NavLink without emojis/icons
function CustomNavLink({ to, children, activeColor = '#e65100' }) {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === to;

  const style = {
    textDecoration: 'none',
    color: isActive ? activeColor : hovered ? activeColor : '#333333',
    padding: '8px 4px',
    transition: 'all 0.25s ease-in-out',
    position: 'relative',
    display: 'inline-block',
    fontWeight: '700',
    fontSize: '14px',
    letterSpacing: '0.5px'
  };

  return (
    <Link
      to={to}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <span
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          right: '0px',
          height: '2px',
          backgroundColor: activeColor,
          transform: isActive || hovered ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.25s ease-in-out',
          transformOrigin: 'left'
        }}
      />
    </Link>
  );
}

function Navbar() {
  const { user } = useAuth();

  const rawPic =
    typeof user?.profilePic === 'object'
      ? user?.profilePic?.url
      : user?.profilePic;

  const profilePicUrl = rawPic && rawPic.trim() !== '' ? rawPic : null;
  const displayName = user?.name || user?.username || user?.email?.split('@')[0] || 'PROFILE';

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between', /* Fixed key typo: 'justify' -> 'justifyContent' */
        alignItems: 'center',
        padding: '15px 40px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      {/* Brand Logo - Aligned Left */}
      <Link to="/" style={{ textDecoration: 'none', fontSize: '22px', fontWeight: 'bold', color: '#8b0000' }}>
        👣 VARAN <span style={{ color: '#d9534f' }}>THEDUM VARAM</span>
      </Link>

      {/* Navigation Links & Profile - Aligned Far Right */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginLeft: 'auto' }}>
        <CustomNavLink to="/">HOME</CustomNavLink>
        <CustomNavLink to="/search">SEARCH PROFILES</CustomNavLink>
        <CustomNavLink to="/plans">PLANS</CustomNavLink>
        <CustomNavLink to="/contact">CONTACT US</CustomNavLink>

        {user ? (
          <>
            {user.role === 'admin' && (
              <CustomNavLink to="/admin/dashboard" activeColor="#111827">ADMIN PANEL</CustomNavLink>
            )}

            {/* Profile Tab */}
            <Link
              to="/profile"
              style={{
                textDecoration: 'none',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px',
                borderRadius: '20px',
                transition: 'background-color 0.2s ease',
                marginLeft: '8px'
              }}
            >
              {profilePicUrl ? (
                <img
                  src={profilePicUrl}
                  alt={displayName}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid #0284c7'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: '700',
                    border: '1.5px solid #0284c7'
                  }}
                >
                  {getInitials(user.name)}
                </div>
              )}
              <span style={{ fontWeight: '700', fontSize: '14px' }}>{displayName.toUpperCase()}</span>
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              backgroundColor: '#007bff',
              color: '#ffffff',
              padding: '8px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '14px',
              marginLeft: '8px'
            }}
          >
            🔒 Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchProfiles />} />
            <Route path="/profile/:id" element={<FullProfileView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminPanel />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/panel"
              element={
                <ProtectedAdminRoute>
                  <AdminPanel />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}