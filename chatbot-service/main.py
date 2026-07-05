import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types

# .env file se GEMINI_API_KEY load karo
load_dotenv()

# FastAPI app banao — Express mein "const app = express()" jaisa
app = FastAPI()

# CORS — frontend (localhost:5173) ko backend se baat karne do
# Thumbnail Generator mein bhi yahi issue aaya tha remember?
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

# Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# System prompt
SYSTEM_PROMPT = """
You are the official AI support assistant embedded on the DevOnboard landing page.
Your job is to help visitors understand what DevOnboard is and answer their questions
about it, using only the information provided below.

PRODUCT INFO:
Name: DevOnboard
Category: SaaS tool for engineering/DevOps teams
Stage: In development, MVP about to launch

Problem it solves:
When a new developer joins a company, giving them access to GitHub, Slack,
and Jira is often slow and frustrating - managers are busy, wrong Slack
channels get added, and the new dev sits idle waiting for access.

Solution:
DevOnboard is a visual workflow builder specifically for developer onboarding.
You define your onboarding workflow once (GitHub access -> Slack channels
-> Jira setup -> Notion docs -> whatever your stack needs), and every time
a new developer joins, it all fires automatically. Zero manual steps.
Zero interruptions. Productive from day zero.

RULES:
1. Only answer questions about DevOnboard.
2. If unrelated, politely decline and redirect.
3. Never invent features, pricing, or facts not in PRODUCT INFO.
4. If you don't know, say so honestly.
5. Keep answers 2-4 sentences unless asked for more.
6. Tone: friendly, confident, professional.
"""

# Request body — Pydantic model
# TypeScript mein "interface ChatRequest { message: string }" jaisa samajh lo
class ChatRequest(BaseModel):
    message: str

# POST /api/chat endpoint
# Express mein "app.post('/api/chat', (req, res) => {})" jaisa
@app.post("/api/chat")
async def chat(req: ChatRequest):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=req.message,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT
        ),
    )
    return {"reply": response.text}