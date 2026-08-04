

Go Pro
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
}

.logout-btn:hover {
background-color: #ef4444;
color: #ffffff;
border-color: #ef4444;
}

@media (max-width: 900px) {
.main-navbar {
flex-direction: column !important;
gap: 16px !important;
padding: 16px !important;
}
.nav-items-group {
flex-wrap: wrap !important;
justify-content: center !important;
gap: 12px !important;
}
}
`}</style>

{/* 1. TOP UTILITY STRIP FOR PHONE / EMAIL */}



{/* 2. MAIN HEADER (LOGO + HOME | SEARCH | PLANS | CONTACT | PROFILE | LOGOUT) */}
<header className="main-navbar" style={{ backgroundColor: '#ffffff', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
{/* Brand Logo */}
<div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => navigate('/')}>
<span style={{ fontSize: '24px' }}>👣</span>
<div style={{ lineHeight: '1.1' }}>
<span style={{ color: '#991b1b', fontWeight: '900', fontSize: '18px', display: 'block', letterSpacing: '1px' }}>VARAN THEDUM</span>
<span style={{ color: '#991b1b', fontWeight: '900', fontSize: '18px', display: 'block', letterSpacing: '1px' }}>VARAM</span>
</div>
</div>

{/* Navigation Items + Plans + Contact + Profile + Logout Grouped Together */}
<nav>
<div className="nav-items-group" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
<span className="nav-link active" onClick={() => navigate('/')}>HOME</span>
<span className="nav-link" onClick={() => navigate('/search')}>SEARCH PROFILES</span>
<span className="nav-link" onClick={() => navigate('/plans')}>PLANS</span>
<span className="nav-link" onClick={() => navigate('/contact')}>CONTACT</span>

{/* Profile & Logout placed right beside Plans and Contact */}
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

{/* 3. HERO SECTION */}
<section style={{ position: 'relative', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', textAlign: 'center', padding: '40px 20px', overflow: 'hidden' }}>
{heroImages.map((img, index) => (
<div key={index} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.75) 100%), url('${img}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: index === currentSlide ? 1 : 0, transition: 'opacity 1.2s ease-in-out', zIndex: 1 }} />
))}

<div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<div style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '30px', padding: '6px 18px', marginBottom: '16px' }}>
<p style={{ color: '#f59e0b', fontWeight: '700', fontSize: '12px', letterSpacing: '1.5px', margin: 0, textTransform: 'uppercase' }}>#1 KONGU MATRIMONY PLATFORM</p>
</div>

<h1 style={{ fontSize: '42px', fontWeight: '800', margin: '0 0 12px 0', fontFamily: 'Georgia, serif' }}>
Find Your <span style={{ color: '#ef4444', textDecoration: 'underline decoration-wavy 2px' }}>Right Match</span> Here
</h1>
<p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '35px', maxWidth: '600px', fontWeight: '300' }}>
Most trusted Kongu Vellalar Gounder's Matrimony connecting souls worldwide.
</p>

<form onSubmit={handleSearch} style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '20px', borderRadius: '12px', display: 'flex', gap: '12px', flexWrap: 'wrap', maxWidth: '1000px', width: '100%', alignItems: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
<select className="custom-select" value={gender} onChange={(e) => setGender(e.target.value)} style={{ flex: 1, padding: '12px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b', fontSize: '14px', fontWeight: '500', minWidth: '150px', outline: 'none' }}>
<option value="female">Looking for Bride</option>
<option value="male">Looking for Groom</option>
</select>

<select className="custom-select" value={age} onChange={(e) => setAge(e.target.value)} style={{ flex: 1, padding: '12px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b', fontSize: '14px', fontWeight: '500', minWidth: '150px', outline: 'none' }}>
<option value="" disabled>Select Age Range</option>
<option value="18-25">18 - 25 Yrs</option>
<option value="26-32">26 - 32 Yrs</option>
<option value="33+">33+ Yrs</option>
</select>

<select className="custom-select" value={education} onChange={(e) => setEducation(e.target.value)} style={{ flex: 1, padding: '12px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b', fontSize: '14px', fontWeight: '500', minWidth: '150px', outline: 'none' }}>
<option value="" disabled>Select Education</option>
<option value="BE_BTech">B.E / B.Tech</option>
<option value="Arts_Science">Arts & Science</option>
<option value="Post_Graduate">Post Graduate</option>
</select>

<input type="text" placeholder="Enter District" value={district} onChange={(e) => setDistrict(e.target.value)} style={{ flex: 1, padding: '12px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#1e293b', fontSize: '14px', fontWeight: '500', minWidth: '150px', outline: 'none' }} />

<button type="submit" style={{ backgroundColor: '#0284c7', color: '#ffffff', border: 'none', padding: '12px 32px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>
Search
</button>
</form>
</div>
</section>

{/* 4. FOOTER */}
<footer style={{ backgroundColor: '#0b0f19', color: '#94a3b8', borderTop: '1px solid #1e293b', padding: '40px 20px 20px 20px', textAlign: 'center' }}>
<p style={{ margin: 0, fontSize: '13px' }}>Copyright © 2026 varam.app | All rights reserved.</p>
</footer>
</div>
);
}
