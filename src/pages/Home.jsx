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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden">
      {/* Embedded Animations */}
      <style>{`
        @keyframes floatImage {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .floating-welcome-img {
          animation: floatImage 6s ease-in-out infinite;
        }
      `}</style>

      {/* 1. TOP UTILITY HEADER BAR */}
      <header className="bg-[#2d1810] text-slate-200 text-xs sm:text-sm px-4 sm:px-10 py-2.5 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-white/10">
        <div className="flex gap-4 font-medium">
          <span className="cursor-pointer hover:text-amber-400 transition">🔍 About</span>
          <span className="cursor-pointer hover:text-amber-400 transition">FAQ</span>
          <span className="cursor-pointer hover:text-amber-400 transition">Contact</span>
        </div>
        <div className="flex gap-4 opacity-90 text-xs">
          <span>📞 +91 94455 55941</span>
          <span>✉️ help@varam.app</span>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[550px] sm:min-h-[580px] flex flex-col justify-center items-center text-white text-center px-4 py-10 sm:py-16 overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.80) 100%), url('${img}')`,
              opacity: index === currentSlide ? 1 : 0,
              zIndex: 1
            }}
          />
        ))}

        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
          <div className="bg-amber-500/15 border border-amber-500/40 rounded-full px-4 py-1.5 mb-4">
            <p className="text-amber-400 font-bold text-xs tracking-widest uppercase">
              #1 KONGU MATRIMONY PLATFORM
            </p>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-3 font-serif leading-tight">
            Find Your <span className="text-red-500 underline decoration-wavy decoration-2">Right Match</span> Here
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 mb-8 max-w-xl font-light">
            Most trusted Kongu Vellalar Gounder's Matrimony connecting souls worldwide.
          </p>

          {/* MOBILE RESPONSIVE SEARCH FORM */}
          <form
            onSubmit={handleSearch}
            className="bg-slate-900/80 backdrop-blur-md border border-white/15 p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row gap-3 w-full max-w-4xl items-stretch md:items-center shadow-2xl"
          >
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="female">Looking for Bride</option>
              <option value="male">Looking for Groom</option>
            </select>

            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="" disabled>Select Age Range</option>
              <option value="18-25">18 - 25 Yrs</option>
              <option value="26-32">26 - 32 Yrs</option>
              <option value="33+">33+ Yrs</option>
            </select>

            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="" disabled>Select Education</option>
              <option value="BE_BTech">B.E / B.Tech</option>
              <option value="Arts_Science">Arts & Science</option>
              <option value="Post_Graduate">Post Graduate</option>
              <option value="Doctorate">Doctorate / Others</option>
            </select>

            <input
              type="text"
              placeholder="District (e.g., Tiruppur)"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
            />

            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-8 rounded-lg text-sm transition shadow-md active:scale-95"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* 3. OUR SERVICES */}
      <section className="bg-slate-900 text-white py-12 sm:py-20 px-4 text-center">
        <p className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-1">EXPLORE FEATURES</p>
        <h2 className="text-2xl sm:text-4xl font-serif mb-8 text-amber-400">Our Services 🌿</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { title: 'Join Now', sub: 'Start for free', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80', btn: 'Start for Free' },
            { title: 'Photo Gallery', sub: '1200+ Verified Profiles', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80', btn: 'View Gallery' },
            { title: 'Blog & Articles', sub: 'Marriage Guidance & Tips', img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=400&q=80', btn: 'Read Articles' },
            { title: 'Browse Profiles', sub: 'Filtered Matchmaking', img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=400&q=80', btn: 'View Profiles' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800 border border-white/10 rounded-2xl overflow-hidden text-left flex flex-col justify-between group hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/10 transition-all cursor-pointer"
              onClick={() => navigate('/search')}
              role="button"
              tabIndex={0}
              onKeyDown={handleCardKeyDown}
            >
              <div className="h-48 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-xs mb-4">{item.sub}</p>
                </div>
                <button className="bg-white/5 border border-white/20 text-slate-100 text-xs py-2 px-4 rounded-full self-start group-hover:bg-amber-500 group-hover:text-slate-900 group-hover:border-amber-500 transition">
                  {item.btn} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="bg-white py-12 sm:py-20 px-4 text-center">
        <p className="text-red-800 font-bold tracking-wider text-xs uppercase mb-1">TESTIMONIALS</p>
        <h2 className="text-2xl sm:text-4xl text-slate-900 mb-10 font-bold">
          Trusted by <span className="text-red-800">1500+</span> Happy Couples
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            'நமது கொங்கு மக்கள் வாழும் தேசத்தில் வாழும் நபர்களுக்கு ஏற்ற வாழ்க்கைத் துணையை கண்டறிய இது ஒரு மிகச்சிறந்த தளம்.',
            'மற்ற திருமண தகவல் மையங்களைவிட மிக எளிதாகவும், குறைந்த கட்டணத்திலும் சேவை வழங்கப்படுகிறது.',
            'நான் என் துணைவியை நல் வாழ்கையின் தொடக்கமாக Varan.app மூலம் கண்டறிந்தேன்.'
          ].map((text, idx) => (
            <div key={idx} className="border border-slate-200 p-6 rounded-2xl bg-slate-50 text-left shadow-sm">
              <p className="text-slate-600 text-sm leading-relaxed italic">"{text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="bg-slate-700 text-white py-12 sm:py-20 px-4 text-center">
        <p className="text-amber-400 font-bold mb-1 text-xs tracking-wider">#1 KONGU VELLALAR GOUNDER'S MATRIMONY</p>
        <h2 className="text-2xl sm:text-4xl font-bold mb-2">Why Choose Us</h2>
        <p className="text-slate-300 mb-10 text-sm">Most trusted and authentic matchmaking platform.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: 'Genuine Profiles', desc: 'No fake IDs, profiles are strictly 100% verified.' },
            { title: 'Most Trusted', desc: 'Verified family backgrounds and reliable data.' },
            { title: '2000+ Weddings', desc: 'Thousands of successful marriages created via Varam.' }
          ].map((card, idx) => (
            <div key={idx} className="bg-white text-slate-800 p-8 rounded-2xl shadow-md text-center">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WELCOME SECTION */}
      <section className="py-12 sm:py-20 px-4 max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
        <div className="flex-1 w-full relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-red-500 rounded-3xl opacity-15 blur-xl" />
          <img
            className="floating-welcome-img w-full rounded-2xl shadow-2xl relative z-10 object-cover"
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
            alt="Varam Couple"
          />

          <div className="absolute -bottom-4 right-2 sm:right-4 z-20 bg-white/95 backdrop-blur-md border border-slate-100 rounded-xl p-3 sm:p-4 shadow-lg flex items-center gap-3">
            <span className="text-xl sm:text-2xl">💍</span>
            <div>
              <p className="font-extrabold text-xs sm:text-sm text-slate-900">100% Genuine</p>
              <p className="text-[10px] sm:text-xs text-slate-500">Verified Kongu Profiles</p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full text-left">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
            ABOUT PLATFORM
          </span>
          <h2 className="text-2xl sm:text-4xl text-slate-900 my-4 font-extrabold font-serif leading-tight">
            WELCOME TO <br />
            <span className="bg-gradient-to-r from-red-800 to-red-500 bg-clip-text text-transparent">
              VARAM.APP
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            A platform created to unify Kongu relationships across the globe. To begin your journey,{' '}
            <span
              className="text-red-600 cursor-pointer font-bold underline"
              onClick={() => navigate('/register')}
            >
              click here to start...
            </span>
          </p>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
            Varan Thedum Varam works with social responsibility in mind, assuring genuine and trustworthy profiles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-slate-200 p-4 rounded-xl bg-white shadow-xs">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Enquiry</p>
              <p className="font-bold text-slate-900 text-sm mt-1">+91 94455 55941</p>
            </div>
            <div className="border border-slate-200 p-4 rounded-xl bg-white shadow-xs">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Get Support</p>
              <p className="font-bold text-slate-900 text-sm mt-1">help@varam.app</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TEAM SECTION */}
      <section className="bg-slate-50 py-12 sm:py-20 px-4 text-center border-t border-slate-200">
        <p className="text-red-800 font-extrabold tracking-widest text-xs uppercase mb-1">
          OUR PROFESSIONALS
        </p>
        <h2 className="text-2xl sm:text-4xl text-slate-900 mb-10 font-extrabold font-serif">Meet Our Team</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {[
            { name: 'Dr. S. Karthik', role: 'Matchmaking Lead', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
            { name: 'P. Subramaniam', role: 'Senior Advisor', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
            { name: 'M. Revathi', role: 'Verification Expert', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
            { name: 'K. Lakshmi', role: 'Relationship Manager', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },
            { name: 'V. Ramesh', role: 'Community Head', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
          ].map((member, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition">
              <div className="h-44 sm:h-52 overflow-hidden">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
              </div>
              <div className="p-3">
                <p className="text-xs sm:text-sm font-bold text-slate-900">{member.name}</p>
                <p className="text-[11px] text-slate-500 font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FOOTER SECTION */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {/* Column 1: Brand & Socials */}
          <div>
            <h3 className="text-white text-xl font-extrabold mb-3 font-serif">VARAM.APP</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
              Connecting hearts and unifying families with complete trust and authentic heritage.
            </p>
            <div className="flex gap-3">
              {['f', '▶', '📸', '💬'].map((icon, i) => (
                <button
                  key={i}
                  className="bg-slate-800 text-white w-9 h-9 rounded-full flex items-center justify-center text-xs hover:bg-red-600 hover:-translate-y-1 transition duration-200 cursor-pointer"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Get In Touch */}
          <div>
            <h4 className="text-slate-100 mb-4 text-sm font-bold tracking-wider">GET IN TOUCH</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2 hover:text-amber-400 transition cursor-pointer">
                <span>📍</span> Coimbatore, Tamil Nadu
              </li>
              <li className="flex items-center gap-2 hover:text-amber-400 transition cursor-pointer">
                <span>📞</span> +91 94455 55941
              </li>
              <li className="flex items-center gap-2 hover:text-amber-400 transition cursor-pointer">
                <span>✉️</span> help@varam.app
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div>
            <h4 className="text-slate-100 mb-4 text-sm font-bold tracking-wider">HELP & SUPPORT</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="hover:text-amber-400 transition cursor-pointer" onClick={() => navigate('/about')}>About Company</li>
              <li className="hover:text-amber-400 transition cursor-pointer" onClick={() => navigate('/terms')}>Terms & Conditions</li>
              <li className="hover:text-amber-400 transition cursor-pointer" onClick={() => navigate('/privacy')}>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} Varam.app. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
