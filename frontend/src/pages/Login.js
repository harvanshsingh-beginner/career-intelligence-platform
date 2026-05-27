import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
   const navigate = useNavigate();

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "https://career-intelligence-platform-xoqm.onrender.com/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert("Login failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center text-green-600">
          Login
        </h1>

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
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;