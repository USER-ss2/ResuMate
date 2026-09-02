import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import QuestionsInterface from "./components/QuestionsInterface";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuthContext } from "./hooks/useAuthContext";

const isTokenValid = (token) => {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return Date.now() < exp * 1000;
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("item");
  const isValid = token && isTokenValid(token);
  return isValid ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Questions" element={<QuestionsInterface />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
