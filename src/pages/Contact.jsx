import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '60px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>
        
        {/* Info Column */}
        <div style={{ flex: '1 1 350px', backgroundColor: '#0f172a', color: '#fff', padding: '40px' }}>
          <h2 style={{ fontSize: '28px', color: '#fbbf24', marginBottom: '20px' }}>Get in Touch 🌿</h2>
          <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '30px' }}>
            Have questions regarding profile verification or registration? Our matchmaking support team is here to help you.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ margin: 0, color: '#f59e0b', fontSize: '12px', fontWeight: 'bold' }}>OFFICE ADDRESS</p>
              <p style={{ margin: '4px 0 0', fontSize: '15px' }}>Coimbatore, Tamil Nadu, India</p>
            </div>
            <div>
              <p style={{ margin: 0, color: '#f59e0b', fontSize: '12px', fontWeight: 'bold' }}>PHONE SUPPORT</p>
              <p style={{ margin: '4px 0 0', fontSize: '15px' }}>+91 94455 55941</p>
            </div>
            <div>
              <p style={{ margin: 0, color: '#f59e0b', fontSize: '12px', fontWeight: 'bold' }}>EMAIL ADDRESS</p>
              <p style={{ margin: '4px 0 0', fontSize: '15px' }}>help@varam.app</p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div style={{ flex: '1 1 450px', padding: '40px' }}>
          <h3 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '20px' }}>Send Us a Message</h3>
          {submitted ? (
            <div style={{ padding: '20px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '8px' }}>
              Thank you for contacting us! Our support team will reach out within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                type="text"
                placeholder="Your Name"
                required
                style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' }}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' }}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' }}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <textarea
                placeholder="How can we help you?"
                rows="4"
                required
                style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', fontFamily: 'inherit' }}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
              <button
                type="submit"
                style={{ padding: '12px', backgroundColor: '#991b1b', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}