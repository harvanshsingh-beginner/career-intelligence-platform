from flask import request

from utils.interview_evaluator import (
    evaluate_answer
)

from flask import (
    Blueprint,
    jsonify
)

from data.job_roles import (
    INTERVIEW_QUESTIONS
)

interview = Blueprint(
    "interview",
    __name__
)


@interview.route(
    "/interview/<role>",
    methods=["GET"]
)
def get_interview_questions(role):

    role = role.lower()

    questions = INTERVIEW_QUESTIONS.get(
        role,
        []
    )

    return jsonify({

        "role": role,

        "questions": questions
    })


@interview.route(
    "/evaluate-answer",
    methods=["POST"]
)
def evaluate_interview_answer():

    data = request.json

    answer = data["answer"]

    keywords = data["keywords"]

    result = evaluate_answer(
        answer,
        keywords
    )

    return jsonify(result)