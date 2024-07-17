import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const Communities = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userId = localStorage.getItem("userId");

  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    community_title: "",
    type: "Other",
    security: "public",
    code: "",
    userID: userId, // Pass the userId here
  });

  // Function to fetch communities from backend
  const fetchCommunities = async () => {
    try {
      const response = await axios.get("http://localhost:3000/communities");
      setCommunities(response.data);
    } catch (error) {
      console.error("Error fetching communities:", error);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleCreateCommunity = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/communities",
        newCommunity
      );
      console.log("Community created successfully:", response.data);
      setIsCreating(false);
      setNewCommunity({
        community_title: "",
        type: "Other",
        security: "public",
        code: "",
        userID: userId, // Reset userID for next community creation
      });
      // Fetch communities again to refresh the list
      fetchCommunities();
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  return (
    <>
      <SideBar />
      <div className="container mx-auto mt-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-center">Communities</h1>
          {/* Display existing communities */}
          <div className="flex flex-wrap">
            {communities.map((community) => (
              <div
                key={community._id}
                className="bg-gray-200 p-4 rounded-lg shadow-md w-full max-w-sm m-4"
              >
                <h2 className="text-xl font-medium mb-2">
                  {community.community_title}
                </h2>
                <p className="text-lg mb-2">Type: {community.type}</p>
                <p className="text-lg mb-2">Security: {community.security}</p>
                {community.security === "private" && (
                  <p className="text-lg mb-2">Code: {community.code}</p>
                )}
                <p className="text-lg mb-2">Created by: {community.userID}</p>
              </div>
            ))}
          </div>
          {/* Create new community form */}
          {isCreating ? (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Create New Community</h2>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Community Title"
                value={newCommunity.community_title}
                onChange={(e) =>
                  setNewCommunity({
                    ...newCommunity,
                    community_title: e.target.value,
                  })
                }
              />
              <select
                className="block border border-grey-light w-full p-3 rounded mb-4"
                value={newCommunity.type}
                onChange={(e) =>
                  setNewCommunity({ ...newCommunity, type: e.target.value })
                }
              >
                <option value="Other">Select Type</option>
                {[
                  "Sports",
                  "Education",
                  "Entertainment",
                  "Health",
                  "Technology",
                  "Gaming",
                  "Music",
                  "Art",
                  "Science",
                ].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                className="block border border-grey-light w-full p-3 rounded mb-4"
                value={newCommunity.security}
                onChange={(e) =>
                  setNewCommunity({ ...newCommunity, security: e.target.value })
                }
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              {newCommunity.security === "private" && (
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  placeholder="Enter Code"
                  value={newCommunity.code}
                  onChange={(e) =>
                    setNewCommunity({ ...newCommunity, code: e.target.value })
                  }
                />
              )}
              <div className="flex">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCreateCommunity}
                >
                  Create
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsCreating(true)}
              >
                Create New Community
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Communities;
