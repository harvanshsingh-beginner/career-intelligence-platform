from google import genai

client = genai.Client(
    api_key="AIzaSyATppQWfHK_hqcNCrnhGQXFrhg6lHNf9GY"
)


def generate_ai_feedback(resume_text):

    prompt = f"""
    Analyze this resume and provide:

    1. ATS improvement suggestions
    2. Missing technical skills
    3. Career recommendations
    4. Resume improvement tips

    Resume:
    {resume_text}
    """

    try:

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:

        print("Gemini Error:", e)

        return """
AI service temporarily unavailable.

Suggested improvements:
- Add more projects
- Include GitHub links
- Add deployment skills
- Improve ATS keywords
- Add cloud technologies
"""