import ProtectedRoute from "./ProtectedRoute";

import Admin from "./pages/Admin";
import Chatbot from "./pages/Chatbot";

import Interview from "./pages/interview";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Signup from "./pages/Signup";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/chatbot"
          element={<Chatbot />}
        />

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;