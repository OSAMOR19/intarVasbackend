// ============================================
// COPY THIS FILE TO YOUR VITE PROJECT
// Path: src/components/ContactForm.jsx
// ============================================

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      // This connects to your backend running on port 3001
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setStatus('✅ Message sent successfully! Check your email.');
        // Clear form
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('❌ Error: ' + data.error);
      }
    } catch (error) {
      setStatus('❌ Failed to send. Make sure the backend is running!');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Contact Us</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Name *
          </label>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Email *
          </label>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Message Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Message *
          </label>
          <textarea
            placeholder="Your message here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            disabled={loading}
            rows="6"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              resize: 'vertical',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.backgroundColor = '#0056b3';
          }}
          onMouseOut={(e) => {
            if (!loading) e.target.style.backgroundColor = '#007bff';
          }}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Status Message */}
      {status && (
        <div style={{
          marginTop: '20px',
          padding: '12px',
          backgroundColor: status.includes('✅') ? '#d4edda' : '#f8d7da',
          color: status.includes('✅') ? '#155724' : '#721c24',
          border: `1px solid ${status.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          {status}
        </div>
      )}
    </div>
  );
}

// ============================================
// HOW TO USE IN YOUR APP:
// ============================================
// 
// 1. Copy this file to: src/components/ContactForm.jsx
//
// 2. In your App.jsx or any page:
//    import ContactForm from './components/ContactForm';
//
// 3. Use it like:
//    <ContactForm />
//
// 4. Make sure your backend is running on port 3001
//
// ============================================

