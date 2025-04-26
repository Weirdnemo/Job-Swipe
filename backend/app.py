from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

users_db = {}

class User(BaseModel):
    email: str
    password: str

@app.get("/")
def home():
    return {"message": "Welcome to Seekr! how are you toady!!"}

@app.post("/signup")
def signup(user: User):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    users_db[user.email] = user.password
    return {"message": "User registered!"}

@app.post("/login")
def login(user: User):
    if user.email not in users_db or users_db[user.email] != user.password:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    return {"message": "Login successful!"}