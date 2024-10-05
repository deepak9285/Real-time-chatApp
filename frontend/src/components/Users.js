import { React, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mycontext } from "./MainContainer";
import { refreshSidebarFun } from "./features/refreshSidebar";

export default function Users() {
  const [refresh, setRefresh] = useState(mycontext);
  const [users, setUsers] = useState([]); // Updated state name from 'user' to 'users' for clarity
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
    fetch("http://localhost:8080/users/fetchUsers", {
      method: "GET",
      headers: config.headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User data refreshed in Users panel");
        setUsers(data); // Set users state with the fetched data
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [refresh]);

  // Function to initiate chat
  const Makechat = (selectedUser) => {
    console.log("Creating a chat with", selectedUser.name); // Logging selected user's name
    console.log(selectedUser._id);
    // Sending POST request to create a chat
    fetch("http://localhost:8080/chat/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: selectedUser._id }),
      // Send the selected user's ID
    });
    //  nav(`app/chat/${selectedUser._id}&${selectedUser.name}`);

    dispatch(refreshSidebarFun());
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-gray-600">Available Users</p>
        </div>
        {/* Search Section */}
        <div className="flex items-center space-x-2">
          <div className="text-gray-500">
            <CiSearch className="w-6 h-6" />
          </div>
          <input
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="grid gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            onClick={() => Makechat(user)} // Pass the specific user object to Makechat
            className="flex items-center space-x-3 p-3 bg-white shadow-sm rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            {/* Avatar or Placeholder */}
            <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full">
              <span className="text-lg text-black font-semibold">
                {user.name.charAt(0)}
              </span>
            </div>
            {/* User Name */}
            <p className="text-lg font-medium">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
