from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


users_db = {}
jobs_db = {}
likes_db = {}

class User(BaseModel):
    email: str
    password: str
    role: str

class SignupUser(BaseModel):
    email: str
    password: str
    role: str

class LoginUser(BaseModel):
    email: str
    password: str

class Profile(BaseModel):
    name: str
    bio: str = None
    skills: list[str] = []
    company_name: str = None
    company_description: str = None
    location: str

class Job(BaseModel):
    title: str
    description: str
    location: str
    skills_required: list[str] = []
    salary_range: str = None
    posted_by: str

class SwipeAction(BaseModel):
    email: str
    job_id: int
    action: str #like or skip action


@app.get("/Welcome")
def home():
    return {"message": "Welcome to Seekr! how are you toady!!"}

@app.post("/signup")
def signup(user: SignupUser):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered.")
    users_db[user.email] = {
        "password": user.password,
        "role": user.role
    }
    return {"message": "User created successfully!"}

@app.post("/login")
def login(user: LoginUser):
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
    users_db[email]["Profile"] = profile.model_dump()
    return {"message": "Profile updated!"}

@app.post("/post_job")
def post_job(job: Job):
    if job.posted_by not in users_db:
        raise HTTPException(status_code=404, detail="Recruiter not registered")

    if users_db[job.posted_by]["role"] != "recruiter":
        raise HTTPException(status_code=403, detail="Only recruiters can post jobs")

    job_id = len(jobs_db) + 1
    jobs_db[job_id] = job.model_dump()
    return {"message": "Job posted!", "job_id": job_id}

@app.get("/list_jobs")
def list_jobs():
    return jobs_db


@app.post("/swipe_job")
def swipe_job(action: SwipeAction):
    if action.email not in users_db:
        raise HTTPException(status_code=404, detail="User not found.")

    if users_db[action.email]["role"] != "job_seeker":
        raise HTTPException(status_code=403, detail="Only job seekers can swipe.")

    if action.job_id not in jobs_db:
        raise HTTPException(status_code=404, detail="Job not found.")

    if action.email not in likes_db:
        likes_db[action.email] = {"liked": [], "skipped": []}

    if action.action == "like":
        likes_db[action.email]["liked"].append(action.job_id)
        action_word = "liked"
    elif action.action == "skip":
        likes_db[action.email]["skipped"].append(action.job_id)
        action_word = "skipped"
    else:
        raise HTTPException(status_code=400, detail="Action must be 'like' or 'skip'.")

    return {"message": f"Job {action_word} successfully."}


@app.get("/liked_jobs")
def liked_jobs(email: str):
    if email not in users_db:
        raise HTTPException(status_code=404, detail="User not found.")

    if users_db[email]["role"] != "job_seeker":
        raise HTTPException(status_code=403, detail="Only job seekers can like.")

    if email not in likes_db or not likes_db[email]["liked"]:
        return {"message": "No liked jobs found"}

    liked_job_ids = likes_db[email]["liked"]
    liked_jobs_list = [jobs_db[job_id] for job_id in liked_job_ids if job_id in jobs_db]

    return {"liked_jobs": liked_jobs_list}

#TODO we need to add some simple frontend for visualizing the changes and stuff like that. also i need to add filtering of jobs based on the skill set.
#TODO remove skills option from the bio page and add a selection of skills which user can select. this will streamline the filtering.