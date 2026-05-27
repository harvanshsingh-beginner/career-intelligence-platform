import React, { useState } from "react";
import axios from "axios";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async () => {

    try {

      const response = await axios.post(
        "https://career-intelligence-platform-xoqm.onrender.com/signup",
        formData
      );

      alert(response.data.message);

    } catch (error) {

      console.error(error);

      alert("Signup failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-6"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          Signup
        </button>

      </div>
    </div>
  );
}

export default Signup;