import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

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

  const handleCardKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate('/search');
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: '#2d3748', backgroundColor: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Dynamic CSS Styles & Mobile Animations */}
      <style>{`
        @keyframes subtleScale {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatImage {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animated-service-card {
          animation: subtleScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animated-service-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(212, 175, 55, 0.3);
        }

        .animated-service-card:hover .service-img {
          transform: scale(1.08);
        }

        .custom-select option {
          color: #222 !important;
          background-color: #fff !important;
        }

        /* --- Team Card Animations --- */
        .team-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid #e2e8f0;
        }

        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
          border-color: #f59e0b;
        }

        .team-card:hover .team-img {
          transform: scale(1.06);
        }

        /* --- Footer Interactivity --- */
        .footer-link {
          transition: all 0.2s ease;
          display: inline-block;
        }

        .footer-link:hover {
          color: #fbbf24 !important;
          transform: translateX(4px);
        }

        .social-btn {
          transition: all 0.3s ease;
        }

        .social-btn:hover {
          background-color: #dc2626 !important;
          transform: translateY(-4px) rotate(6deg);
        }

        .floating-welcome-img {
          animation: floatImage 6s ease-in-out infinite;
        }

        /* --- Mobile Responsiveness Adjustments --- */
        @media (max-width: 768px) {
          .top-header-bar {
            flex-direction: column;
            gap: 8px;
            padding: 10px 16px !important;
            text-align: center;
          }
          .hero-title {
            font-size: 32px !important;
          }
          .hero-subtitle {
            font-size: 15px !important;
            margin-bottom: 24px !important;
          }
          .search-form-container {
            flex-direction: column !important;
            padding: 16px !important;
            gap: 12px !important;
          }
          .search-form-container select, 
          .search-form-container input, 
          .search-form-container button {
            width: 100% !important;
            min-width: 100% !important;
            box-sizing: border-box;
          }
          .responsive-section {
            padding: 45px 16px !important;
          }
          .welcome-container {
            padding: 40px 16px !important;
            gap: 30px !important;
          }
          .floating-card-badge {
            bottom: -15px !important;
            right: 10px !important;
            padding: 10px 16px !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            text-align: center !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {/* 1. TOP UTILITY HEADER BAR */}
      <header className="top-header-bar" style={{ backgroundColor: '#2d1810', color: '#e2e8f0', padding: '8px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', gap: '20px', fontWeight: '500' }}>
          <span style={{ cursor: 'pointer' }}>🔍 About</span>
          <span style={{ cursor: 'pointer' }}>FAQ</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', opacity: 0.9, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span>📞 +91 94455 55941</span>
          <span>✉️ help@varam.app</span>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section style={{ position: 'relative', minHeight: '520px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', textAlign: 'center', padding: '40px 20px', overflow: 'hidden' }}>
        {heroImages.map((img, index) => (
          <div key={index} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.75) 100%), url('${img}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: index === currentSlide ? 1 : 0, transition: 'opacity 1.2s ease-in-out', zIndex: 1 }} />
        ))}

        <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '30px', padding: '6px 18px', marginBottom: '16px' }}>
            <p style={{ color: '#f59e0b', fontWeight: '700', fontSize: '12px', letterSpacing: '1.5px', margin: 0, textTransform: 'uppercase' }}>#1 KONGU MATRIMONY PLATFORM</p>
          </div>

          <h1 className="hero-title" style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 12px 0', fontFamily: 'Georgia, serif' }}>
            Find Your <span style={{ color: '#ef4444', textDecoration: 'underline decoration-wavy 2px' }}>Right Match</span> Here
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '40px', maxWidth: '600px', fontWeight: '300' }}>
            Most trusted Kongu Vellalar Gounder's Matrimony connecting souls worldwide.
          </p>

          <form onSubmit={handleSearch} className="search-form-container" style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '20px', borderRadius: '12px', display: 'flex', gap: '12px', flexWrap: 'wrap', maxWidth: '1050px', width: '100%', alignItems: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
            <select className="custom-select" value={gender} onChange={(e) => setGender(e.target.value)} style={{ flex: 1, padding: '12px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b', fontSize: '14px', fontWeight: '500', minWidth: '160px', outline: 'none' }}>
              <option value="female">Looking for Bride</option>
              <option value="male">Looking for Groom</option>
            </select>

            <select className="custom-select" value={age} onChange={(e) => setAge(e.target.value)} style={{ flex: 1, padding: '12px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b', fontSize: '14px', fontWeight: '500', minWidth: '150px', outline: 'none' }}>
              <option value="" disabled>Select Age Range</option>
              <option value="18-25">18 - 25 Yrs</option>
              <option value="26-32">26 - 32 Yrs</option>
              <option value="33+">33+ Yrs</option>
            </select>

            <select className="custom-select" value={education} onChange={(e) => setEducation(e.target.value)} style={{ flex: 1, padding: '12px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b', fontSize: '14px', fontWeight: '500', minWidth: '160px', outline: 'none' }}>
              <option value="" disabled>Select Education</option>
              <option value="BE_BTech">B.E / B.Tech</option>
              <option value="Arts_Science">Arts & Science</option>
              <option value="Post_Graduate">Post Graduate</option>
              <option value="Doctorate">Doctorate / Others</option>
            </select>

            <input type="text" placeholder="Enter District (e.g., Tiruppur)" value={district} onChange={(e) => setDistrict(e.target.value)} style={{ flex: 1.2, padding: '12px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b', fontSize: '14px', fontWeight: '500', minWidth: '180px', outline: 'none' }} />

            <button type="submit" style={{ backgroundColor: '#0284c7', color: '#ffffff', border: 'none', padding: '12px 36px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>
              Search
            </button>
          </form>
        </div>
      </section>

      {/* 3. OUR SERVICES */}
      <section className="responsive-section" style={{ backgroundColor: '#0f172a', color: '#fff', padding: '70px 20px', textAlign: 'center' }}>
        <p style={{ color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', fontWeight: '700', margin: 0 }}>EXPLORE FEATURES</p>
        <h2 style={{ fontSize: '32px', fontFamily: 'Georgia, serif', margin: '8px 0 35px 0', color: '#fbbf24' }}>Our Services 🌿</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { title: 'Join Now', sub: 'Start for free', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80', btn: 'Start for Free' },
            { title: 'Photo Gallery', sub: '1200+ Verified Profiles', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80', btn: 'View Gallery' },
            { title: 'Blog & Articles', sub: 'Marriage Guidance & Tips', img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=400&q=80', btn: 'Read Articles' },
            { title: 'Browse Profiles', sub: 'Filtered Matchmaking', img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=400&q=80', btn: 'View Profiles' },
          ].map((item, idx) => (
            <div key={idx} className="animated-service-card" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer', display: 'flex', flexDirection: 'column', textAlign: 'left' }} onClick={() => navigate('/search')} role="button" tabIndex={0} onKeyDown={handleCardKeyDown}>
              <div style={{ overflow: 'hidden', height: '180px' }}>
                <img className="service-img" src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#f8fafc', fontWeight: '600' }}>{item.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 20px 0' }}>{item.sub}</p>
                </div>
                <button style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#f8fafc', padding: '8px 18px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', alignSelf: 'flex-start' }}>
                  {item.btn} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="responsive-section" style={{ backgroundColor: '#ffffff', padding: '70px 20px', textAlign: 'center' }}>
        <p style={{ color: '#991b1b', fontWeight: '700', letterSpacing: '1px', fontSize: '12px', margin: 0, textTransform: 'uppercase' }}>TESTIMONIALS</p>
        <h2 style={{ fontSize: '32px', color: '#0f172a', margin: '8px 0 35px 0', fontWeight: '700' }}>
          Trusted by <span style={{ color: '#991b1b' }}>1500+</span> Happy Couples
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '1050px', margin: '0 auto' }}>
          {[
            'நமது கொங்கு மக்கள் வாழும் தேசத்தில் வாழும் நபர்களுக்கு ஏற்ற வாழ்க்கைத் துணையை கண்டறிய இது ஒரு மிகச்சிறந்த தளம்.',
            'மற்ற திருமண தகவல் மையங்களைவிட மிக எளிதாகவும், குறைந்த கட்டணத்திலும் சேவை வழங்கப்படுகிறது.',
            'நான் என் துணைவியை நல் வாழ்கையின் தொடக்கமாக Varan.app மூலம் கண்டறிந்தேன்.'
          ].map((text, idx) => (
            <div key={idx} style={{ border: '1px solid #e2e8f0', padding: '24px', borderRadius: '12px', backgroundColor: '#f8fafc', textAlign: 'left', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.7', fontStyle: 'italic', margin: 0 }}>"{text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="responsive-section" style={{ backgroundColor: '#334155', color: '#fff', padding: '70px 20px', textAlign: 'center' }}>
        <p style={{ color: '#fbbf24', fontWeight: '700', margin: 0, fontSize: '12px', letterSpacing: '1px' }}>#1 KONGU VELLALAR GOUNDER'S MATRIMONY</p>
        <h2 style={{ fontSize: '32px', margin: '8px 0 12px 0', fontWeight: '700' }}>Why Choose Us</h2>
        <p style={{ color: '#cbd5e1', marginBottom: '35px', fontSize: '15px' }}>Most trusted and authentic matchmaking platform.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', maxWidth: '1050px', margin: '0 auto' }}>
          {[
            { title: 'Genuine Profiles', desc: 'No fake IDs, profiles are strictly 100% verified.' },
            { title: 'Most Trusted', desc: 'Verified family backgrounds and reliable data.' },
            { title: '2000+ Weddings', desc: 'Thousands of successful marriages created via Varam.' }
          ].map((card, idx) => (
            <div key={idx} style={{ backgroundColor: '#ffffff', color: '#1e293b', padding: '28px 20px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '18px', fontWeight: '600' }}>{card.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ENHANCED WELCOME SECTION */}
      <section className="welcome-container" style={{ padding: '80px 20px', maxWidth: '1150px', margin: '0 auto', display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap', position: 'relative' }}>
        <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
          {/* Subtle Glow Behind Image */}
          <div style={{ position: 'absolute', top: '-20px', left: '-20px', right: '20px', bottom: '20px', background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', borderRadius: '24px', opacity: 0.15, filter: 'blur(20px)' }} />
          
          <img
            className="floating-welcome-img"
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
            alt="Varam Couple"
            style={{ width: '100%', borderRadius: '20px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', position: 'relative', zIndex: 2 }}
          />

          {/* Floating Highlight Card */}
          <div className="floating-card-badge" style={{ position: 'absolute', bottom: '-20px', right: '-10px', zIndex: 3, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '12px 20px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>💍</span>
            <div>
              <p style={{ margin: 0, fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>100% Genuine</p>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Verified Kongu Profiles</p>
            </div>
          </div>
        </div>

        <div style={{ flex: 1.2, minWidth: '280px' }}>
          <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>ABOUT PLATFORM</span>
          <h2 style={{ fontSize: '32px', color: '#0f172a', margin: '14px 0', lineHeight: '1.2', fontWeight: '800', fontFamily: 'Georgia, serif' }}>
            WELCOME TO <br />
            <span style={{ background: 'linear-gradient(90deg, #991b1b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VARAM.APP</span>
          </h2>
          <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '14px' }}>
            A platform created to unify Kongu relationships across the globe.
            To begin your journey, <span style={{ color: '#dc2626', cursor: 'pointer', fontWeight: '700', textDecoration: 'underline' }} onClick={() => navigate('/register')}>click here to start...</span>
          </p>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px' }}>
            Varan Thedum Varam works with social responsibility in mind, assuring genuine and trustworthy profiles.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div style={{ border: '1px solid #e2e8f0', padding: '14px', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Enquiry</p>
              <p style={{ margin: '4px 0 0 0', fontWeight: '800', color: '#0f172a', fontSize: '15px' }}>+91 94455 55941</p>
            </div>
            <div style={{ border: '1px solid #e2e8f0', padding: '14px', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Get Support</p>
              <p style={{ margin: '4px 0 0 0', fontWeight: '800', color: '#0f172a', fontSize: '15px' }}>help@varam.app</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ENHANCED TEAM SECTION */}
      <section className="responsive-section" style={{ backgroundColor: '#f8fafc', padding: '70px 20px', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}>
        <p style={{ color: '#991b1b', fontWeight: '800', letterSpacing: '1.5px', fontSize: '12px', margin: 0, textTransform: 'uppercase' }}>
          OUR PROFESSIONALS
        </p>
        <h2 style={{ fontSize: '32px', color: '#0f172a', margin: '8px 0 40px 0', fontWeight: '800', fontFamily: 'Georgia, serif' }}>Meet Our Team</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { name: 'Dr. S. Karthik', role: 'Matchmaking Lead', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
            { name: 'P. Subramaniam', role: 'Senior Advisor', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
            { name: 'M. Revathi', role: 'Verification Expert', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
            { name: 'K. Lakshmi', role: 'Relationship Manager', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },
            { name: 'V. Ramesh', role: 'Community Head', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
          ].map((member, idx) => (
            <div key={idx} className="team-card" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff' }}>
              <div style={{ overflow: 'hidden', height: '180px' }}>
                <img className="team-img" src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
              </div>
              <div style={{ padding: '14px 10px' }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{member.name}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FOOTER SECTION */}
      <footer style={{ backgroundColor: '#0b0f19', color: '#94a3b8', borderTop: '1px solid #1e293b', padding: '50px 20px 30px 20px', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', textAlign: 'left' }}>
          
          {/* Column 1: Brand & Socials */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', marginBottom: '14px', fontFamily: 'Georgia, serif' }}>VARAM.APP</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#64748b', marginBottom: '16px' }}>
              Connecting hearts and unifying families with complete trust and authentic heritage.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['f', '▶', '📸', '💬'].map((icon, i) => (
                <button key={i} className="social-btn" style={{ backgroundColor: '#1e293b', color: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Get In Touch */}
          <div>
            <h4 style={{ color: '#f8fafc', marginBottom: '16px', fontSize: '14px', fontWeight: '700', letterSpacing: '0.5px' }}>GET IN TOUCH</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li className="footer-link" style={{ fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📍</span> Coimbatore, Tamil Nadu
              </li>
              <li className="footer-link" style={{ fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📞</span> +91 94455 55941
              </li>
              <li className="footer-link" style={{ fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✉️</span> help@varam.app
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div>
            <h4 style={{ color: '#f8fafc', marginBottom: '16px', fontSize: '14px', fontWeight: '700', letterSpacing: '0.5px' }}>HELP & SUPPORT</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li className="footer-link" style={{ fontSize: '13px', cursor: 'pointer' }}>About Company</li>
              <li className="footer-link" style={{ fontSize: '13px', cursor: 'pointer' }}>Privacy Policy</li>
              <li className="footer-link" style={{ fontSize: '13px', cursor: 'pointer' }}>Contact Us</li>
              <li className="footer-link" style={{ fontSize: '13px', cursor: 'pointer' }}>FAQs</li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar" style={{ borderTop: '1px solid #1e293b', marginTop: '40px', paddingTop: '24px', textAlign: 'center', fontSize: '13px', color: '#64748b', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1100px', margin: '40px auto 0 auto', gap: '12px' }}>
          <p style={{ margin: 0 }}>Copyright © 2026 varam.app | All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span>Ready to find your match?</span>
            <button onClick={() => navigate('/register')} style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
              Join Us Today
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
