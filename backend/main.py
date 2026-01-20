from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import agent
import os

app = FastAPI(title="AI Code Review Agent API", version="0.1.0")

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CodeInput(BaseModel):
    language: str
    code: str


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok", "service": "AI Code Review Agent API"}


@app.post("/review")
async def review_code(request: CodeInput):
    """Review code using AI agent"""
    try:
        result = await agent.run(f"Language: {request.language}\n\nCode:\n{request.code}")
        return {"review": result.output if hasattr(result, 'output') else str(result)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
