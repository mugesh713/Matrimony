import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailItem = ({ label, value }) => (
  <div style={styles.detailItem}>
    <span style={styles.detailLabel}>{label}</span>
    <span style={styles.detailValue}>{value ? value : '—'}</span>
  </div>
);

export default function FullProfileView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/profiles/${id}`);
        setProfile(res.data.profile);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.loaderText}>Loading profile details...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.errorText}>Profile not found!</div>
        <button onClick={() => navigate(-1)} style={styles.backButton}>&larr; Go Back</button>
      </div>
    );
  }

  const imageUrl = profile.profileImage?.url || profile.profileImage || profile.photo?.url || profile.photo || 'https://via.placeholder.com/300x380?text=No+Photo';

  return (
    <div style={styles.pageWrapper}>
      {/* Mobile Responsive Global Styles */}
      <style>{`
        @media (max-width: 768px) {
          .profile-header-container {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .profile-img-style {
            width: 100% !important;
            max-width: 280px !important;
            height: 320px !important;
          }
          .badge-group-container {
            justify-content: center !important;
          }
          .sections-grid-container {
            grid-template-columns: 1fr !important;
          }
          .card-padding-override {
            padding: 16px !important;
          }
        }
        @media (max-width: 480px) {
          .two-column-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={styles.cardContainer} className="card-padding-override">
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          &larr; Back
        </button>

        <div style={styles.profileHeader} className="profile-header-container">
          <div style={styles.imageWrapper}>
            <img src={imageUrl} alt={profile.name} style={styles.profileImage} className="profile-img-style" />
          </div>

          <div style={styles.headerInfo}>
            <div>
              <div style={styles.badgeGroup} className="badge-group-container">
                <span style={styles.idBadge}>ID: {profile.memberId || profile.vtvId}</span>
                {profile.maritalStatus && (
                  <span style={styles.statusBadge}>{profile.maritalStatus}</span>
                )}
              </div>
              <h1 style={styles.profileName}>{profile.name}</h1>
              <p style={styles.subText}>
                {profile.age ? `${profile.age} Yrs` : ''} 
                {profile.gender ? ` • ${profile.gender}` : ''}
              </p>
            </div>

            <div style={styles.headerDetailsGrid}>
              <DetailItem label="Mobile" value={profile.mobile} />
              <DetailItem label="Parents Contact" value={profile.parentContact} />
              <DetailItem label="Occupation" value={profile.occupation} />
              <DetailItem label="Location" value={profile.district} />
            </div>
          </div>
        </div>

        <hr style={styles.divider} />

        <div style={styles.sectionsContainer} className="sections-grid-container">
          {/* Basic Info */}
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>📌 Basic Info</h3>
            <div style={styles.gridTwoColumn} className="two-column-grid">
              <DetailItem label="Age" value={profile.age ? `${profile.age} Years` : null} />
              <DetailItem label="Gender" value={profile.gender} />
              <DetailItem label="Marital Status" value={profile.maritalStatus} />
              <DetailItem 
                label="Height / Weight" 
                value={(profile.height || profile.weight) ? `${profile.height || '-'} / ${profile.weight || '-'}` : null} 
              />
            </div>
          </div>

          {/* Religious Background */}
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>🛕 Religious Background</h3>
            <div style={styles.gridTwoColumn} className="two-column-grid">
              <DetailItem label="Kulam" value={profile.kulam} />
              <DetailItem label="Kuladeivam" value={profile.kuladeivam} />
              <DetailItem label="Caste / Subcaste" value={(profile.caste || profile.subCaste) ? `${profile.caste || '-'} / ${profile.subCaste || '-'}` : null} />
              <DetailItem label="Star / Rasi" value={(profile.star || profile.rasi) ? `${profile.star || '-'} / ${profile.rasi || '-'}` : null} />
            </div>
          </div>

          {/* Education & Career */}
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>🎓 Education & Career</h3>
            <div style={styles.gridTwoColumn} className="two-column-grid">
              <DetailItem label="Education" value={profile.education} />
              <DetailItem label="Occupation" value={profile.occupation} />
              <DetailItem label="Company" value={profile.company} />
              <DetailItem label="Annual Income" value={profile.annualIncome} />
            </div>
          </div>

          {/* Family & Location */}
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>🏠 Family & Location</h3>
            <div style={styles.gridTwoColumn} className="two-column-grid">
              <DetailItem label="Father's Name" value={profile.fatherName} />
              <DetailItem label="Mother's Name" value={profile.motherName} />
              <DetailItem label="Parents Contact" value={profile.parentContact} />
              <DetailItem label="District" value={profile.district} />
              <DetailItem label="Address" value={profile.address} />
            </div>
          </div>
        </div>

        {/* Profile Notes */}
        <div style={{ ...styles.sectionCard, marginTop: '24px' }}>
          <h3 style={styles.sectionTitle}>📝 Profile Description / Notes</h3>
          <p style={styles.descriptionText}>
            {profile.description ? profile.description : 'No additional description or notes available for this profile.'}
          </p>
        </div>
      </div>
    </div>
  );
}

// Extracted Clean Inline Styles
const styles = {
  pageWrapper: {
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
    padding: '20px 15px',
    boxSizing: 'border-box',
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  cardContainer: {
    maxWidth: '960px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  centerContainer: {
    padding: '80px 20px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  loaderText: {
    fontSize: '18px',
    color: '#666',
  },
  errorText: {
    fontSize: '20px',
    color: '#d9534f',
    marginBottom: '20px',
  },
  backButton: {
    marginBottom: '24px',
    padding: '8px 18px',
    cursor: 'pointer',
    backgroundColor: '#f0f2f5',
    border: '1px solid #dcdfe6',
    borderRadius: '6px',
    fontWeight: '600',
    color: '#444',
  },
  profileHeader: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  imageWrapper: {
    flexShrink: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  profileImage: {
    width: '260px',
    height: '340px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  headerInfo: {
    flex: 1,
    minWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  badgeGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '8px',
  },
  idBadge: {
    backgroundColor: '#e6f0fa',
    color: '#0056b3',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  statusBadge: {
    backgroundColor: '#fdf2e9',
    color: '#d97706',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  profileName: {
    margin: '4px 0',
    color: '#7a1c1c',
    fontSize: '32px',
    fontWeight: '700',
  },
  subText: {
    margin: '0 0 16px 0',
    color: '#666',
    fontSize: '15px',
  },
  headerDetailsGrid: {
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '8px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: '12px',
    marginTop: '15px',
    border: '1px solid #edf2f7',
  },
  divider: {
    margin: '30px 0',
    border: 'none',
    borderTop: '1px solid #e5e7eb',
  },
  sectionsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
  },
  sectionCard: {
    backgroundColor: '#fafbfc',
    border: '1px solid #e8ecef',
    borderRadius: '8px',
    padding: '20px',
  },
  sectionTitle: {
    margin: '0 0 16px 0',
    color: '#2d3748',
    fontSize: '18px',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  },
  gridTwoColumn: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '12px',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  detailLabel: {
    fontSize: '12px',
    color: '#718096',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  detailValue: {
    fontSize: '15px',
    color: '#1a202c',
    fontWeight: '500',
    wordBreak: 'break-word',
  },
  descriptionText: {
    margin: 0,
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#2d3748',
    whiteSpace: 'pre-line',
  },
};
