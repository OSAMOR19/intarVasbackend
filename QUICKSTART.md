# Quick Start Guide

Get your Intarvas contact form backend running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Get Your Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `re_`)

## Step 3: Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Copy the example file
cp env.example .env
```

Edit `.env` and add your values:

```env
RESEND_API_KEY=re_your_actual_key_here
FROM_EMAIL=contact@yourdomain.com
TO_EMAIL=your-email@example.com
FRONTEND_URL=https://intarvas.com
PORT=3001
```

**Important Notes:**
- `FROM_EMAIL` must be from a domain you've verified in Resend
- For testing, you can use `onboarding@resend.dev` as `FROM_EMAIL`
- `TO_EMAIL` is where contact form emails will be sent (your inbox)
- Update `FRONTEND_URL` to match your actual frontend domain

## Step 4: Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

You should see:
```
🚀 Intarvas backend server running on port 3001
📧 Ready to handle contact form submissions
```

## Step 5: Test the API

### Using curl:

```bash
curl -X POST http://localhost:3001/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test isaac",
    "email": "admin@intarvas.com",
    "message": "This is a test from isaac"
  }'
```

### Using Postman or Thunder Client:

- **Method:** POST
- **URL:** `http://localhost:3001/send-email`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "message": "This is a test message"
}
```

## Step 6: Integrate with Frontend

Add this to your React component:

```javascript
const handleSubmit = async (formData) => {
  const response = await fetch('http://localhost:3001/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  const data = await response.json();
  if (data.success) {
    alert('Message sent!');
  }
};
```

See `frontend-example.jsx` for a complete React component.

## Step 7: Deploy

When ready to deploy:

1. Push code to GitHub
2. Deploy to Railway, Render, or Heroku
3. Add environment variables in hosting dashboard
4. Update `REACT_APP_API_URL` in your frontend to point to deployed backend

## Common Issues

### ❌ "Missing required fields" error
- Make sure you're sending `name`, `email`, and `message` in the request body

### ❌ CORS error
- Verify `FRONTEND_URL` in `.env` matches your frontend URL exactly
- Include protocol (`https://` or `http://`)

### ❌ "Failed to send email" error
- Check your Resend API key is correct
- Verify `FROM_EMAIL` domain is verified in Resend
- Check server logs for detailed error message

### ❌ Rate limit error
- Default limit is 5 requests per 15 minutes per IP
- Wait 15 minutes or adjust limit in `server.js`

## Next Steps

✅ Test the endpoint locally  
✅ Integrate with your React frontend  
✅ Deploy to production  
✅ Update frontend API URL  
✅ Test on production  

Need help? Check the full `README.md` for detailed documentation.

