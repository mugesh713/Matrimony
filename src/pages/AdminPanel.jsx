import React, { useState, useEffect } from 'react';
import API from '../services/api';

const initialForm = {
  profileFor: 'Groom',
  name: '',
  gender: 'Male',
  dob: '',
  age: '',
  height: '',
  weight: '',
  maritalStatus: 'Single',
  mobile: '',
  parentContact: '',
  email: '',
  religion: '',
  caste: '',
  subCaste: '',
  kulam: '',
  kuladeivam: '',
  gothram: '',
  rasi: '',
  star: '',
  education: '',
  college: '',
  occupation: '',
  company: '',
  designation: '',
  annualIncome: '',
  fatherName: '',
  fatherOccupation: '',
  motherName: '',
  motherOccupation: '',
  brothers: 0,
  sisters: 0,
  address: '',
  district: '',
  state: '',
  pincode: '',
  description: '',
  aboutMe: '',
  partnerExpectation: ''
};

export default function AdminPanel() {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await API.get('/profiles');
      const data = res.data.profiles || res.data || [];
      setProfiles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch profiles:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (profile) => {
    setEditingId(profile._id);
    setImageFile(null); // Reset newly selected file state
    setFormData({
      profileFor: profile.profileFor || 'Groom',
      name: profile.name || '',
      gender: profile.gender || 'Male',
      dob: profile.dob || '',
      age: profile.age || '',
      height: profile.height || '',
      weight: profile.weight || '',
      maritalStatus: profile.maritalStatus || 'Single',
      mobile: profile.mobile || '',
      parentContact: profile.parentContact || '',
      email: profile.email || '',
      religion: profile.religion || '',
      caste: profile.caste || '',
      subCaste: profile.subCaste || '',
      kulam: profile.kulam || '',
      kuladeivam: profile.kuladeivam || profile.kulamDeivam || '',
      gothram: profile.gothram || '',
      rasi: profile.rasi || '',
      star: profile.star || '',
      education: profile.education || '',
      college: profile.college || '',
      occupation: profile.occupation || '',
      company: profile.company || '',
      designation: profile.designation || '',
      annualIncome: profile.annualIncome || '',
      fatherName: profile.fatherName || '',
      fatherOccupation: profile.fatherOccupation || '',
      motherName: profile.motherName || '',
      motherOccupation: profile.motherOccupation || '',
      brothers: profile.brothers || 0,
      sisters: profile.sisters || 0,
      address: profile.address || '',
      district: profile.district || '',
      state: profile.state || '',
      pincode: profile.pincode || '',
      description: profile.description || '',
      aboutMe: profile.aboutMe || '',
      partnerExpectation: profile.partnerExpectation || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });

    if (imageFile) {
      // Append for both key naming conventions to guarantee backend multer mapping
      submitData.append('profileImage', imageFile);
      submitData.append('photo', imageFile);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (editingId) {
        await API.put(`/profiles/${editingId}`, submitData, config);
        alert('Profile Updated Successfully!');
      } else {
        await API.post('/profiles', submitData, config);
        alert('Profile Created Successfully!');
      }
      handleCancelEdit();
      fetchProfiles();
    } catch (err) {
      console.error('Save error:', err);
      alert(err.response?.data?.message || 'Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await API.delete(`/profiles/${id}`);
        fetchProfiles();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  // Helper function to extract image URL safely across schemas
  const getImageUrl = (profile) => {
    if (profile.profileImage) {
      if (typeof profile.profileImage === 'string') return profile.profileImage;
      if (profile.profileImage.url) return profile.profileImage.url;
    }
    if (profile.photo) {
      if (typeof profile.photo === 'string') return profile.photo;
      if (profile.photo.url) return profile.photo.url;
    }
    return profile.img || 'https://via.placeholder.com/50?text=No+Image';
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '20px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ borderBottom: '2px solid #7a1c1c', paddingBottom: '10px', color: '#7a1c1c' }}>
        {editingId ? '✏️ Edit Profile' : '➕ Add New Profile'}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* BASIC DETAILS */}
        <h4 style={sectionHeaderStyle}>👤 Basic Details</h4>
        <div style={gridStyle}>
          <div>
            <label style={labelStyle}>Profile For *</label>
            <select name="profileFor" value={formData.profileFor} onChange={handleInputChange} style={inputStyle}>
              <option value="Bride">Bride</option>
              <option value="Groom">Groom</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Name *</label>
            <input name="name" value={formData.name} onChange={handleInputChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Gender *</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange} style={inputStyle}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Height (e.g. 5ft 10in / 178 cms)</label>
            <input name="height" value={formData.height} onChange={handleInputChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Marital Status</label>
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} style={inputStyle}>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Mobile Number *</label>
            <input name="mobile" value={formData.mobile} onChange={handleInputChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Profile Photo (Cloudinary)</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={inputStyle} />
          </div>
        </div>

        {/* RELIGIOUS & COMMUNITY DETAILS */}
        <h4 style={sectionHeaderStyle}>🛕 Religious & Community Details</h4>
        <div style={gridStyle}>
          <div>
            <label style={labelStyle}>Kulam (குலம்)</label>
            <input name="kulam" value={formData.kulam} onChange={handleInputChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Kuladeivam (குலதெய்வம்)</label>
            <input name="kuladeivam" value={formData.kuladeivam} onChange={handleInputChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Caste</label>
            <input name="caste" value={formData.caste} onChange={handleInputChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Star (நட்சத்திரம்)</label>
            <input name="star" value={formData.star} onChange={handleInputChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Rasi (ராசி)</label>
            <input name="rasi" value={formData.rasi} onChange={handleInputChange} style={inputStyle} />
          </div>
        </div>

        {/* EDUCATION & OCCUPATION */}
        <h4 style={sectionHeaderStyle}>🎓 Education & Occupation</h4>
        <div style={gridStyle}>
          <div>
            <label style={labelStyle}>Education (கல்வி)</label>
            <input name="education" value={formData.education} onChange={handleInputChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Occupation (தொழில்)</label>
            <input name="occupation" value={formData.occupation} onChange={handleInputChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Company</label>
            <input name="company" value={formData.company} onChange={handleInputChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Annual Income</label>
            <input name="annualIncome" value={formData.annualIncome} onChange={handleInputChange} style={inputStyle} />
          </div>
        </div>

        {/* FAMILY DETAILS */}
        <h4 style={sectionHeaderStyle}>👨‍👩‍👧‍👦 Family Details</h4>
        <div style={gridStyle}>
          <div>
            <label style={labelStyle}>Father's Name</label>
            <input name="fatherName" value={formData.fatherName} onChange={handleInputChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Mother's Name</label>
            <input name="motherName" value={formData.motherName} onChange={handleInputChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Parents Contact Number</label>
            <input name="parentContact" value={formData.parentContact} onChange={handleInputChange} style={inputStyle} placeholder="e.g. +91 9876543210" />
          </div>
        </div>

        {/* LOCATION */}
        <h4 style={sectionHeaderStyle}>📍 Location Details</h4>
        <div style={gridStyle}>
          <div>
            <label style={labelStyle}>District *</label>
            <input name="district" value={formData.district} onChange={handleInputChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>State</label>
            <input name="state" value={formData.state} onChange={handleInputChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Address</label>
            <input name="address" value={formData.address} onChange={handleInputChange} style={inputStyle} />
          </div>
        </div>

        {/* ADDITIONAL DESCRIPTION */}
        <h4 style={sectionHeaderStyle}>📝 Additional Information</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label style={labelStyle}>Profile Description / Notes</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Enter additional profile details or special notes..."
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
          <button type="submit" disabled={loading} style={{ backgroundColor: '#487d83', color: '#fff', padding: '12px 25px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? 'Processing...' : editingId ? '🔄 Update Profile' : '🚀 Save & Publish Profile'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: '#6c757d', color: '#fff', padding: '12px 25px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr style={{ margin: '40px 0' }} />

      {/* REGISTERED PROFILES TABLE */}
      <h3>📋 Registered Profiles List ({profiles.length})</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={thStyle}>Photo</th>
            <th style={thStyle}>Member ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Parents Contact</th>
            <th style={thStyle}>District</th>
            <th style={thStyle}>Mobile</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((item) => (
            <tr key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>
                <img src={getImageUrl(item)} alt={item.name} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '50%' }} />
              </td>
              <td style={{ ...tdStyle, color: '#0056b3', fontWeight: 'bold' }}>{item.memberId || item._id}</td>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>{item.parentContact || '-'}</td>
              <td style={tdStyle}>{item.district}</td>
              <td style={tdStyle}>{item.mobile}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEditClick(item)} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '6px' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item._id)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Inline Styles
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' };
const inputStyle = { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' };
const labelStyle = { fontSize: '13px', fontWeight: '600' };
const sectionHeaderStyle = { marginTop: '20px', marginBottom: '10px', color: '#333' };
const thStyle = { padding: '12px', borderBottom: '2px solid #ddd' };
const tdStyle = { padding: '10px', verticalAlign: 'middle' };
