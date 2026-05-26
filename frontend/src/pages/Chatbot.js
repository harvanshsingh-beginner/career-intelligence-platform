import React, {
  useState
} from "react";

import axios from "axios";


function Chatbot() {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const askAI = async () => {

    if (!question) return;

    setLoading(true);

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/chatbot",
        {
          question
        }
      );

      setAnswer(
        response.data.answer
      );

    } catch (error) {

      console.error(error);

      setAnswer(
        "AI service unavailable."
      );
    }

    setLoading(false);
  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black p-10 text-white">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-6xl font-extrabold text-center mb-10 text-cyan-400">

          AI Career Chatbot

        </h1>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

          <textarea
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Ask career questions..."
            className="w-full h-40 p-4 rounded-2xl text-black"
          />

          <button
            onClick={askAI}
            className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-xl text-white font-bold mt-6"
          >

            {
              loading
              ? "Thinking..."
              : "Ask AI"
            }

          </button>

        </div>

        {answer && (

          <div className="mt-10 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

            <h2 className="text-4xl font-bold mb-6 text-green-400">

              AI Response

            </h2>

            <p className="text-xl leading-relaxed">

              {answer}

            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default Chatbot;