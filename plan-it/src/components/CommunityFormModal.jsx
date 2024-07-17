import React, { useState } from "react";

const CommunityFormModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    community_title: "",
    type: "Other",
    security: "public",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create New Community</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="community_title"
              value={formData.community_title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Sports">Sports</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Technology">Technology</option>
              <option value="Gaming">Gaming</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Science">Science</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Security</label>
            <select
              name="security"
              value={formData.security}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          {formData.security === "private" && (
            <div className="mb-4">
              <label className="block text-gray-700">Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-600 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityFormModal;
