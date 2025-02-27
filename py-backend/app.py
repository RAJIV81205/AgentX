import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

app = FastAPI()

# CORS Configuration
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the Google Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Mock session storage
user_sessions = {}

class ChatRequest(BaseModel):
    message: str
    session_id: str

class BookingRequest(BaseModel):
    destination: str
    check_in: str
    check_out: str
    guests: int

def generate_response(user_input: str) -> str:
    model = "gemini-2.0-flash"
    contents = [
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=user_input)],
        )
    ]
    generate_content_config = types.GenerateContentConfig(
        temperature=0.3,
        top_p=0.95,
        top_k=40,
        max_output_tokens=8192,
        response_mime_type="text/plain",
    )

    response_text = ""
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        response_text += chunk.text

    return response_text

@app.post("/chat")
async def chat(request: ChatRequest):
    user_input = request.message
    session_id = request.session_id

    if session_id not in user_sessions:
        user_sessions[session_id] = {"history": []}

    # Get AI response
    response = generate_response(user_input)

    # Update session history
    user_sessions[session_id]["history"].append({"user": user_input, "ai": response})

    return {"response": response}


