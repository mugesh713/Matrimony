import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Plans() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic',
      price: '₹999',
      duration: '3 Months',
      features: ['View 25 Verified Contact Details', 'Send Direct Interest Express', 'Standard Customer Support', 'Basic Filter Options'],
      badge: '',
      color: '#334155'
    },
    {
      name: 'Premium (Recommended)',
      price: '₹2,499',
      duration: '6 Months',
      features: ['Unlimited Profile Views', 'View Direct Contact & WhatsApp Info', 'Priority Profile Highlight', 'Horoscope Matching Assistance', 'Dedicated Relationship Advisor'],
      badge: 'POPULAR',
      color: '#991b1b'
    },
    {
      name: 'VIP Elite',
      price: '₹4,999',
      duration: '12 Months',
      features: ['Unlimited Full Profile Access', 'Personalized Matchmaking Manager', 'Direct Family Outreach Support', 'Featured Listing on Homepage', 'Confidentiality Protection'],
      badge: 'VIP',
      color: '#0f172a'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '60px 20px', fontFamily: "sans-serif" }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
        <p style={{ color: '#991b1b', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '13px' }}>MEMBERSHIP PACKAGES</p>
        <h1 style={{ fontSize: '38px', color: '#0f172a', margin: '10px 0', fontFamily: 'Georgia, serif' }}>Choose the Right Plan for You</h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>Unlock genuine contacts and find your life partner faster with our verified premium services.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1100px', margin: '0 auto' }}>
        {plans.map((plan, idx) => (
          <div key={idx} style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '35px 25px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
            border: plan.badge ? '2px solid #991b1b' : '1px solid #e2e8f0',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between'
          }}>
            {plan.badge && (
              <span style={{
                position: 'absolute',
                top: '-14px',
                right: '25px',
                backgroundColor: '#991b1b',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 12px',
                borderRadius: '20px',
                letterSpacing: '1px'
              }}>
                {plan.badge}
              </span>
            )}
            <div>
              <h3 style={{ fontSize: '22px', color: plan.color, marginBottom: '10px' }}>{plan.name}</h3>
              <div style={{ margin: '15px 0' }}>
                <span style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a' }}>{plan.price}</span>
                <span style={{ color: '#64748b', fontSize: '14px' }}> / {plan.duration}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '25px 0', textAlign: 'left' }}>
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', color: '#475569', fontSize: '14px' }}>
                    ✅ {feat}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => navigate('/register')}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: plan.badge ? '#991b1b' : '#0284c7',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '15px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}