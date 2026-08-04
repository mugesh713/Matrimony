import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Prepare payload using your Web3Forms Access Key
    const payload = {
      access_key: 'c0c73370-09c9-46e5-a720-a12e1021a418',
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      message: formData.message,
      subject: `New Contact Inquiry from ${formData.name}`,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setErrorMsg(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <style>{`
        .contact-wrapper {
          background-color: #f8fafc;
          min-height: 100vh;
          padding: 50px 20px;
          font-family: system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .contact-card {
          background: #fff;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }
        .input-field {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          margin-top: 6px;
          margin-bottom: 16px;
          box-sizing: border-box;
          font-size: 14px;
        }
        .submit-btn {
          background-color: #7a1c1c;
          color: #fff;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
          transition: background-color 0.2s;
        }
        .submit-btn:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }
        @media (max-width: 600px) {
          .contact-wrapper { padding: 25px 15px; }
          .contact-card { padding: 20px; }
        }
      `}</style>

      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
        <h1 style={{ fontSize: '32px', color: '#1a1a1a', marginBottom: '10px' }}>Contact Support</h1>
        <p style={{ color: '#666', fontSize: '15px' }}>
          Have questions about memberships or need help with your profile? Get in touch with us!
        </p>
      </div>

      <div className="contact-grid">
        {/* Left Side: Contact Information */}
        <div className="contact-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ color: '#7a1c1c', margin: 0, fontSize: '20px' }}>Get In Touch</h3>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
            <div style={{ fontSize: '24px' }}>📍</div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px' }}>Office Address</strong>
              <span style={{ color: '#666', fontSize: '14px' }}>Main Road, City Center, Tamil Nadu, India</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
            <div style={{ fontSize: '24px' }}>📞</div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px' }}>Phone / WhatsApp</strong>
              <span style={{ color: '#666', fontSize: '14px' }}>+91 94455 55941</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
            <div style={{ fontSize: '24px' }}>✉️</div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px' }}>Email Support</strong>
              <span style={{ color: '#666', fontSize: '14px' }}>help@varam.app</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
            <div style={{ fontSize: '24px' }}>⏰</div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px' }}>Working Hours</strong>
              <span style={{ color: '#666', fontSize: '14px' }}>Mon - Sat: 9:00 AM - 7:00 PM</span>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="contact-card">
          <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#1a1a1a' }}>Send Us a Message</h3>

          {submitted && (
            <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', border: '1px solid #bbf7d0' }}>
              ✓ Thank you! Your message has been sent to our support team.
            </div>
          )}

          {errorMsg && (
            <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', border: '1px solid #fecaca' }}>
              ✕ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={{ fontSize: '13px', fontWeight: '600' }}>Your Name *</label>
            <input
              required
              className="input-field"
              placeholder="Full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <label style={{ fontSize: '13px', fontWeight: '600' }}>Email Address *</label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <label style={{ fontSize: '13px', fontWeight: '600' }}>Phone Number</label>
            <input
              className="input-field"
              placeholder="+91 Mobile Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <label style={{ fontSize: '13px', fontWeight: '600' }}>Message *</label>
            <textarea
              required
              rows={4}
              className="input-field"
              placeholder="How can we help you?"
              style={{ resize: 'vertical' }}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
