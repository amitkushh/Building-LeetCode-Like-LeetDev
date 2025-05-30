import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import { Loader } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";
import Layout from "./Layout/Layout";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/dashboard"} />}
          />
          <Route
            path="/signup"
            element={
              !authUser ? <SignUpPage /> : <Navigate to={"/dashboard"} />
            }
          />
          <Route
            path="/dashboard"
            element={authUser ? <Dashboard /> : <Navigate to={"/"} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
