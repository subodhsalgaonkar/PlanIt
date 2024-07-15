import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const Profile = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((response) => {
          setName(response.data.name || "");
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, userId, navigate]);

  const handleUpdateName = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userId}`,
        { name: newName }
      );
      if (response.data.message === "User updated successfully") {
        setName(newName);
        setNewName("");
        setUpdateError("");
        setIsEditing(false); // Disable editing after successful update
      } else {
        setUpdateError(response.data.message);
      }
    } catch (error) {
      console.error("Error updating name:", error);
      setUpdateError("Failed to update name.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Cancel editing mode
    setNewName(""); // Clear input field
  };

  return (
    <>
      <SideBar />
      <div className="container mx-auto mt-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-center">Profile</h1>
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-sm">
              <p className="text-xl font-medium mb-2">Username:</p>
              <p className="text-xl text-gray-700">{username}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-sm mt-4">
              <p className="text-xl font-medium mb-2">User ID:</p>
              <p className="text-xl text-gray-700">{userId}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-sm mt-4 flex items-center justify-between">
              <div>
                <p className="text-xl font-medium mb-2">Name:</p>
                {isEditing ? (
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Enter new name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                ) : (
                  <p className="text-xl text-gray-700">{name}</p>
                )}
                {updateError && <p className="text-red-500">{updateError}</p>}
              </div>
              {isEditing ? (
                <div className="flex">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleUpdateName}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <button
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={() => setIsEditing(true)}
                >
                  <svg
                    // xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block align-middle"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21a1 1 0 01-2 0v-2a3 3 0 00-3-3H10a3 3 0 00-3 3v2a1 1 0 01-2 0v-2a3 3 0 00-3-3h0"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
