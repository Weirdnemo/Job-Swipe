import streamlit as st
import google.generativeai as genai
import os
import fitz  # PyMuPDF for PDF
import docx  # for .docx

# -- SKILLS LIST (Categorized) --
SKILLS_CATEGORIES = {
    "Programming Languages": [
        "Python", "Java", "C++", "C#", "JavaScript", "TypeScript", "HTML", "CSS",
        "PHP", "Ruby", "Swift", "Kotlin", "Go"
    ],
    "Data Science & Analytics": [
        "Machine Learning", "Deep Learning", "Data Analysis", "Data Mining",
        "Statistical Modeling", "Predictive Analytics", "Big Data", "Hadoop", "Spark",
        "Pandas", "NumPy", "SciPy", "Matplotlib", "Seaborn", "Tableau", "Power BI"
    ],
    "Cloud Computing": [
        "Cloud Computing", "AWS", "Azure", "Google Cloud Platform (GCP)", "Serverless",
        "Docker", "Kubernetes", "DevOps"
    ],
    "Cybersecurity": [
        "Cybersecurity", "Network Security", "Information Security", "Ethical Hacking",
        "Penetration Testing"
    ],
    "Databases": [
        "SQL", "NoSQL", "MySQL", "PostgreSQL", "MongoDB", "Cassandra"
    ],
    "Project Management & Business": [
        "Project Management", "Agile", "Scrum", "Business Analysis", "Requirements Gathering"
    ],
    "Design & UX": [
        "UI Design", "UX Design", "User Research", "Figma", "Sketch"
    ],
    "Marketing & Sales": [
        "Digital Marketing", "SEO", "SEM", "Social Media Marketing", "Sales", "CRM"
    ],
    "Other": [
        "Linux", "Git", "NLP", "TensorFlow", "Communication Skills", "Problem-Solving",
        "Financial Analysis", "Accounting", "Recruitment", "English", "Spanish", "French"
    ]
    # Add more categories as needed
}

# -- STREAMLIT UI --
st.set_page_config(page_title="AI Job Recommender", layout="centered")
st.title("🧠 AI-Powered Job Recommender")

st.sidebar.markdown("### Select Skills")
selected_category = st.sidebar.selectbox("Choose a skill category:", list(SKILLS_CATEGORIES.keys()))

selected_skills = st.sidebar.multiselect(
    f"Choose your skills from {selected_category}:",
    SKILLS_CATEGORIES[selected_category]
)

# -- API KEY INPUT (Moved to sidebar for better organization) --
gemini_api_key = st.sidebar.text_input("Enter your Gemini API Key:", type="password")
if not gemini_api_key:
    st.sidebar.warning("Please enter your Gemini API key to use the app.")
    st.sidebar.info("You can get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey).")
else:
    os.environ["GEMINI_API_KEY"] = gemini_api_key
    try:
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        model = genai.GenerativeModel("gemini-1.5-pro")
    except Exception as e:
        st.sidebar.error(f"Error configuring Gemini API: {e}")
        model = None

st.markdown("### Upload Your Resume")
resume_file = st.file_uploader("Upload a PDF or DOCX resume", type=["pdf", "docx"])

if st.button("🔍 Find Matching Jobs"):
    # ... (rest of your code remains mostly the same, but now uses 'selected_skills')
    if not gemini_api_key:
        st.warning("Please enter your Gemini API key in the sidebar.")
    elif not selected_skills:
        st.warning("Please select at least one skill.")
    elif not resume_file:
        st.warning("Please upload your resume.")
    elif model is None:
        st.error("Gemini API is not configured correctly. Please check your API key.")
    else:
        # -- EXTRACT RESUME TEXT --
        def extract_resume_text(file):
            if file.type == "application/pdf":
                text = ""
                with fitz.open(stream=file.read(), filetype="pdf") as doc:
                    for page in doc:
                        text += page.get_text()
                return text
            elif file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                doc = docx.Document(file)
                return "\n".join([p.text for p in doc.paragraphs])
            else:
                return ""

        resume_text = extract_resume_text(resume_file)

        # -- CREATE PROMPT --
        skills_str = ", ".join(selected_skills)
        prompt = f"""
        You are an AI career advisor.

        The user has the following skills: {skills_str}.
        Here is their resume content:
        \"\"\"
        {resume_text}
        \"\"\"

        Based on this, suggest 3 job **titles** that are a good fit.

        For each job, give:
        - The **job title** on the first line.
        - A short list (2–3 bullet points) of **skills/tools to learn** to improve their chances.

        Do NOT number the output.
        Do NOT mix job titles and skills.
        Keep each job in its own block.
        Use markdown formatting.
        """

        # -- GENERATE RESPONSE --
        try:
            with st.spinner("Analyzing and generating job recommendations..."):
                response = model.generate_content(prompt)
                st.markdown("## 🔎 Suggested Jobs")
                st.markdown(response.text)
        except Exception as e:
            st.error(f"Error: {e}")
            st.info("Check your API key or model configuration in the sidebar.")