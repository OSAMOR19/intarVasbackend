# How to Connect Backend to Your React Vite Project

## Overview
You have two parts:
1. **Backend** (this folder) - Runs on `http://localhost:3001`
2. **Frontend** (your Vite React app) - Runs on `http://localhost:5173`

They talk to each other through HTTP requests!

---

## Step 1: Start the Backend Server

Open a terminal in this folder and run:

```bash
npm run dev
```

You should see:
```
🚀 Intarvas backend server running on port 3001
📧 Ready to handle contact form submissions
```

**Keep this terminal window open!** Your backend needs to stay running.

---

## Step 2: Add Code to Your React Vite Project

### Option A: Simple Contact Form (Copy & Paste Ready)

In your Vite project, create a new file: `src/components/ContactForm.jsx`

```jsx
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
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setStatus('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('❌ ' + data.error);
      }
    } catch (error) {
      setStatus('❌ Failed to send. Is the backend running?');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows="5"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {status && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: status.includes('✅') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${status.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {status}
        </div>
      )}
    </div>
  );
}
```

### Option B: Add to Existing Component

If you already have a contact form, just add this function:

```javascript
const handleContactSubmit = async (name, email, message) => {
  try {
    const response = await fetch('http://localhost:3001/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();
    
    if (data.success) {
      alert('Message sent!');
    } else {
      alert('Error: ' + data.error);
    }
  } catch (error) {
    alert('Failed to send. Is the backend running?');
  }
};
```

---

## Step 3: Use the Component in Your App

In your `src/App.jsx` or wherever you want the contact form:

```jsx
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div>
      <h1>Welcome to Intarvas</h1>
      <ContactForm />
    </div>
  );
}

export default App;
```

---

## Step 4: Test It!

1. ✅ Backend running? Check terminal: `http://localhost:3001`
2. ✅ Frontend running? `npm run dev` in your Vite project
3. ✅ Fill out the form and click "Send Message"
4. ✅ Check your email inbox at `admin@intarvas.com`

---

## Common Issues & Solutions

### ❌ "Failed to fetch" error
**Problem:** Backend is not running  
**Solution:** Open terminal in `/Users/cyberzik/Desktop/intarVasbackend` and run `npm run dev`

### ❌ CORS error
**Problem:** Frontend URL doesn't match  
**Solution:** In backend `.env` file, make sure `FRONTEND_URL=http://localhost:5173`

### ❌ Email not arriving
**Problem:** Resend API key or email config  
**Solution:** 
- Check your Resend API key is correct
- Verify email address in Resend dashboard
- Check backend terminal for error messages

---

## For Production (When Deploying)

### 1. Deploy Backend
- Deploy backend to Railway, Render, or Heroku
- You'll get a URL like: `https://your-app.railway.app`

### 2. Update Frontend
Replace `http://localhost:3001` with your deployed backend URL:

```javascript
// Create a config file: src/config.js
export const API_URL = import.meta.env.PROD 
  ? 'https://your-app.railway.app'  // Production URL
  : 'http://localhost:3001';        // Development URL

// Use it in your component:
import { API_URL } from './config';

fetch(`${API_URL}/send-email`, { ... })
```

### 3. Update Backend CORS
In backend `.env`, change:
```
FRONTEND_URL=https://your-actual-intarvas-domain.com
```

---

## Quick Test Command

Test if backend is working:

```bash
curl -X POST http://localhost:3001/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello!"}'
```

Should return: `{"success":true,"message":"Email sent successfully!"}`

---

## Need Help?

1. Make sure backend terminal shows: "🚀 Intarvas backend server running on port 3001"
2. Make sure Vite dev server is running: "Local: http://localhost:5173"
3. Open browser console (F12) to see any errors
4. Check backend terminal for error messages

You're all set! 🎉

