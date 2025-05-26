import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";

function App() {
  let authUser = null;

  return (
    <div className="flex flex-col justify-start items-center">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/dashboard"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/dashboard"} />}
        />
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
