import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileCard = ({ icon, label, value, subtext }) => (
  <div style={styles.infoCard}>
    <div style={styles.cardHeader}>
      <span style={styles.cardIcon}>{icon}</span>
      <span style={styles.cardLabel}>{label}</span>
    </div>
    <div style={styles.cardValue}>{value || 'Not specified'}</div>
    {subtext && <div style={styles.cardSubtext}>{subtext}</div>}
  </div>
);

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Safely extract and validate profile photo URL
  const rawPic =
    typeof user?.profilePic === 'object'
      ? user?.profilePic?.url
      : user?.profilePic;

  const profilePicUrl = rawPic && rawPic.trim() !== '' ? rawPic : null;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently Joined';

  const displayGender = user?.gender
    ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
    : 'Not specified';

  const rawId = user?._id || user?.id;
  const displayId = rawId ? `#${rawId.slice(-8).toUpperCase()}` : 'N/A';

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        {user ? (
          <div style={styles.mainCard}>
            {/* Header Banner & Status Badge */}
            <div style={styles.banner}>
              <div style={styles.badgeContainer}>
                <span style={styles.statusBadge}>
                  <span style={styles.statusDot}></span> Active Account
                </span>
              </div>
            </div>

            {/* Profile Avatar & Primary Info */}
            <div style={styles.profileHeader}>
              <div style={styles.avatarWrapper}>
                {profilePicUrl ? (
                  <img
                    src={profilePicUrl}
                    alt={user.name || 'Profile'}
                    style={styles.avatarImage}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div style={styles.avatarFallback}>
                    {getInitials(user.name)}
                  </div>
                )}
              </div>

              <div style={styles.identityGroup}>
                <div style={styles.nameRow}>
                  <h1 style={styles.userName}>{user.name || 'Account User'}</h1>
                  <span style={styles.roleTag}>
                    {(user.role || 'USER').toUpperCase()}
                  </span>
                </div>
                <p style={styles.userEmail}>{user.email}</p>
              </div>

              {/* Logout Button inside Profile */}
              <button onClick={handleLogout} style={styles.logoutButton}>
                🚪 Logout
              </button>
            </div>

            {/* Overview Grid */}
            <div style={styles.bodySection}>
              <h3 style={styles.sectionTitle}>Overview & Details</h3>

              <div style={styles.grid}>
                <ProfileCard
                  icon="👤"
                  label="Full Name"
                  value={user.name}
                  subtext="Verified User"
                />
                <ProfileCard
                  icon="✉️"
                  label="Email Address"
                  value={user.email}
                  subtext="Primary Contact"
                />
                <ProfileCard
                  icon="🛡️"
                  label="Role & Access"
                  value={(user.role || 'USER').toUpperCase()}
                  subtext="System Permissions"
                />
                <ProfileCard
                  icon="⚧"
                  label="Gender"
                  value={displayGender}
                  subtext="Demographic Info"
                />
                <ProfileCard
                  icon="📅"
                  label="Member Since"
                  value={memberSince}
                  subtext="Account Registration"
                />
                <ProfileCard
                  icon="🔑"
                  label="Account ID"
                  value={displayId}
                  subtext="Unique System Identifier"
                />
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.unauthCard}>
            <div style={styles.lockBadge}>🔒</div>
            <h2 style={styles.unauthTitle}>Authentication Required</h2>
            <p style={styles.unauthSubtitle}>
              Please sign in to view your profile details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  pageBackground: {
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 20px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  container: {
    width: '100%',
    maxWidth: '760px',
  },
  mainCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    border: '5px solid #e4e4e7',
  },
  banner: {
    padding: '20px 32px 0 32px',
  },
  badgeContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#f4f4f5',
    color: '#3f3f46',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid #e4e4e7',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#16a34a',
  },
  profileHeader: {
    padding: '0 32px 24px 32px',
    marginTop: '-10px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    borderBottom: '1px solid #f4f4f5',
    flexWrap: 'wrap',
  },
  avatarWrapper: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    padding: '4px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e4e4e7',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#f4f4f5',
    color: '#18181b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: '700',
  },
  identityGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flexGrow: 1,
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  userName: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '800',
    color: '#09090b',
  },
  roleTag: {
    backgroundColor: '#f4f4f5',
    color: '#3f3f46',
    border: '1px solid #e4e4e7',
    padding: '3px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '700',
  },
  userEmail: {
    margin: 0,
    fontSize: '14px',
    color: '#71717a',
    fontWeight: '500',
  },
  logoutButton: {
    padding: '10px 18px',
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '14px',
    transition: 'background-color 0.2s ease',
  },
  bodySection: {
    padding: '32px',
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    fontSize: '13px',
    fontWeight: '700',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '16px',
  },
  infoCard: {
    backgroundColor: '#fafafa',
    borderRadius: '12px',
    padding: '16px 20px',
    border: '1px solid #f4f4f5',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  cardIcon: {
    fontSize: '16px',
  },
  cardLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#a1a1aa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardValue: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#09090b',
    marginTop: '2px',
  },
  cardSubtext: {
    fontSize: '11px',
    color: '#a1a1aa',
  },
  unauthCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '48px 24px',
    textAlign: 'center',
    border: '1px solid #e4e4e7',
  },
  lockBadge: {
    fontSize: '44px',
    marginBottom: '12px',
  },
  unauthTitle: {
    margin: '0 0 8px 0',
    fontSize: '20px',
    fontWeight: '700',
    color: '#09090b',
  },
  unauthSubtitle: {
    margin: 0,
    fontSize: '14px',
    color: '#71717a',
  },
};