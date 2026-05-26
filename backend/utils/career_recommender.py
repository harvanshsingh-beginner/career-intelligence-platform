CAREER_PATHS = {

    "machine_learning_engineer": {

        "skills": [
            "python",
            "machine learning",
            "tensorflow",
            "pytorch",
            "numpy"
        ],

        "salary":
        "8-15 LPA",

        "learning": [
            "Deep Learning",
            "MLOps",
            "NLP"
        ]
    },

    "data_scientist": {

        "skills": [
            "python",
            "pandas",
            "numpy",
            "sql",
            "statistics"
        ],

        "salary":
        "6-12 LPA",

        "learning": [
            "Statistics",
            "Data Visualization",
            "Machine Learning"
        ]
    },

    "frontend_developer": {

        "skills": [
            "react",
            "javascript",
            "html",
            "css"
        ],

        "salary":
        "5-10 LPA",

        "learning": [
            "Next.js",
            "TypeScript",
            "UI/UX"
        ]
    }
}


def recommend_career(user_skills):

    recommendations = []

    for role, data in CAREER_PATHS.items():

        matched = len(
            set(user_skills)
            &
            set(data["skills"])
        )

        if matched > 0:

            recommendations.append({

                "role": role,

                "match_score": matched,

                "salary":
                data["salary"],

                "learning":
                data["learning"]
            })

    recommendations.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return recommendations