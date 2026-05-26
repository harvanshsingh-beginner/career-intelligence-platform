from data.jobs import JOBS


def recommend_jobs(user_skills):

    matched_jobs = []

    for job in JOBS:

        matched = len(
            set(user_skills)
            &
            set(job["skills"])
        )

        if matched > 0:

            matched_jobs.append({

                "title":
                job["title"],

                "company":
                job["company"],

                "location":
                job["location"],

                "salary":
                job["salary"],

                "match_score":
                matched
            })

    matched_jobs.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return matched_jobs