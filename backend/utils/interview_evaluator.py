def evaluate_answer(
    answer,
    keywords
):

    answer = answer.lower()

    matched_keywords = []

    for keyword in keywords:

        if keyword.lower() in answer:

            matched_keywords.append(
                keyword
            )

    score = (
        len(matched_keywords)
        / len(keywords)
    ) * 100

    feedback = []

    if score >= 80:

        feedback.append(
            "Excellent answer."
        )

    elif score >= 50:

        feedback.append(
            "Good answer but can be improved."
        )

    else:

        feedback.append(
            "Answer needs improvement."
        )

    missing = list(
        set(keywords)
        - set(matched_keywords)
    )

    if missing:

        feedback.append(
            f"Missing keywords: {', '.join(missing)}"
        )

    return {

        "score": round(score, 2),

        "matched_keywords":
        matched_keywords,

        "feedback": feedback
    }