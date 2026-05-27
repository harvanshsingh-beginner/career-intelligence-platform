import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";


function Interview() {

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] = useState("");

  const [result, setResult] = useState(null);
  const [scores, setScores] =
  useState([]);


  useEffect(() => {

    fetchQuestions();

  }, []);


  const fetchQuestions = async () => {

    try {

      const response = await axios.get(
        "https://career-intelligence-platform-xoqm.onrender.com/interview/machine_learning_engineer"
      );

      setQuestions(response.data.questions);

    } catch (error) {

      console.error(error);
    }
  };


  const submitAnswer = async () => {

    try {

      const response = await axios.post(
        "https://career-intelligence-platform-xoqm.onrender.com/evaluate-answer",
        {
          answer: answer,

          keywords:
            questions[currentQuestion]
            .keywords
        }
      );

      setResult(response.data);
      setScores([
        ...scores,
        response.data.score
      ]);

    } catch (error) {

      console.error(error);
    }
  };


  const nextQuestion = () => {

    setAnswer("");

    setResult(null);

    setCurrentQuestion(
      currentQuestion + 1
    );
  };


  if (questions.length === 0) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-3xl font-bold">

        Loading Questions...

      </div>
    );
  }


  const finalScore =
  scores.length > 0
    ? (
        scores.reduce(
          (a, b) => a + b,
          0
        ) / scores.length
      ).toFixed(2)
    : 0;




 
  return (

    <div className="min-h-screen bg-slate-900 text-white p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-10 text-center text-cyan-400">

          AI Interview Engine

        </h1>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-6">

            Question {currentQuestion + 1}

          </h2>

          <p className="text-xl mb-6">

            {
              questions[currentQuestion]
              .question
            }

          </p>

          <textarea
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            placeholder="Type your answer..."
            className="w-full h-40 p-4 rounded-2xl text-black"
          />

          <div className="flex gap-4 mt-6">

            <button
              onClick={submitAnswer}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
            >
              Submit Answer
            </button>

            {currentQuestion <
              questions.length - 1 && (

              <button
                onClick={nextQuestion}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
              >
                Next Question
              </button>
            )}

          </div>

          {result && (

            <div className="mt-8 bg-white/10 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold mb-4 text-yellow-400">

                AI Evaluation

              </h3>

              <p className="mb-3">

                Score:
                <span className="font-bold">
                  {" "}
                  {result.score}%
                </span>

              </p>

              <p className="mb-3">

                Matched Keywords:
                {" "}

                {
                  result.matched_keywords.join(
                    ", "
                  )
                }

              </p>

              <div>

                <h4 className="font-bold mb-2">

                  Feedback

                </h4>

                <ul className="list-disc pl-5">

                  {result.feedback.map(
                    (
                      item,
                      index
                    ) => (

                      <li key={index}>
                        {item}
                      </li>

                    )
                  )}

                </ul>

              </div>

            </div>
          )}

        </div>

      </div>

      {scores.length > 0 && (

  <div className="mt-10 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

    <h2 className="text-4xl font-bold mb-8 text-pink-400">

      Interview Performance

    </h2>

    <div className="space-y-4">

      <p className="text-2xl">

        Final Score:

        <span className="font-bold text-green-400">

          {" "}
          {finalScore}%

        </span>

      </p>

      <p className="text-lg">

        Questions Attempted:
        {" "}
        {scores.length}

      </p>

      <p className="text-lg">

        Performance Level:
        {" "}

        {
          finalScore >= 80
          ? "Excellent"
          : finalScore >= 50
          ? "Good"
          : "Needs Improvement"
        }

      </p>

    </div>

  </div>
)}

    </div>
  );
}

export default Interview;