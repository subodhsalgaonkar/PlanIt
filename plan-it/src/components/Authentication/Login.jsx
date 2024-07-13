import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    // Reset the isLoggedIn flag and clear the username
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("username");
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      console.log(response.data);

      if (response.data.message === "Login successful") {
        localStorage.setItem("isLoggedIn", "true"); // Store login status
        localStorage.setItem("username", username); // Store username
        navigate("/mycalendar"); // Redirect to mycalendar upon successful login
      } else {
        setLoginError(response.data.message); // Set login error message
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("Invalid username or password.");
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full max-w-md">
        <h1 className="mb-8 text-3xl text-center">Login</h1>
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        {loginError && (
          <p className="text-red-500 mb-4 text-center">{loginError}</p>
        )}
        <button
          className="w-full text-center py-3 rounded border border-black bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="text-center text-sm text-grey-dark mt-4">
          New user?
          <Link
            className="ml-1 no-underline border-b border-blue text-blue"
            to="/signup"
          >
            Sign up here
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Login;
