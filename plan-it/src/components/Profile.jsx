import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username");

  // Redirect to login if not logged in
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8">Profile</h1>
      <div className="mt-4">
        <p className="text-xl">Username: {username}</p>
        {/* Add more profile information as needed */}
      </div>
    </div>
  );
};

export default Profile;
