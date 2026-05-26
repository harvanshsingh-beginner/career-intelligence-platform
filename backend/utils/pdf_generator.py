from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

from reportlab.lib.pagesizes import letter


def generate_resume_report(
    filename,
    data
):

    doc = SimpleDocTemplate(
        filename,
        pagesize=letter
    )

    styles = getSampleStyleSheet()

    elements = []

    title = Paragraph(
        "AI Career Intelligence Report",
        styles["Title"]
    )

    elements.append(title)

    elements.append(
        Spacer(1, 20)
    )

    ats = Paragraph(
        f"<b>ATS Score:</b> {data['ats_score']}%",
        styles["BodyText"]
    )

    elements.append(ats)

    skills = Paragraph(
        f"<b>Skills:</b> {', '.join(data['skills'])}",
        styles["BodyText"]
    )

    elements.append(skills)

    match = Paragraph(
        f"<b>Match Percentage:</b> {data['job_analysis']['match_percentage']}%",
        styles["BodyText"]
    )

    elements.append(match)

    missing = Paragraph(
        f"<b>Missing Skills:</b> {', '.join(data['job_analysis']['missing_skills'])}",
        styles["BodyText"]
    )

    elements.append(missing)

    feedback = Paragraph(
        f"<b>AI Feedback:</b> {' | '.join(data['resume_feedback'])}",
        styles["BodyText"]
    )

    elements.append(feedback)

    doc.build(elements)