from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

users_db = {}

class User(BaseModel):
    email: str
    password: str
    role: str

class Profile(BaseModel):
    name: str
    bio: str = None
    skills: list[str] = []
    company_name: str = None
    company_description: str = None
    location: str

@app.get("/")
def home():
    return {"message": "Welcome to Seekr! how are you toady!!"}

@app.post("/signup")
def signup(user: User):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    users_db[user.email] = {
        "password": user.password,
        "role": user.role
    }
    return {"message": "User registered!"}

@app.post("/login")
def login(user: User):
    if user.email not in users_db or users_db[user.email]["password"] != user.password:
        raise HTTPException(status_code=401, detail="Incorrect email or password.")
    return {
        "message": "Login successful!",
        "role": users_db[user.email]["role"]
    }

@app.post("/update_profile")
def update_profile(email: str, profile: Profile):
    if email not in users_db:
        raise HTTPException(status_code=404, detail="Email not registered")
    users_db[email]["Profile"] = Profile.dict()
    return {"message": "Profile updated!"}