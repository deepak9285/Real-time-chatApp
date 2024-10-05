import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { mycontext } from "./MainContainer";

function Sidearea() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Conversation, setConversation] = useState([]);

  // Use useContext to get the refresh and setRefresh from mycontext as an object
  const context = useContext(mycontext);
  const { refresh, setRefresh } = context || {}; // Ensure you have a fallback in case context is undefined

  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    navigate("/");
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    fetch("http://localhost:8080/chat/", {
      method: "GET",
      headers: config.headers,
    })
      .then((response) => response.json()) // Parse response as JSON
      .then((data) => {
        console.log("Fetched conversations", data);
        setConversation(data);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
      });
  }, [userData.token]);

  return (
    <div className="w-[30vw] bg-gray-800 rounded-2xl text-white h-screen p-4">
      <div className="flex flex-col">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:bg-gray-600"
          />
        </div>
        <div>
          {Conversation.map((conversation, index) => {
            if (conversation.users.length === 1) {
              return <div key={index}></div>;
            }
            if (conversation.latestMessage === undefined) {
              return (
                <div
                  key={index}
                  onClick={() => {
                    console.log("Refresh fired from side bar");
                    setRefresh && setRefresh(!refresh); // Check if setRefresh is available before using it
                  }}
                >
                  <div
                    className=""
                    onClick={() =>
                      navigate(
                       `/chat?id=${conversation._id}&user=${conversation.users[1].name}`
                      )
                    }
                  >
                    <p>{conversation.users[1].name[0]}</p>
                  </div>
                  <p>{conversation.users[1].name}</p>
                  <p>No previous message, click here to start a new chat</p>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className=""
                  onClick={() =>
                    navigate(
                      `/app/chat?id=${conversation._id}&user=${conversation.users[1].name}`
                    )
                  }
                >
                  <p>{conversation.users[1].name[0]}</p>
                  <p>{conversation.users[1].name}</p>
                </div>
              );
            }
          })}
        </div>

        {/* Add Friend Button */}
        <button className="w-full p-2 bg-blue-500 rounded hover:bg-blue-400">
          Add Friend
        </button>
      </div>
      <div>
        <button
          className="w-full p-2 mt-4 mb-4 bg-blue-500 rounded hover:bg-blue-400"
          onClick={() => navigate("groups")}
        >
          Online users
        </button>
      </div>

      <div className="bg-gray-700 mt-auto p-4 rounded-lg">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">{userData.user.name}</h3>
            <p>{userData.user.email}</p>
          </div>
        </div>
        <div className="">
          <button className="w-full p-2 bg-blue-500 rounded hover:bg-blue-400">
            View Profile
          </button>
        </div>
      </div>
      <button
        className="bg-blue-300 text-black p-3 rounded-lg m-3 "
        onClick={() => {
          localStorage.removeItem("userData");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidearea;
