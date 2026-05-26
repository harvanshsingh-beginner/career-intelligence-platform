import fitz
import re
from data.skills import SKILLS_DB
from data.job_roles import JOB_ROLES


def extract_text_from_pdf(pdf_path):

    text = ""

    doc = fitz.open(pdf_path)

    for page in doc:
        text += page.get_text()

    return text


def extract_email(text):

    email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+"

    match = re.search(email_pattern, text)

    return match.group(0) if match else "Not Found"


def extract_phone(text):

    phone_pattern = r"\b\d{10}\b"

    match = re.search(phone_pattern, text)

    return match.group(0) if match else "Not Found"


def extract_skills(text):

    text = text.lower()

    found_skills = []

    for skill in SKILLS_DB:

        pattern = r"\b" + re.escape(skill.lower()) + r"\b"

        if re.search(pattern, text):
            found_skills.append(skill)

    return list(set(found_skills))


def calculate_ats_score(skills):

    total_required_skills = 10

    score = (len(skills) / total_required_skills) * 100

    return min(round(score, 2), 100)

def analyze_job_match(user_skills, target_role):

    role_skills = JOB_ROLES.get(target_role, [])

    matched_skills = []

    missing_skills = []

    for skill in role_skills:

        if skill in user_skills:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    match_percentage = (
        len(matched_skills) / len(role_skills)
    ) * 100 if role_skills else 0

    return {
        "target_role": target_role,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "match_percentage": round(match_percentage, 2)
    }

def generate_resume_feedback(skills, ats_score):

    feedback = []

    if ats_score < 50:
        feedback.append(
            "Your ATS score is low. Add more relevant technical skills."
        )

    if "python" not in skills:
        feedback.append(
            "Consider learning Python for better opportunities."
        )

    if "machine learning" not in skills:
        feedback.append(
            "Add Machine Learning projects to strengthen your resume."
        )

    if "git" not in skills:
        feedback.append(
            "Include Git/GitHub skills in your resume."
        )

    if "sql" not in skills:
        feedback.append(
            "SQL is highly recommended for tech roles."
        )

    if len(skills) < 5:
        feedback.append(
            "Try adding more technical skills and projects."
        )

    return feedback

def generate_learning_roadmap(
    missing_skills
):

    roadmap = []

    skill_courses = {

        "numpy":
        "Learn NumPy for numerical computing",

        "pandas":
        "Learn Pandas for data analysis",

        "tensorflow":
        "Learn TensorFlow for deep learning",

        "pytorch":
        "Learn PyTorch for neural networks",

        "machine learning":
        "Study Machine Learning algorithms",

        "deep learning":
        "Learn Deep Learning fundamentals",

        "sql":
        "Learn SQL for database handling",

        "power bi":
        "Learn Power BI for data visualization"
    }

    for skill in missing_skills:

        if skill.lower() in skill_courses:

            roadmap.append(
                skill_courses[skill.lower()]
            )

    return roadmap