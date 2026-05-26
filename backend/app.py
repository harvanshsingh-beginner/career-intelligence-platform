from werkzeug.utils import secure_filename
from flask import (
    Flask,
    request,
    jsonify,
    send_file
)
from utils.job_matcher import (
    recommend_jobs
)


from utils.career_recommender import (
    recommend_career
)

from flask_cors import CORS

import os

from utils.pdf_generator import (
    generate_resume_report
)

from utils.ai_engine import (
    generate_ai_feedback
)

from database.db import (
    connection,
    cursor
)

from routes.auth import auth
from routes.interview import interview

from utils.resume_parser import (
    extract_text_from_pdf,
    extract_email,
    extract_phone,
    extract_skills,
    calculate_ats_score,
    analyze_job_match,
    generate_resume_feedback,
    generate_learning_roadmap
)

app = Flask(__name__)

CORS(app)

app.register_blueprint(auth)

app.register_blueprint(interview)

UPLOAD_FOLDER = "uploads"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@app.route("/")
def home():

    return {
        "message":
        "Career Intelligence Platform Backend Running"
    }


@app.route(
    "/upload-resume",
    methods=["POST"]
)
def upload_resume():

    if "resume" not in request.files:

        return jsonify({
            "error": "No file uploaded"
        }), 400

    file = request.files["resume"]

    if file.filename == "":

        return jsonify({
            "error": "Empty filename"
        }), 400

    filepath = os.path.join(
        app.config["UPLOAD_FOLDER"],
        file.filename
    )

    file.save(filepath)

    # EXTRACT RESUME DATA

    extracted_text = extract_text_from_pdf(
        filepath
    )

    email = extract_email(
        extracted_text
    )

    phone = extract_phone(
        extracted_text
    )

    skills = extract_skills(
        extracted_text
    )

    ats_score = calculate_ats_score(
        skills
    )

    # JOB ANALYSIS

    job_analysis = analyze_job_match(
        skills,
        "machine_learning_engineer"
    )

    # RESUME FEEDBACK

    resume_feedback = generate_resume_feedback(
        skills,
        ats_score
    )

    # LEARNING ROADMAP

    learning_roadmap = generate_learning_roadmap(
        job_analysis["missing_skills"]
    )
    career_recommendations = recommend_career(skills)
    recommended_jobs = recommend_jobs(skills)

    # AI FEEDBACK

    ai_feedback = generate_ai_feedback(
        extracted_text
    )

    # SAVE RESUME ANALYSIS

    insert_query = """
    INSERT INTO resume_analysis
    (
        email,
        phone,
        skills,
        ats_score,
        match_percentage
    )
    VALUES (%s, %s, %s, %s, %s)
    """

    values = (
        email,
        phone,
        ", ".join(skills),
        ats_score,
        job_analysis["match_percentage"]
    )

    cursor.execute(
        insert_query,
        values
    )

    connection.commit()

    # SAVE RESUME HISTORY

    insert_query = """
    INSERT INTO resume_history
    (
        email,
        ats_score,
        skills
    )
    VALUES (%s, %s, %s)
    """

    values = (
        email,
        ats_score,
        ", ".join(skills)
    )

    cursor.execute(
        insert_query,
        values
    )

    connection.commit()

    # GENERATE PDF REPORT

    report_data = {

        "ats_score": ats_score,

        "skills": skills,

        "job_analysis": job_analysis,

        "resume_feedback": resume_feedback
    }

    clean_name = secure_filename(
           file.filename
    )

    pdf_filename = (
       f"report_{clean_name}"
    )

    pdf_path = os.path.join(
        "uploads",
        pdf_filename
    )

    generate_resume_report(
        pdf_path,
        report_data
    )

    # RETURN RESPONSE

    return jsonify({

        "filename": file.filename,

        "email": email,

        "phone": phone,

        "skills": skills,

        "ats_score": ats_score,

        "job_analysis": job_analysis,

        "extracted_text": extracted_text,

        "resume_feedback": resume_feedback,

        "ai_feedback": ai_feedback,

        "learning_roadmap":
        learning_roadmap,

        "career_recommendations": career_recommendations,
        "recommended_jobs": recommended_jobs,

        "report_path": pdf_path
    })


@app.route(
    "/resume-history",
    methods=["GET"]
)
def get_resume_history():

    query = """
    SELECT *
    FROM resume_history
    ORDER BY uploaded_at DESC
    """

    cursor.execute(query)

    results = cursor.fetchall()

    history = []

    for row in results:

        history.append({

            "id": row[0],

            "email": row[1],

            "ats_score": row[2],

            "skills": row[3],

            "uploaded_at": row[4]
        })

    return jsonify(history)


@app.route(
    "/download-report/<filename>",
    methods=["GET"]
)
def download_report(filename):

    path = os.path.join(
        "uploads",
        filename
    )

    return send_file(
        path,
        as_attachment=True
    )


@app.route(
    "/admin-analytics",
    methods=["GET"]
)
def admin_analytics():

    # TOTAL RESUMES

    cursor.execute(
        "SELECT COUNT(*) FROM resume_history"
    )

    total_resumes = cursor.fetchone()[0]

    # AVERAGE ATS

    cursor.execute(
        "SELECT AVG(ats_score) FROM resume_history"
    )

    avg_ats = cursor.fetchone()[0]

    # ALL SKILLS

    cursor.execute(
        "SELECT skills FROM resume_history"
    )

    skills_data = cursor.fetchall()

    all_skills = []

    for row in skills_data:

        skills = row[0].split(",")

        for skill in skills:

            all_skills.append(
                skill.strip().lower()
            )

    # COUNT SKILLS

    skill_count = {}

    for skill in all_skills:

        if skill in skill_count:

            skill_count[skill] += 1

        else:

            skill_count[skill] = 1

    top_skills = sorted(
        skill_count.items(),
        key=lambda x: x[1],
        reverse=True
    )[:5]

    return jsonify({

        "total_resumes":
        total_resumes,

        "average_ats":
        round(avg_ats or 0, 2),

        "top_skills":
        top_skills
    })


@app.route(
    "/chatbot",
    methods=["POST"]
)
def chatbot():

    data = request.json

    question = data["question"]

    try:

        answer = generate_ai_feedback(
            question
        )

    except:

        answer = (
            "AI service temporarily unavailable."
        )

    return jsonify({

        "answer": answer
    })

if __name__ == "__main__":

    app.run(debug=True)