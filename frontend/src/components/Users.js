import { React, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mycontext } from "./MainContainer";
import { refreshSidebarFun } from "./features/refreshSidebar";

export default function Users() {
  const [refresh, setRefresh] = useState(mycontext);
  const [users, setUsers] = useState([]); // State for users
  const userData = JSON.parse(localStorage.getItem("userData"));
  const nav = useNavigate();
  const dispatch = useDispatch();

  // Redirect if user is not authenticated
  if (!userData || !userData.token) {
    console.log("User not authenticated");
    nav(-1); // Redirect to previous page
  }

  useEffect(() => {
    // Config with Authorization Header
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    // Fetching users from the database
    fetch(
      "https://real-time-chatapp-backend-8cx4.onrender.com/users/fetchUsers",
      {
        method: "GET",
        headers: config.headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("User data refreshed in Users panel");
        setUsers(data); // Set users state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [refresh]);

  // Function to initiate chat
  const Makechat = (selectedUser) => {
    console.log("Creating a chat with", selectedUser.name);
    // Send POST request to create a chat
    fetch("https://real-time-chatapp-backend-8cx4.onrender.com/chat/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: selectedUser._id }),
    });

    dispatch(refreshSidebarFun());
  };

  return (
    <div className="flex w-screen ml-10 rounded-2xl flex-col space-y-6 px-6 py-4 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 h-screen text-white">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold">Users</h1>
          <p className="text-gray-200">Available Users</p>
        </div>
        {/* Search Section */}
        <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-lg shadow-sm">
          <div className="text-gray-500">
            <CiSearch className="w-6 h-6" />
          </div>
          <input
            className="bg-transparent focus:outline-none text-black"
            placeholder="Search users..."
          />
        </div>
      </div>

      {/* Users List */}
      <div className="grid hover:border-e-lime-300 gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            onClick={() => Makechat(user)}
            className="flex items-center space-x-4 p-4 bg-white text-black rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition duration-300"
          >
            {/* Avatar or Placeholder */}
            <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full text-lg font-semibold">
              {user.name.charAt(0)}
            </div>
            {/* User Name */}
            <p className="text-lg font-medium">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
