import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({ user: propUser, onLogout }) {
  const navigate = useNavigate();

  // Retrieve user from props or fallback to localStorage
  const [user, setUser] = useState(() => {
    if (propUser) return propUser;
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (propUser) setUser(propUser);
  }, [propUser]);

  // Search Form State
  const [gender, setGender] = useState('female');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [district, setDistrict] = useState('');

  // Hero Background Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (gender) params.gender = gender;
    if (age) params.age = age;
    if (education) params.education = education;
    if (district.trim()) params.district = district.trim();

    const queryParams = new URLSearchParams(params).toString();
    navigate(`/search?${queryParams}`);
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: '#2d3748', backgroundColor: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* CSS Styles */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
        }

        .custom-select option {
          color: #222 !important;
          background-color: #fff !important;
        }

        .nav-link {
          font-weight: 700;
          font-size: 14px;
          color: #2d3748;
          text-decoration: none;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s ease;
          white-space: nowrap;
        }

        .nav-link:hover, .nav-link.active {
          color: #d97706;
        }

        .header-profile-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          background: #f1f5f9;
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid #cbd5e1;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .header-profile-badge:hover {
          background: #e2e8f0;
          border-color: #d97706;
        }

        .logout-btn {
          background-color: transparent;
          color: #ef4444;
          border: 1px solid #fca5a5;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .logout-btn:hover {
          background-color: #ef4444;
          color: #ffffff;
          border-color: #ef4444;
        }

        .search-form {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }

        .search-form-field {
          flex: 1;
          min-width: 140px;
          padding: 12px 14px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          color: #1e293b;
          font-size: 14px;
          font-weight: 500;
          outline: none;
        }

        .search-btn {
          background-color: #0284c7;
          color: #ffffff;
          border: none;
          padding: 12px 32px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 15px;
          white-space: nowrap;
          transition: background-color 0.2s ease;
        }

        .search-btn:hover {
          background-color: #0369a1;
        }

        .search-btn:active {
          background-color: #02569b;
        }

        /* Tablet screens (768px and below) */
        @media (max-width: 768px) {
          .main-navbar {
            flex-direction: column !important;
            gap: 12px !important;
            padding: 12px 20px !important;
          }

          .nav-items-group {
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 10px !important;
            width: 100%;
          }

          .nav-link {
            font-size: 12px;
            padding: 4px 2px;
          }

          .header-profile-badge {
            font-size: 12px;
            padding: 4px 8px;
            gap: 6px;
          }

          .header-profile-badge img {
            width: 20px !important;
            height: 20px !important;
          }

          .logout-btn {
            font-size: 12px;
            padding: 4px 10px;
          }

          h1 {
            font-size: 32px !important;
          }

          .hero-subtitle {
            font-size: 14px !important;
          }

          .search-form {
            padding: 16px !important;
            gap: 10px !important;
          }

          .search-form-field {
            min-width: 120px;
            font-size: 13px;
          }

          .search-btn {
            padding: 10px 24px;
            font-size: 14px;
          }
        }

        /* Small tablets and large phones (640px and below) */
        @media (max-width: 640px) {
          .main-navbar {
            padding: 10px 16px !important;
          }

          .nav-link {
            font-size: 11px;
            padding: 2px 0;
          }

          .header-profile-badge {
            font-size: 11px;
            padding: 2px 6px;
            gap: 4px;
          }

          .header-profile-badge img,
          .header-profile-badge div {
            width: 18px !important;
            height: 18px !important;
          }

          .logout-btn {
            font-size: 11px;
            padding: 3px 8px;
          }

          h1 {
            font-size: 24px !important;
            margin: 0 0 8px 0 !important;
          }

          .hero-badge {
            padding: 4px 12px !important;
            font-size: 11px !important;
            margin-bottom: 12px !important;
          }

          .hero-subtitle {
            font-size: 13px !important;
            margin-bottom: 24px !important;
          }

          .search-form {
            flex-direction: column !important;
            padding: 12px !important;
            gap: 8px !important;
          }

          .search-form-field {
            width: 100%;
            min-width: unset;
            font-size: 13px;
          }

          .search-btn {
            width: 100%;
            padding: 10px 20px;
            font-size: 14px;
          }
        }

        /* Mobile phones (480px and below) */
        @media (max-width: 480px) {
          .main-navbar {
            padding: 8px 12px !important;
            gap: 8px !important;
          }

          .logo-text {
            font-size: 14px;
          }

          .logo-emoji {
            font-size: 20px;
          }

          .nav-items-group {
            gap: 6px !important;
          }

          .nav-link {
            font-size: 10px;
            padding: 2px 0;
            letter-spacing: 0.2px;
          }

          .header-profile-badge {
            font-size: 10px;
            padding: 2px 4px;
            gap: 3px;
          }

          .logout-btn {
            font-size: 10px;
            padding: 2px 6px;
          }

          .hero-section {
            min-height: 400px !important;
            padding: 24px 12px !important;
          }

          h1 {
            font-size: 20px !important;
            margin: 0 0 6px 0 !important;
            line-height: 1.3 !important;
          }

          .hero-badge {
            padding: 3px 10px !important;
            font-size: 10px !important;
            margin-bottom: 10px !important;
          }

          .hero-subtitle {
            font-size: 12px !important;
            margin-bottom: 16px !important;
            max-width: 100% !important;
          }

          .search-form {
            padding: 10px !important;
            gap: 6px !important;
          }

          .search-form-field {
            padding: 10px 10px !important;
            font-size: 12px !important;
            border-radius: 4px !important;
          }

          .search-btn {
            padding: 10px 16px;
            font-size: 13px;
          }
        }

        /* Extra small phones (360px and below) */
        @media (max-width: 360px) {
          .main-navbar {
            padding: 6px 8px !important;
            gap: 6px !important;
          }

          .logo-emoji {
            font-size: 18px;
          }

          .logo-text {
            font-size: 12px;
            line-height: 1;
          }

          .nav-link {
            font-size: 9px;
          }

          .hero-section {
            min-height: 350px !important;
            padding: 16px 8px !important;
          }

          h1 {
            font-size: 18px !important;
          }

          .search-form {
            padding: 8px !important;
          }

          .search-form-field {
            padding: 8px 8px !important;
            font-size: 11px !important;
          }
        }
      `}</style>

      {/* MAIN HEADER */}
      <header className="main-navbar" style={{ backgroundColor: '#ffffff', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        {/* Brand Logo */}
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => navigate('/')}>
          <span className="logo-emoji" style={{ fontSize: '24px' }}>👣</span>
          <div style={{ lineHeight: '1.1' }}>
            <span className="logo-text" style={{ color: '#991b1b', fontWeight: '900', fontSize: '18px', display: 'block', letterSpacing: '1px' }}>VARAN THEDUM</span>
            <span className="logo-text" style={{ color: '#991b1b', fontWeight: '900', fontSize: '18px', display: 'block', letterSpacing: '1px' }}>VARAM</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav>
          <div className="nav-items-group" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span className="nav-link active" onClick={() => navigate('/')}>HOME</span>
            <span className="nav-link" onClick={() => navigate('/search')}>SEARCH PROFILES</span>
            <span className="nav-link" onClick={() => navigate('/plans')}>PLANS</span>
            <span className="nav-link" onClick={() => navigate('/contact')}>CONTACT</span>

            {/* Profile & Logout */}
            {user ? (
              <>
                <div
                  className="header-profile-badge"
                  onClick={() => navigate(`/profile/${user._id || user.id || ''}`)}
                  title="View Profile"
                >
                  <img
                    src={user.profileImage?.url || user.profileImage || user.photo || 'https://via.placeholder.com/30'}
                    alt="Profile"
                    style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                    {user.name || user.firstName || 'ABCD Q'}
                  </span>
                </div>

                <button className="logout-btn" onClick={handleLogoutClick}>
                  Logout
                </button>
              </>
            ) : (
              <span className="nav-link" style={{ color: '#0284c7' }} onClick={() => navigate('/login')}>
                LOGIN
              </span>
            )}
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section" style={{ position: 'relative', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', textAlign: 'center', padding: '40px 20px', overflow: 'hidden' }}>
        {heroImages.map((img, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.75) 100%), url('${img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              zIndex: 1
            }}
          />
        ))}

        <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 12px' }}>
          <div className="hero-badge" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '30px', padding: '6px 18px', marginBottom: '16px' }}>
            <p style={{ color: '#f59e0b', fontWeight: '700', fontSize: '12px', letterSpacing: '1.5px', margin: 0, textTransform: 'uppercase' }}>#1 KONGU MATRIMONY PLATFORM</p>
          </div>

          <h1 style={{ fontSize: '42px', fontWeight: '800', margin: '0 0 12px 0', fontFamily: 'Georgia, serif' }}>
            Find Your <span style={{ color: '#ef4444', textDecoration: 'underline decoration-wavy 2px' }}>Right Match</span> Here
          </h1>

          <p className="hero-subtitle" style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '35px', maxWidth: '600px', fontWeight: '300' }}>
            Most trusted Kongu Vellalar Gounder's Matrimony connecting souls worldwide.
          </p>

          <form onSubmit={handleSearch} className="search-form" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '20px', borderRadius: '12px', maxWidth: '1000px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
            <select className="custom-select search-form-field" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="female">Looking for Bride</option>
              <option value="male">Looking for Groom</option>
            </select>

            <select className="custom-select search-form-field" value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="" disabled>Select Age Range</option>
              <option value="18-25">18 - 25 Yrs</option>
              <option value="26-32">26 - 32 Yrs</option>
              <option value="33+">33+ Yrs</option>
            </select>

            <select className="custom-select search-form-field" value={education} onChange={(e) => setEducation(e.target.value)}>
              <option value="" disabled>Select Education</option>
              <option value="BE_BTech">B.E / B.Tech</option>
              <option value="Arts_Science">Arts & Science</option>
              <option value="Post_Graduate">Post Graduate</option>
            </select>

            <input
              type="text"
              className="search-form-field"
              placeholder="Enter District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />

            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#0b0f19', color: '#94a3b8', borderTop: '1px solid #1e293b', padding: '40px 20px 20px 20px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '13px' }}>Copyright © 2026 varam.app | All rights reserved.</p>
      </footer>
    </div>
  );
}
