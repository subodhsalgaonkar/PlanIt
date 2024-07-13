import React from "react";

const Profile = () => {
  const username = localStorage.getItem("username");

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
