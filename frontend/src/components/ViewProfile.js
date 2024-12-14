import React from "react";
import { useNavigate } from "react-router-dom";

function ViewProfile() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData) {
    navigate("/"); // Redirect if user is not authenticated
  }

  const handleEditProfile = () => {
    navigate("/edit-profile"); // Navigate to the Edit Profile page
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/150" // Replace with the user's profile picture URL
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto shadow-md border-4 border-indigo-500"
          />
          <button
            onClick={handleEditProfile}
            className="absolute right-[35%] top-[75%] bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            ✎
          </button>
        </div>

        {/* User Details */}
        <h1 className="text-3xl font-extrabold text-gray-800 mt-6">
          {userData.user.name || "User Name"}
        </h1>
        <p className="text-gray-600 text-sm mb-4">{userData.user.email}</p>
        <p className="text-gray-700 mt-4 mb-6">
          {userData.user.bio || "No bio available. Add one in Edit Profile."}
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleEditProfile}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium"
          >
            Go Back
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/");
            }}
            className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
