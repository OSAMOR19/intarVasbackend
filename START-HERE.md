# 🚀 How to Connect Backend to Your React Vite Project

## ✅ Your Backend is Already Running!

Your backend server is live at: **http://localhost:3001**

---

## 📋 Step-by-Step Guide

### Step 1: Copy the Contact Form Component

I've created a ready-to-use React component for you!

1. **Copy the file** `ContactForm-COPY-THIS.jsx` 
2. **Paste it** into your Vite project at: `src/components/ContactForm.jsx`

### Step 2: Use it in Your App

Open your `src/App.jsx` and add:

```jsx
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div>
      <h1>Intarvas</h1>
      <ContactForm />
    </div>
  );
}

export default App;
```

### Step 3: Test It!

1. Make sure your Vite dev server is running:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:5173`

3. Fill out the contact form and click "Send Message"

4. Check your email at `admin@intarvas.com` - you should receive the message!

---

## 🔍 How It Works (Simple Explanation)

```
User fills form → React sends data → Backend (port 3001) → Resend API → Your Email
    ↓                                          ↓
Your Vite App                         This folder (running now!)
```

---

## 📝 Quick Test (Optional)

Want to test the backend directly? Run this in a terminal:

```bash
curl -X POST http://localhost:3001/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing the backend!"
  }'
```

You should get back:
```json
{"success":true,"message":"Email sent successfully!"}
```

---

## 🛠️ If Something Doesn't Work

### Problem: "Failed to fetch" error in browser
**Solution:** Make sure this backend is running
```bash
cd /Users/cyberzik/Desktop/intarVasbackend
npm run dev
```

### Problem: CORS error in browser console
**Solution:** Your backend `.env` file should have:
```
FRONTEND_URL=http://localhost:5173
```

### Problem: Email not arriving
**Solution:** 
- Check your Resend API key is correct in `.env`
- Look at the terminal where backend is running for error messages
- Make sure `TO_EMAIL=admin@intarvas.com` in `.env`

---

## 🌐 For Production (When You Deploy)

### Deploy Backend:
1. Push this folder to GitHub
2. Deploy to Railway/Render/Heroku
3. You'll get a URL like: `https://intarvas-backend.railway.app`

### Update Frontend:
Replace `http://localhost:3001` with your deployed URL in the ContactForm component:

```javascript
const API_URL = import.meta.env.PROD 
  ? 'https://intarvas-backend.railway.app'  // Your deployed backend
  : 'http://localhost:3001';                // Local development

const response = await fetch(`${API_URL}/send-email`, { ... });
```

### Update Backend CORS:
In backend `.env`, change:
```
FRONTEND_URL=https://your-actual-domain.com
```

---

## 📁 What's in This Folder

- `server.js` - The main backend code (handles email sending)
- `.env` - Your secret configuration (API keys, emails)
- `ContactForm-COPY-THIS.jsx` - React component for your Vite project
- `package.json` - Dependencies list

---

## 🎯 Next Steps

1. ✅ Backend is running (done!)
2. 📋 Copy `ContactForm-COPY-THIS.jsx` to your Vite project
3. 🎨 Import and use `<ContactForm />` in your App
4. 🧪 Test by sending a message
5. 📧 Check your email!

---

**Need help?** Check:
- `VITE-INTEGRATION.md` - Detailed integration guide
- `README.md` - Full documentation
- Browser console (F12) - For frontend errors
- Backend terminal - For backend errors

You got this! 💪

