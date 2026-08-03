import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../AppContext';

export default function SearchProfiles() {
  const navigate = useNavigate();
  const contextData = useApp();
  
  // Local state to store fetched profiles if AppContext is empty
  const [profilesList, setProfilesList] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Filter States
  const [vtvId, setVtvId] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [occupation, setOccupation] = useState('');
  const [district, setDistrict] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');

  // Pagination State (Change pages 1, 2, 3, 4...)
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 10;

  // 1. Fetch fresh profiles directly from backend API to ensure Admin added profiles always show
  useEffect(() => {
    const fetchFreshProfiles = async () => {
      try {
        const res = await axios.get('/api/profiles');
        let data = res.data;
        if (data.profiles && Array.isArray(data.profiles)) {
          data = data.profiles;
        }
        if (Array.isArray(data) && data.length > 0) {
          setProfilesList(data);
        } else if (contextData && Array.isArray(contextData.profiles)) {
          setProfilesList(contextData.profiles);
        }
      } catch (err) {
        console.error("Error fetching profiles directly:", err);
        if (contextData && Array.isArray(contextData.profiles)) {
          setProfilesList(contextData.profiles);
        }
      }
    };

    fetchFreshProfiles();
  }, [contextData]);

  const handleReset = () => {
    setVtvId('');
    setAgeRange('');
    setOccupation('');
    setDistrict('');
    setMaritalStatus('');
    setCurrentPage(1);
  };

  // 2. Flexible Filtering Logic (Ignores missing cases and spaces)
  const filteredProfiles = profilesList.filter((profile) => {
    // Extract ID safely from any possible backend schema field
    const rawId = profile.memberId || profile.memberID || profile.vtvId || profile.vtvID || profile._id || profile.id || '';
    const cleanId = String(rawId).trim().toLowerCase();
    const searchId = vtvId.trim().toLowerCase();

    const matchesId = searchId ? cleanId.includes(searchId) : true;
    
    // District Match
    const cleanDistrict = String(profile.district || '').trim().toLowerCase();
    const searchDistrict = district.trim().toLowerCase();
    const matchesDistrict = searchDistrict ? cleanDistrict === searchDistrict : true;

    // Occupation Match
    const cleanOccupation = String(profile.occupation || '').trim().toLowerCase();
    const searchOccupation = occupation.trim().toLowerCase();
    const matchesOccupation = searchOccupation ? cleanOccupation.includes(searchOccupation) : true;

    // Marital Status Match
    const cleanMarital = String(profile.maritalStatus || profile.marital_status || '').trim().toLowerCase();
    const searchMarital = maritalStatus.trim().toLowerCase();
    const matchesMarital = searchMarital ? cleanMarital === searchMarital : true;

    // Age Range Check
    let matchesAge = true;
    if (ageRange && profile.age) {
      const numericAge = parseInt(profile.age, 10);
      if (ageRange === '20-25') matchesAge = numericAge >= 20 && numericAge <= 25;
      else if (ageRange === '26-30') matchesAge = numericAge >= 26 && numericAge <= 30;
      else if (ageRange === '31-35') matchesAge = numericAge >= 31 && numericAge <= 35;
      else if (ageRange === '36-40') matchesAge = numericAge >= 36 && numericAge <= 40;
      else if (ageRange === '40+') matchesAge = numericAge > 40;
    }

    return matchesId && matchesDistrict && matchesOccupation && matchesMarital && matchesAge;
  });

  // 3. Pagination Slices (1 2 3 4 buttons)
  const totalProfiles = filteredProfiles.length;
  const totalPages = Math.ceil(totalProfiles / profilesPerPage) || 1;
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper to resolve Cloudinary/Local images
  const getImageUrl = (profile) => {
    if (profile.profileImage && typeof profile.profileImage === 'object' && profile.profileImage.url) {
      return profile.profileImage.url;
    }
    if (typeof profile.profileImage === 'string' && profile.profileImage) {
      return profile.profileImage;
    }
    return profile.img || 'https://via.placeholder.com/300x350?text=No+Image';
  };

  return (
    <div style={{ backgroundColor: '#faf9f6', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#333', minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* BANNER HEADER */}
      <div style={{ backgroundColor: '#7a1c1c', color: '#fff', textAlign: 'center', padding: '20px 10px' }}>
        <h2 style={{ margin: 0, fontFamily: 'serif', fontSize: '28px', color: '#fbe29d' }}>
          இனிய திருமணங்கள்
        </h2>
        <button
          onClick={() => navigate('/register')}
          style={{
            marginTop: '10px',
            backgroundColor: '#d9534f',
            color: '#fff',
            border: '1px solid #fff',
            padding: '8px 22px',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          Contact Us ➔
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: '1200px', margin: '30px auto 0 auto', padding: '0 20px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* LEFT FILTERS */}
        <div style={{ flex: '1', minWidth: '280px', backgroundColor: '#fff', padding: '22px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: 'fit-content' }}>
          <h3 style={{ margin: '0 0 18px 0', fontSize: '16px', color: '#8b0000', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            🔍 Search Filter (தேடல்)
          </h3>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: '600', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Member ID (VTV ID)</label>
            <input 
              type="text" 
              placeholder="e.g. VTV1785479826661" 
              value={vtvId} 
              onChange={(e) => { setVtvId(e.target.value); setCurrentPage(1); }} 
              style={{ width: '100%', padding: '9px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', boxSizing: 'border-box' }} 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: '600', fontSize: '13px', display: 'block', marginBottom: '6px' }}>🎂 Age (வயது)</label>
            <select value={ageRange} onChange={(e) => { setAgeRange(e.target.value); setCurrentPage(1); }} style={{ width: '100%', padding: '9px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px' }}>
              <option value="">Select age range</option>
              <option value="20-25">20 - 25</option>
              <option value="26-30">26 - 30</option>
              <option value="31-35">31 - 35</option>
              <option value="36-40">36 - 40</option>
              <option value="40+">40+</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: '600', fontSize: '13px', display: 'block', marginBottom: '6px' }}>🏛️ District (மாவட்டம்)</label>
            <select value={district} onChange={(e) => { setDistrict(e.target.value); setCurrentPage(1); }} style={{ width: '100%', padding: '9px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px' }}>
              <option value="">Select District</option>
              <option value="Tiruppur">Tiruppur - திருப்பூர்</option>
              <option value="Dindigul">Dindigul - திண்டுக்கல்</option>
              <option value="Chennai">Chennai - சென்னை</option>
            </select>
          </div>

          <button onClick={handleReset} style={{ width: '100%', backgroundColor: '#f4f4f4', color: '#555', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
            🔄 Reset Filters
          </button>
        </div>

        {/* RIGHT PROFILES LIST */}
        <div style={{ flex: '2.8', minWidth: '300px' }}>
          
          <div style={{ marginBottom: '15px', fontSize: '14px', color: '#555' }}>
            Showing <strong>{totalProfiles === 0 ? 0 : indexOfFirstProfile + 1} to {Math.min(indexOfLastProfile, totalProfiles)}</strong> of <strong>{totalProfiles}</strong> profiles
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {currentProfiles.length === 0 ? (
              <div style={{ backgroundColor: '#fff', padding: '50px', textAlign: 'center', borderRadius: '8px', color: '#777', border: '1px solid #eee' }}>
                <h3>No profiles match your search criteria.</h3>
                <button onClick={handleReset} style={{ backgroundColor: '#0275d8', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>Clear Filters</button>
              </div>
            ) : (
              currentProfiles.map((profile) => {
                const profileId = profile._id || profile.id || profile.memberId;
                const memberDisplayId = profile.memberId || profile.memberID || profile.vtvId || profile.id;
                
                return (
                  <div key={profileId} style={{ backgroundColor: '#fff', border: '1px solid #e2e2e2', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    
                    {/* PHOTO */}
                    <div style={{ flex: '1', minWidth: '220px', maxWidth: '270px', backgroundColor: '#f0f0f0' }}>
                      <img 
                        src={getImageUrl(profile)} 
                        alt={profile.name || 'Profile'} 
                        style={{ width: '100%', height: '100%', minHeight: '260px', objectFit: 'cover', display: 'block' }} 
                      />
                    </div>

                    {/* DETAILS */}
                    <div style={{ flex: '2', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '22px', color: '#222' }}>{profile.name}</h3>
                        <p style={{ margin: '2px 0 12px 0', fontSize: '13px', color: '#337ab7', fontWeight: '600' }}>Member ID: {memberDisplayId}</p>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
                          {profile.age && <span style={{ border: '1px solid #0275d8', color: '#0275d8', padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>👤 Age {profile.age}</span>}
                          {profile.height && <span style={{ border: '1px solid #5cb85c', color: '#5cb85c', padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>{profile.height}</span>}
                          {(profile.maritalStatus || profile.marital_status) && <span style={{ border: '1px solid #5bc0de', color: '#5bc0de', padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>💍 {profile.maritalStatus || profile.marital_status}</span>}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', borderTop: '1px solid #f0f0f0', paddingTop: '12px' }}>
                          <div><span style={{ color: '#888', display: 'block', fontSize: '11px' }}>KULAM</span><strong>{profile.kulam || '-'}</strong></div>
                          <div><span style={{ color: '#888', display: 'block', fontSize: '11px' }}>KULAM DEIVAM</span><strong>{profile.kuladeivam || profile.kulamDeivam || '-'}</strong></div>
                          <div><span style={{ color: '#888', display: 'block', fontSize: '11px' }}>EDUCATION</span><strong>{profile.education || '-'}</strong></div>
                          <div><span style={{ color: '#888', display: 'block', fontSize: '11px' }}>OCCUPATION</span><strong>{profile.occupation || '-'}</strong></div>
                          <div style={{ gridColumn: 'span 2' }}><span style={{ color: '#888', display: 'block', fontSize: '11px' }}>LOCATION</span><strong>{profile.district || '-'}</strong></div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '18px' }}>
                        <button onClick={() => navigate(`/profile/${profileId}`)} style={{ backgroundColor: '#2e3192', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>Full Profile</button>
                        <button onClick={() => setShowLoginModal(true)} style={{ backgroundColor: '#fff', color: '#777', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>Report</button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* NUMBERED PAGINATION (1 2 3 4...) */}
          {totalProfiles > 0 && totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '35px', flexWrap: 'wrap' }}>
              
              {/* Prev Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                style={{
                  padding: '8px 14px',
                  border: '1px solid #ccc',
                  backgroundColor: currentPage === 1 ? '#f5f5f5' : '#fff',
                  color: currentPage === 1 ? '#aaa' : '#333',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                &laquo; Prev
              </button>

              {/* Page Numbers 1 2 3 4 ... */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    padding: '8px 14px',
                    border: pageNum === currentPage ? '1px solid #7a1c1c' : '1px solid #ccc',
                    backgroundColor: pageNum === currentPage ? '#7a1c1c' : '#fff',
                    color: pageNum === currentPage ? '#fff' : '#333',
                    fontWeight: pageNum === currentPage ? 'bold' : 'normal',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '13px',
                    minWidth: '36px',
                  }}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Button */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                style={{
                  padding: '8px 14px',
                  border: '1px solid #ccc',
                  backgroundColor: currentPage === totalPages ? '#f5f5f5' : '#fff',
                  color: currentPage === totalPages ? '#aaa' : '#333',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                Next &raquo;
              </button>
            </div>
          )}

        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', textAlign: 'center', maxWidth: '350px', width: '90%' }}>
            <div style={{ fontSize: '42px', color: '#f8bb86', marginBottom: '10px' }}>!</div>
            <h3 style={{ margin: '0 0 10px 0' }}>Login first!</h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>You need to login to report this profile</p>
            <button onClick={() => setShowLoginModal(false)} style={{ backgroundColor: '#3085d6', color: '#fff', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>OK</button>
          </div>
        </div>
      )}

    </div>
  );
}