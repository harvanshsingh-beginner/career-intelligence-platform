import google.generativeai as genai


def generate_ai_feedback(resume_text):

    try:

        prompt = f"""
        Analyze this resume and provide feedback:

        {resume_text}
        """

        model = genai.GenerativeModel(
            "gemini-1.5-flash"
        )

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        print("Gemini Error:", e)

        return (
            "AI service temporarily unavailable. "
            "Suggested improvements:\n"
            "- Add more projects\n"
            "- Include GitHub links\n"
            "- Add deployment skills\n"
            "- Improve ATS keywords\n"
            "- Add cloud technologies"
        )