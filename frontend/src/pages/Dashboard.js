import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";


function Dashboard() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [result, setResult] = useState(null);

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#14B8A6"
  ];


  useEffect(() => {

    fetchHistory();

  }, []);


  const fetchHistory = async () => {

    try {

      const response = await axios.get(
        "https://career-intelligence-platform-xoqm.onrender.com/resume-history"
      );

      setHistory(response.data);

    } catch (error) {

      console.error(error);
    }
  };


  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };


  const handleFileChange = (e) => {

    setFile(e.target.files[0]);
  };


  const uploadResume = async () => {

    if (!file) {

      alert("Please select a file");

      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    try {

      setLoading(true);

      const response = await axios.post(
        "https://career-intelligence-platform-xoqm.onrender.com/upload-resume",
        formData
      );

      setResult(response.data);

      fetchHistory();

      setLoading(false);

    } catch (error) {

      console.error(error);

      setLoading(false);

      alert("Error uploading resume");
    }
  };


  const skillChartData = result
    ? result.skills.map((skill) => ({
        name: skill,
        value: 1
      }))
    : [];


  const matchData = result
    ? [
        {
          name: "Matched",
          value:
            result.job_analysis
            .matched_skills.length
        },
        {
          name: "Missing",
          value:
            result.job_analysis
            .missing_skills.length
        }
      ]
    : [];


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8">

      <div className="max-w-7xl mx-auto">

        {/* LOGOUT */}

        <div className="flex justify-end mb-6">

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl shadow-lg"
          >
            Logout
          </button>

        </div>

        {/* TITLE */}

        <h1 className="text-6xl font-extrabold text-center mb-12 text-white leading-tight">

          AI Career Intelligence

          <span className="block text-blue-400">

            Platform

          </span>

        </h1>

        {/* UPLOAD CARD */}

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl mb-10">

          <div className="flex flex-col md:flex-row gap-4 items-center">

            <input
              type="file"
              onChange={handleFileChange}
              className="w-full md:w-auto bg-white text-black p-3 rounded-xl border border-gray-300"
            />

            <button
              onClick={uploadResume}
              disabled={loading}
              className={`px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
              }`}
            >

              {loading
                ? "Analyzing Resume..."
                : "Upload Resume"}

            </button>

          </div>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="text-center text-white text-2xl font-bold animate-pulse mb-10">

            AI is analyzing your resume...

          </div>
        )}

        {/* RESULT */}

        {result && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ATS SCORE */}

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

              <h2 className="text-3xl font-bold mb-6 text-green-400">

                ATS Score

              </h2>

              <div className="w-full bg-gray-700 rounded-full h-8 overflow-hidden">

                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-8 rounded-full text-center text-white font-bold leading-8"
                  style={{
                    width: `${result.ats_score}%`
                  }}
                >

                  {result.ats_score}%

                </div>

              </div>
              <div className="mt-8 text-white">

                <h3 className="font-bold text-xl">
                   Email
                </h3>

                 <p className="text-gray-300 mt-1">
                   {result.email}
                </p>

                <h3 className="font-bold text-xl mt-5">
                    Phone
               </h3>

                 <p className="text-gray-300 mt-1">
                 {result.phone}
                </p>

                {/* DOWNLOAD BUTTON */}

                 <a
                   href={`https://career-intelligence-platform-xoqm.onrender.com/download-report/${result.report_path.split("\\").pop().split("/").pop()}`}
                   target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl inline-block mt-6"
                 >

                   Download AI Report

                 </a>

             </div>

              <div className="mt-8 text-white">

                <h3 className="font-bold text-xl">

                  Email

                </h3>

                <p className="text-gray-300 mt-1">

                  {result.email}

                </p>

                <h3 className="font-bold text-xl mt-5">

                  Phone

                </h3>

                <p className="text-gray-300 mt-1">

                  {result.phone}

                </p>

              </div>

            </div>

            {/* SKILLS */}

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

              <h2 className="text-3xl font-bold mb-6 text-blue-400">

                Skills Detected

              </h2>

              <div className="flex flex-wrap gap-3">

                {result.skills.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-blue-500/20 border border-blue-400 text-blue-200 px-4 py-2 rounded-full"
                  >

                    {skill}

                  </span>

                ))}

              </div>

            </div>

            {/* JOB MATCH */}

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

              <h2 className="text-3xl font-bold mb-6 text-purple-400">

                Job Match Analysis

              </h2>

              <p className="text-white text-lg mb-6">

                Match Percentage:

                <span className="font-bold text-purple-300">

                  {" "}
                  {result.job_analysis.match_percentage}%

                </span>

              </p>

            </div>

            {/* FEEDBACK */}

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

              <h2 className="text-3xl font-bold mb-6 text-orange-400">

                AI Resume Feedback

              </h2>

              <ul className="space-y-4">

                {result.resume_feedback.map(
                  (feedback, index) => (

                    <li
                      key={index}
                      className="bg-orange-500/10 border border-orange-400/30 p-4 rounded-xl text-orange-100"
                    >

                      {feedback}

                    </li>

                  )
                )}

              </ul>

            </div>

            {/* LEARNING ROADMAP */}

             <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

               <h2 className="text-4xl font-bold mb-8 text-green-400">

                 AI Career Roadmap

               </h2>

               <div className="space-y-4">

                {result.learning_roadmap.map(
                 (item, index) => (

                   <div
                      key={index}
                      className="bg-black/20 p-5 rounded-2xl border border-green-400/20"
                   >

                     <p className="text-lg">
                      🚀 {item}
                    </p>

                   </div>
                 )
               )}

              </div>

            </div>




            {/* ANALYTICS */}

            <div className="md:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

              <h2 className="text-4xl font-bold mb-10 text-center text-cyan-400">

                Resume Analytics Dashboard

              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div style={{ width: "100%", height: 350 }}>

                  <ResponsiveContainer>

                    <PieChart>

                      <Pie
                        data={skillChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        dataKey="value"
                        label
                      >

                        {skillChartData.map(
                          (entry, index) => (

                            <Cell
                              key={index}
                              fill={
                                COLORS[index % COLORS.length]
                              }
                            />

                          )
                        )}

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

                <div style={{ width: "100%", height: 350 }}>

                  <ResponsiveContainer>

                    <BarChart data={matchData}>

                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="name" />

                      <YAxis />

                      <Tooltip />

                      <Bar
                        dataKey="value"
                        fill="#8B5CF6"
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>
            {/* CAREER RECOMMENDATIONS */}

            <div className="md:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

              <h2 className="text-4xl font-bold mb-8 text-cyan-400">

                AI Career Recommendations

              </h2>

              <div className="space-y-6">

                {result.career_recommendations.map(
                  (career, index) => (

                    <div
                      key={index}
                      className="bg-black/20 p-6 rounded-2xl"
                    >

                      <h3 className="text-2xl font-bold text-green-400 mb-3">

                        {career.role}

                      </h3>

                      <p className="mb-2">

                        Match Score:
                        {" "}
                        {career.match_score}

                      </p>

                      <p className="mb-2">

                        Salary Range:
                        {" "}
                        {career.salary}

                      </p>

                      <div>

                        <h4 className="font-bold mb-2">

                          Recommended Learning

                        </h4>

                        <div className="flex flex-wrap gap-3">

                          {career.learning.map(
                            (item, idx) => (

                              <span
                                key={idx}
                                className="bg-cyan-500/20 border border-cyan-400 text-cyan-200 px-4 py-2 rounded-full"
                              >

                                {item}

                              </span>

                            )
                          )}

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>
            {/* JOB RECOMMENDATIONS */}

              <div className="md:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

                <h2 className="text-4xl font-bold mb-8 text-green-400">

                  Recommended Jobs

                </h2>

                <div className="space-y-6">

                  {result.recommended_jobs.map(
                    (job, index) => (

                      <div
                        key={index}
                        className="bg-black/20 p-6 rounded-2xl"
                      >

                        <h3 className="text-2xl font-bold text-cyan-400 mb-2">

                          {job.title}

                        </h3>

                        <p className="mb-2">

                          Company:
                          {" "}
                          {job.company}

                        </p>

                        <p className="mb-2">

                          Location:
                          {" "}
                          {job.location}

                        </p>

                        <p className="mb-2">

                          Salary:
                          {" "}
                          {job.salary}

                        </p>

                        <p>

                          Match Score:
                          {" "}
                          {job.match_score}

                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

            {/* RESUME HISTORY */}

            <div className="md:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">

              <h2 className="text-4xl font-bold mb-8 text-pink-400">

                Resume Upload History

              </h2>

              <div className="space-y-4">

                {history.map((item) => (

                  <div
                    key={item.id}
                    className="bg-black/20 p-6 rounded-2xl"
                  >

                    <p>

                      <span className="font-bold">

                        Email:

                      </span>

                      {" "}
                      {item.email}

                    </p>

                    <p>

                      <span className="font-bold">

                        ATS Score:

                      </span>

                      {" "}
                      {item.ats_score}%

                    </p>

                    <p>

                      <span className="font-bold">

                        Skills:

                      </span>

                      {" "}
                      {item.skills}

                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;