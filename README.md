# Intarvas Backend - Contact Form API

A lightweight Node.js backend service for handling contact form submissions via the Resend email API.

## Features

- ✅ Express.js REST API
- ✅ Resend email integration
- ✅ CORS protection
- ✅ Rate limiting (5 requests per 15 minutes per IP)
- ✅ Input validation
- ✅ Secure API key storage
- ✅ Error handling

## Prerequisites

- Node.js 18.x or higher
- A [Resend](https://resend.com) account and API key
- npm or yarn

## Installation

1. **Clone or navigate to the project directory:**

```bash
cd intarVasbackend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory (copy from `env.example`):

```bash
cp env.example .env
```

4. **Configure your `.env` file:**

```env
# Get your API key from https://resend.com/api-keys
RESEND_API_KEY=re_your_actual_api_key_here

# Email to send from (must be verified domain in Resend)
FROM_EMAIL=contact@yourdomain.com

# Your inbox where contact form emails will be sent
TO_EMAIL=your-email@example.com

# Your frontend URL (for CORS)
FRONTEND_URL=https://intarvas.com

# Server port
PORT=3001
```

## Running the Server

### Development mode (with auto-reload):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will start on `http://localhost:3001` (or your configured PORT).

## API Endpoints

### Health Check

```
GET /
```

**Response:**
```json
{
  "status": "Intarvas Contact API is running"
}
```

### Send Contact Email

```
POST /send-email
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to get in touch..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully!",
  "emailId": "abc123..."
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Security Features

1. **API Key Protection**: Resend API key is stored server-side only in `.env` file
2. **CORS**: Configured to only accept requests from your frontend domain
3. **Rate Limiting**: Prevents spam (5 requests per 15 minutes per IP)
4. **Input Validation**: Validates email format and required fields
5. **Message Length Limit**: Maximum 5000 characters
6. **.gitignore**: Ensures `.env` file is never committed to version control

## Frontend Integration (React Example)

See `frontend-example.jsx` for a complete React component example.

Quick example:

```javascript
const response = await fetch('https://your-backend-domain.com/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello!'
  }),
});

const data = await response.json();
if (data.success) {
  console.log('Email sent!');
}
```

## Deployment

### Option 1: Railway

1. Push your code to GitHub
2. Connect your GitHub repo to [Railway](https://railway.app)
3. Add environment variables in Railway dashboard
4. Deploy!

### Option 2: Render

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repo
4. Add environment variables
5. Deploy!

### Option 3: Heroku

```bash
heroku create intarvas-backend
heroku config:set RESEND_API_KEY=your_key
heroku config:set TO_EMAIL=your@email.com
heroku config:set FROM_EMAIL=noreply@yourdomain.com
heroku config:set FRONTEND_URL=https://intarvas.com
git push heroku main
```

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `RESEND_API_KEY` | Yes | Your Resend API key | `re_abc123...` |
| `TO_EMAIL` | Yes | Destination email for contact forms | `you@example.com` |
| `FROM_EMAIL` | Yes | Sender email (must be verified in Resend) | `contact@yourdomain.com` |
| `FRONTEND_URL` | Yes | Your frontend domain for CORS | `https://intarvas.com` |
| `PORT` | No | Server port (default: 3001) | `3001` |

## Troubleshooting

### Issue: CORS errors
**Solution**: Make sure `FRONTEND_URL` in `.env` matches your frontend domain exactly (including protocol and port).

### Issue: Email not sending
**Solution**: 
- Verify your Resend API key is correct
- Ensure `FROM_EMAIL` domain is verified in your Resend account
- Check server logs for specific error messages

### Issue: Rate limit errors
**Solution**: The rate limiter allows 5 requests per 15 minutes per IP. Wait or adjust the limits in `server.js`.

## License

ISC

## Support

For issues or questions, please open an issue in the repository.

