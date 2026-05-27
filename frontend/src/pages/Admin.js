import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";


function Admin() {

  const [analytics, setAnalytics] =
    useState(null);


  useEffect(() => {

    fetchAnalytics();

  }, []);


  const fetchAnalytics = async () => {

    try {

      const response = await axios.get(
        "https://career-intelligence-platform-xoqm.onrender.com/admin-analytics"
      );

      setAnalytics(response.data);

    } catch (error) {

      console.error(error);
    }
  };


  if (!analytics) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-3xl font-bold">

        Loading Analytics...

      </div>
    );
  }


  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black p-10 text-white">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-6xl font-extrabold text-center mb-12 text-pink-400">

          Admin Analytics Dashboard

        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white/10 p-8 rounded-3xl">

            <h2 className="text-3xl font-bold mb-4 text-cyan-400">

              Total Resumes

            </h2>

            <p className="text-5xl font-bold">

              {analytics.total_resumes}

            </p>

          </div>

          <div className="bg-white/10 p-8 rounded-3xl">

            <h2 className="text-3xl font-bold mb-4 text-green-400">

              Average ATS

            </h2>

            <p className="text-5xl font-bold">

              {analytics.average_ats}%

            </p>

          </div>

        </div>

        <div className="mt-10 bg-white/10 p-8 rounded-3xl">

          <h2 className="text-4xl font-bold mb-8 text-yellow-400">

            Top Skills Trends

          </h2>

          <div className="space-y-4">

            {analytics.top_skills.map(
              (skill, index) => (

                <div
                  key={index}
                  className="flex justify-between bg-black/20 p-5 rounded-2xl"
                >

                  <span className="text-xl">

                    {skill[0]}

                  </span>

                  <span className="text-xl font-bold text-cyan-400">

                    {skill[1]}

                  </span>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Admin;