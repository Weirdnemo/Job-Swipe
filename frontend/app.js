const apiUrl = "http://localhost:8000"; // Update this if backend is running on a different URL/port

const responseArea = document.getElementById("responseArea");

// Utility to show response
function showResponse(data) {
    responseArea.textContent = JSON.stringify(data, null, 2);
}

// Signup
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
        email: document.getElementById("signupEmail").value,
        password: document.getElementById("signupPassword").value,
        role: document.getElementById("signupRole").value
    };
    const res = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    showResponse(await res.json());
});

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };
    const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    showResponse(await res.json());
});

// Update Profile
document.getElementById("profileForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("profileEmail").value;
    const payload = {
        name: document.getElementById("profileName").value,
        bio: document.getElementById("profileBio").value,
        skills: document.getElementById("profileSkills").value.split(",").map(skill => skill.trim()),
        company_name: document.getElementById("profileCompany").value,
        company_description: document.getElementById("profileCompanyDesc").value,
        location: document.getElementById("profileLocation").value
    };
    const res = await fetch(`${apiUrl}/update_profile?email=${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    showResponse(await res.json());
});

// Post Job
document.getElementById("postJobForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
        title: document.getElementById("jobTitle").value,
        description: document.getElementById("jobDescription").value,
        location: document.getElementById("jobLocation").value,
        skills_required: document.getElementById("jobSkills").value.split(",").map(skill => skill.trim()),
        salary_range: document.getElementById("jobSalary").value,
        posted_by: document.getElementById("jobPostedBy").value
    };
    const res = await fetch(`${apiUrl}/post_job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    showResponse(await res.json());
});

// Swipe Job
document.getElementById("swipeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
        email: document.getElementById("swipeEmail").value,
        job_id: parseInt(document.getElementById("swipeJobId").value),
        action: document.getElementById("swipeAction").value
    };
    const res = await fetch(`${apiUrl}/swipe_job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    showResponse(await res.json());
});

// View Liked Jobs
async function viewLikedJobs() {
    const email = document.getElementById("likedEmail").value;
    const res = await fetch(`${apiUrl}/liked_jobs?email=${email}`);
    showResponse(await res.json());
}
