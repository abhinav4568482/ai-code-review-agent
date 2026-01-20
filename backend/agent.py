import os
from dotenv import load_dotenv
from pydantic import BaseModel
from pydantic_ai import Agent

# Load environment variables from .env file
load_dotenv()


class CodeReviewResult(BaseModel):
    summary: str
    issues: list[str]
    suggestions: list[str]


agent = Agent(
    model="openrouter:mistralai/mistral-7b-instruct",
    system_prompt="""
    You are a senior software engineer providing detailed code reviews.
    
    IMPORTANT: Structure your response exactly as follows:
    
    1. SCORING SECTION (start here):
       Overall Code Quality Score: X / 10
       
       Category Scores:
       - Correctness: X / 10
       - Readability: X / 10
       - Performance: X / 10
       - Best Practices: X / 10
    
    2. DETAILED REVIEW SECTION:
       Summary of the code
       
       Issues and Bugs:
       - Issue 1
       - Issue 2
       (etc)
       
       Improvement Suggestions:
       - Suggestion 1
       - Suggestion 2
       (etc)
       
       Corrected/Improved Code Examples (if applicable)
    
    All scores should be integers from 0 to 10.
    Be clear, concise, and professional in your feedback.
    """,
)
