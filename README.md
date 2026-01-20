# AI Code Review Agent

A full-stack generative AI agent application for intelligent code review using the latest AI models.

## Tech Stack

- **Backend**: Python, FastAPI, Pydantic AI
- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS
- **Model Access**: OpenRouter API
- **AI Model**: Claude 3.5 Sonnet

## Project Structure

```
ai-code-review-agent/
├── backend/
│   ├── main.py          # FastAPI application
│   ├── agent.py         # Pydantic AI agent logic
│   ├── requirements.txt  # Python dependencies
│   └── .env.example     # Environment variables template
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx     # Home page
│   │   ├── layout.tsx   # Root layout
│   │   └── globals.css  # Global styles
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create `.env` file from `.env.example` and add your OpenRouter API key:
   ```bash
   cp .env.example .env
   ```

5. Run the server:
   ```bash
   python main.py
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /review` - Review code using AI agent

### POST /review

**Request Body:**
```json
{
  "language": "python",
  "code": "your code here"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:8000/review \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "code": "def calculate_average(numbers):\n    return sum(numbers) / len(numbers)"
  }'
```

**Example with a buggy Python function:**
```bash
curl -X POST http://localhost:8000/review \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "code": "def divide_by_number(value, divisor):\n    return value / divisor\n\nresult = divide_by_number(10, 0)"
  }'
```

## Live Demo

Coming soon: [Deploy URL]

## Deployment

### Frontend Deployment to Netlify
See [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) for detailed instructions on deploying to Netlify.

**Quick Start:**
1. Push code to GitHub (already done ✅)
2. Connect GitHub repo to Netlify
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Deploy

### Backend Deployment
Deploy to one of these platforms:
- Render.com (recommended for FastAPI)
- Railway.app
- Heroku
- PythonAnywhere

Once deployed, update the frontend's `NEXT_PUBLIC_API_URL` to point to your backend.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
