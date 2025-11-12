// React Contact Form Component Example
// Copy this code to your React frontend application

import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({
    loading: false,
    message: '',
    type: '', // 'success' or 'error'
  });

  // Update this URL to your deployed backend URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });

    try {
      const response = await fetch(`${API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          loading: false,
          message: 'Thank you! Your message has been sent successfully.',
          type: 'success',
        });
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          loading: false,
          message: data.error || 'Something went wrong. Please try again.',
          type: 'error',
        });
      }
    } catch (error) {
      setStatus({
        loading: false,
        message: 'Failed to send message. Please check your connection and try again.',
        type: 'error',
      });
      console.error('Error:', error);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status.loading}
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status.loading}
            placeholder="your.email@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={status.loading}
            rows="6"
            placeholder="Your message..."
            maxLength="5000"
          />
        </div>

        <button type="submit" disabled={status.loading}>
          {status.loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {status.message && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}

      <style jsx>{`
        .contact-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        h2 {
          margin-bottom: 24px;
          color: #333;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #555;
        }

        input,
        textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: #007bff;
        }

        input:disabled,
        textarea:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        textarea {
          resize: vertical;
          font-family: inherit;
        }

        button {
          width: 100%;
          padding: 14px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover:not(:disabled) {
          background-color: #0056b3;
        }

        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .status-message {
          margin-top: 20px;
          padding: 12px;
          border-radius: 6px;
          text-align: center;
        }

        .status-message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status-message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;

// ============================================
// Alternative: Vanilla JavaScript / Fetch API
// ============================================

/*
// Add this to your HTML file
<form id="contactForm">
  <input type="text" id="name" name="name" placeholder="Name" required>
  <input type="email" id="email" name="email" placeholder="Email" required>
  <textarea id="message" name="message" placeholder="Message" required></textarea>
  <button type="submit">Send</button>
</form>
<div id="status"></div>

// Add this JavaScript
const form = document.getElementById('contactForm');
const statusDiv = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch('http://localhost:3001/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      statusDiv.textContent = 'Message sent successfully!';
      statusDiv.style.color = 'green';
      form.reset();
    } else {
      statusDiv.textContent = data.error || 'Failed to send message.';
      statusDiv.style.color = 'red';
    }
  } catch (error) {
    statusDiv.textContent = 'Error sending message. Please try again.';
    statusDiv.style.color = 'red';
    console.error('Error:', error);
  }
});
*/

// ============================================
// Alternative: Next.js API Route Handler
// ============================================

/*
// If you want to proxy through your Next.js backend instead of calling directly:
// Create: pages/api/contact.js (or app/api/contact/route.js for App Router)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('http://localhost:3001/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
}

// Then in your frontend, call:
// fetch('/api/contact', { method: 'POST', ... })
*/

