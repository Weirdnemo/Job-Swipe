from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

DATABASE_URL = "sqlite:///./seekr.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    profile = Column(JSON)  # Store profile details in JSON

class JobDB(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    location = Column(String, nullable=False)
    skills_required = Column(JSON)
    salary_range = Column(String)
    posted_by = Column(String, nullable=False)

class LikesDB(Base):
    __tablename__ = "likes"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, nullable=False)
    job_id = Column(Integer, nullable=False)
    action = Column(String, nullable=False)  # 'like' or 'skip'


Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/Welcome")
def home():
    return {"message": "Welcome to Seekr! how are you toady!!"}

@app.post("/signup")
def signup(user: SignupUser, db: Session = Depends(get_db)):
    existing_user = db.query(UserDB).filter(UserDB.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered.")

    db_user = UserDB(
        email=user.email,
        password=user.password,
        role=user.role,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User created successfully!"}

@app.post("/login")
def login(user: LoginUser, db: Session = Depends(get_db)):
    db_user = db.query(UserDB).filter(UserDB.email == user.email).first()
    if not db_user:
        print("No user found")
        raise HTTPException(status_code=401, detail="Incorrect email or password.")
    print("User found:", db_user)
    if db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Incorrect email or password.")
    return {
        "message": "Login successful!",
        "role": db_user.role
    }

@app.post("/update_profile")
def update_profile(email: str, profile: Profile, db: Session = Depends(get_db)):
    db_user = db.query(UserDB).filter(UserDB.email == email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")

    db_user.profile = profile.model_dump()
    db.commit()
    return {"message": "Profile updated successfully!"}

@app.post("/post_job")
def post_job(job: Job, db: Session = Depends(get_db)):
    recruiter = db.query(UserDB).filter(UserDB.email == job.posted_by, UserDB.role == "recruiter").first()
    if not recruiter:
        raise HTTPException(status_code=403, detail="Only recruiters can post jobs.")

    db_job = JobDB(
        title=job.title,
        description=job.description,
        location=job.location,
        skills_required=job.skills_required,
        salary_range=job.salary_range,
        posted_by=job.posted_by
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return {"message": "Job posted successfully!", "job_id": db_job.id}

@app.get("/list_jobs")
def list_jobs(db: Session = Depends(get_db)):
    jobs = db.query(JobDB).all()
    jobs_list = []
    for job in jobs:
        jobs_list.append({
            "id": job.id,
            "title": job.title,
            "description": job.description,
            "location": job.location,
            "skills_required": job.skills_required,
            "salary_range": job.salary_range,
            "posted_by": job.posted_by
        })
    return {"jobs": jobs_list}

@app.post("/swipe_job")
def swipe_job(action: SwipeAction, db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.email == action.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    if user.role != "job_seeker":
        raise HTTPException(status_code=403, detail="Only job seekers can swipe.")

    job = db.query(JobDB).filter(JobDB.id == action.job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found.")

    like_entry = LikesDB(user_email=action.email, job_id=action.job_id, action=action.action)
    db.add(like_entry)
    db.commit()

    return {"message": f"Job {action.action} successfully."}

@app.get("/liked_jobs")
def liked_jobs(email: str, db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    if user.role != "job_seeker":
        raise HTTPException(status_code=403, detail="Only job seekers can view liked jobs.")

    liked_job_ids = db.query(LikesDB).filter(LikesDB.user_email == email, LikesDB.action == "like").all()
    liked_job_ids = [like.job_id for like in liked_job_ids]

    if not liked_job_ids:
        return {"message": "No liked jobs found."}

    liked_jobs = db.query(JobDB).filter(JobDB.id.in_(liked_job_ids)).all()

    jobs_list = []
    for job in liked_jobs:
        jobs_list.append({
            "id": job.id,
            "title": job.title,
            "description": job.description,
            "location": job.location,
            "skills_required": job.skills_required,
            "salary_range": job.salary_range,
            "posted_by": job.posted_by
        })

    return {"liked_jobs": jobs_list}


#TODO we need to add some simple frontend for visualizing the changes and stuff like that. also i need to add filtering of jobs based on the skill set.
#TODO remove skills option from the bio page and add a selection of skills which user can select. this will streamline the filtering.