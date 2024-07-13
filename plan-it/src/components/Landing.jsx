import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  useEffect(() => {
    // Set height of html and body to 100% and hide overflow to prevent scrolling
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.documentElement.style.overflow = "hidden";
    // Reset the isLoggedIn flag
    localStorage.setItem("isLoggedIn", "false");
  }, []);

  return (
    <div className="bg-cover bg-center h-screen">
      <div className="flex justify-end p-4">
        <Link
          to="/login"
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="mx-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Sign Up
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Our Website
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
