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
    setImageFile(null);
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
    <div className="admin-container">
      <style>{`
        .admin-container {
          max-width: 1100px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          box-sizing: border-box;
        }
        .admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 15px;
        }
        .admin-input {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          margin-top: 4px;
          box-sizing: border-box;
          font-size: 14px;
        }
        .admin-label {
          font-size: 13px;
          font-weight: 600;
          color: #333;
        }
        .admin-section-header {
          margin-top: 25px;
          margin-bottom: 12px;
          color: #7a1c1c;
          border-bottom: 1px solid #eee;
          padding-bottom: 6px;
        }
        .btn-group {
          margin-top: 25px;
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        .btn-primary {
          background-color: #487d83;
          color: #fff;
          padding: 12px 25px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          flex: 1;
          min-width: 180px;
        }
        .btn-secondary {
          background-color: #6c757d;
          color: #fff;
          padding: 12px 25px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          flex: 1;
          min-width: 120px;
        }
        .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin-top: 15px;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 650px;
        }
        .admin-th {
          padding: 12px;
          border-bottom: 2px solid #ddd;
          background-color: #f8f9fa;
          text-align: left;
          font-size: 14px;
        }
        .admin-td {
          padding: 10px;
          vertical-align: middle;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          .admin-container {
            padding: 15px;
            margin: 10px;
          }
          .admin-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <h2 style={{ borderBottom: '2px solid #7a1c1c', paddingBottom: '10px', color: '#7a1c1c', fontSize: '22px' }}>
        {editingId ? '✏️ Edit Profile' : '➕ Add New Profile'}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* BASIC DETAILS */}
        <h4 className="admin-section-header">👤 Basic Details</h4>
        <div className="admin-grid">
          <div>
            <label className="admin-label">Profile For *</label>
            <select name="profileFor" value={formData.profileFor} onChange={handleInputChange} className="admin-input">
              <option value="Bride">Bride</option>
              <option value="Groom">Groom</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Name *</label>
            <input name="name" value={formData.name} onChange={handleInputChange} required className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Gender *</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange} className="admin-input">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Height (e.g. 5ft 10in / 178 cms)</label>
            <input name="height" value={formData.height} onChange={handleInputChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Marital Status</label>
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="admin-input">
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Mobile Number *</label>
            <input name="mobile" value={formData.mobile} onChange={handleInputChange} required className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Profile Photo (Cloudinary)</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="admin-input" />
          </div>
        </div>

        {/* RELIGIOUS & COMMUNITY DETAILS */}
        <h4 className="admin-section-header">🛕 Religious & Community Details</h4>
        <div className="admin-grid">
          <div>
            <label className="admin-label">Kulam (குலம்)</label>
            <input name="kulam" value={formData.kulam} onChange={handleInputChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Kuladeivam (குலதெய்வம்)</label>
            <input name="kuladeivam" value={formData.kuladeivam} onChange={handleInputChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Caste</label>
            <input name="caste" value={formData.caste} onChange={handleInputChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Star (நட்சத்திரம்)</label>
            <input name="star" value={formData.star} onChange={handleInputChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Rasi (ராசி)</label>
            <input name="rasi" value={formData.rasi} onChange={handleInputChange} className="admin-input" />
          </div>
        </div>

        {/* EDUCATION & OCCUPATION */}
        <h4 className="admin-section-header">🎓 Education & Occupation</h4>
        <div className="admin-grid">
          <div>
            <label className="admin-label">Education (கல்வி)</label>
            <input name="education" value={formData.education} onChange={handleInputChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Occupation (தொழில்)</label>
            <input name="occupation" value={formData.occupation} onChange={handleInputChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Company</label>
            <input name="company" value={formData.company} onChange={handleInputChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Annual Income</label>
            <input name="annualIncome" value={formData.annualIncome} onChange={handleInputChange} className="admin-input" />
          </div>
        </div>

        {/* FAMILY DETAILS */}
        <h4 className="admin-section-header">👨‍👩‍👧‍👦 Family Details</h4>
        <div className="admin-grid">
          <div>
            <label className="admin-label">Father's Name</label>
            <input name="fatherName" value={formData.fatherName} onChange={handleInputChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Mother's Name</label>
            <input name="motherName" value={formData.motherName} onChange={handleInputChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Parents Contact Number</label>
            <input name="parentContact" value={formData.parentContact} onChange={handleInputChange} className="admin-input" placeholder="e.g. +91 9876543210" />
          </div>
        </div>

        {/* LOCATION */}
        <h4 className="admin-section-header">📍 Location Details</h4>
        <div className="admin-grid">
          <div>
            <label className="admin-label">District *</label>
            <input name="district" value={formData.district} onChange={handleInputChange} required className="admin-input" />
          </div>
          <div>
            <label className="admin-label">State</label>
            <input name="state" value={formData.state} onChange={handleInputChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Address</label>
            <input name="address" value={formData.address} onChange={handleInputChange} className="admin-input" />
          </div>
        </div>

        {/* ADDITIONAL DESCRIPTION */}
        <h4 className="admin-section-header">📝 Additional Information</h4>
        <div>
          <label className="admin-label">Profile Description / Notes</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="admin-input"
            style={{ resize: 'vertical' }}
            placeholder="Enter additional profile details or special notes..."
          />
        </div>

        {/* BUTTONS */}
        <div className="btn-group">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Processing...' : editingId ? '🔄 Update Profile' : '🚀 Save & Publish Profile'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr style={{ margin: '40px 0', borderColor: '#eee' }} />

      {/* REGISTERED PROFILES TABLE */}
      <h3 style={{ fontSize: '18px', color: '#333' }}>📋 Registered Profiles List ({profiles.length})</h3>
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-th">Photo</th>
              <th className="admin-th">Member ID</th>
              <th className="admin-th">Name</th>
              <th className="admin-th">Parents Contact</th>
              <th className="admin-th">District</th>
              <th className="admin-th">Mobile</th>
              <th className="admin-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((item) => (
              <tr key={item._id}>
                <td className="admin-td">
                  <img src={getImageUrl(item)} alt={item.name} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '50%' }} />
                </td>
                <td className="admin-td" style={{ color: '#0056b3', fontWeight: 'bold' }}>{item.memberId || item._id}</td>
                <td className="admin-td">{item.name}</td>
                <td className="admin-td">{item.parentContact || '-'}</td>
                <td className="admin-td">{item.district}</td>
                <td className="admin-td">{item.mobile}</td>
                <td className="admin-td" style={{ whiteSpace: 'nowrap' }}>
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
    </div>
  );
}
