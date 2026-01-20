# Netlify Deployment Guide

This guide explains how to deploy the **frontend** to Netlify and configure it to work with your backend.

## Frontend Deployment to Netlify

### Step 1: Prepare GitHub Repository
Your repository is already pushed to GitHub. Make sure your latest changes are committed:

```bash
git add .
git commit -m "Add Netlify configuration"
git push origin main
```

### Step 2: Connect to Netlify
1. Go to [Netlify](https://netlify.com)
2. Click **"New site from Git"**
3. Select **GitHub** and authorize
4. Choose your `ai-code-review-agent` repository
5. Configure build settings:
   - **Base directory**: `frontend` (or leave empty if frontend is in root)
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

### Step 3: Set Environment Variables
1. In Netlify dashboard, go to **Site settings** > **Build & Deploy** > **Environment**
2. Add these environment variables:

```
NEXT_PUBLIC_API_URL = https://your-backend-url.com/
```

**Important:** Replace `your-backend-url.com` with your actual backend deployment URL.

### Step 4: Deploy Backend (Separate)
Your backend needs to be deployed separately. Options:
- **Render.com** (free tier available)
- **Railway.app**
- **Heroku**
- **PythonAnywhere**
- **AWS/Azure**

Once your backend is deployed, update the `NEXT_PUBLIC_API_URL` environment variable in Netlify.

### Step 5: Enable Functions (Optional)
If you want serverless functions:
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Create `netlify/functions/` folder for any serverless functions
3. They'll auto-deploy

## Frontend + Backend Setup

### Local Development
```bash
# Terminal 1: Backend
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn main:app --reload

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`

### Production Checklist
- [ ] Backend deployed and accessible
- [ ] `NEXT_PUBLIC_API_URL` set in Netlify
- [ ] CORS enabled on backend for Netlify domain
- [ ] Environment variables (.env) files NOT committed
- [ ] `netlify.toml` configured correctly
- [ ] Build succeeds locally: `cd frontend && npm run build`

## Troubleshooting

### Build fails on Netlify
- Check Netlify build logs
- Ensure `package.json` has `build` script
- Verify Node.js version matches (18+)

### API calls fail
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend CORS allows Netlify domain
- Check network tab in browser DevTools

### Backend API calls blocked
Add this to your backend's CORS configuration:
```python
allow_origins=["https://your-netlify-domain.netlify.app", "*"]
```

## Project Structure
```
ai-code-review-agent/
├── netlify.toml              # Netlify build config
├── .netlifyignore            # Files to ignore in deploy
├── .env.netlify.example      # Netlify env variables template
├── README.md
├── backend/
│   ├── main.py
│   ├── agent.py
│   └── requirements.txt
└── frontend/
    ├── app/
    ├── package.json
    └── ...
```

## Next Steps
1. Deploy backend first
2. Get backend deployment URL
3. Update `NEXT_PUBLIC_API_URL` in Netlify
4. Deploy frontend
5. Test the full application

Need help? Check the main [README.md](./README.md)
