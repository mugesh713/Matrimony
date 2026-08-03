import React, { createContext, useContext, useState } from 'react';

// Context creation
const AppContext = createContext();

// Initial seed data (You can leave this empty [] or keep initial test profiles)
const INITIAL_PROFILES = [
  {
    id: 'VTV_955986',
    name: 'MUGESH V',
    gender: 'Male',
    age: 24,
    height: '5ft 10in / 178 cms',
    maritalStatus: 'Single',
    kulam: 'கொங்கு குலம்',
    kulamDeivam: 'அருள்மிகு முருகன்',
    education: 'B.E / Computer Science',
    occupation: 'Software Engineer',
    location: 'Tiruppur',
    district: 'Tiruppur',
    mobile: '9427744713',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'VTV_264368',
    name: 'Ramesh Raja',
    gender: 'Male',
    age: 31,
    height: '6ft / 182 cms',
    maritalStatus: 'Single',
    kulam: 'தோட குலம்',
    kulamDeivam: 'பெரியம்மாள் அம்மன்',
    education: 'இளங்கலைப்படைப்பு',
    occupation: 'சுய தொழில்',
    location: 'Dindigul',
    district: 'Dindigul',
    mobile: '9445555941',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'VTV_267758',
    name: 'Arun',
    gender: 'Male',
    age: 30,
    height: '6ft / 182 cms',
    maritalStatus: 'Single',
    kulam: 'பண்ணை குலம்',
    kulamDeivam: 'அருள்மிகு அம்மன்',
    education: 'இளங்கலைப்படைப்பு',
    occupation: 'சுய தொழில்',
    location: 'Chennai',
    district: 'Chennai',
    mobile: '9876543210',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
];

export function AppProvider({ children }) {
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);

  const addProfile = (newProfile) => {
    setProfiles((prev) => [newProfile, ...prev]);
  };

  const deleteProfile = (id) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };

  return (
    <AppContext.Provider value={{ profiles, addProfile, deleteProfile }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);