import React from "react";

function GroupUser() {
  const users = [
    {
      id: 1,
      name: "John",
      age: 25,
      isOnline: true,
    },
    {
      id: 2,
      name: "Jane",
      age: 30,
      isOnline: false,
    },
    {
      id: 3,
      name: "Bob",
      age: 35,
      isOnline: true,
    },
    {
      id: 3,
      name: "Bob",
      age: 35,
      isOnline: true,
    },
    {
      id: 3,
      name: "Bob",
      age: 35,
      isOnline: true,
    },
    {
      id: 3,
      name: "Bob",
      age: 35,
      isOnline: true,
    },
    {
      id: 3,
      name: "Bob",
      age: 35,
      isOnline: true,
    },
    {
      id: 3,
      name: "Bob",
      age: 35,
      isOnline: true,
    },
    {
      id: 3,
      name: "Bob",
      age: 35,
      isOnline: true,
    },
    {
      id: 3,
      name: "Bob",
      age: 35,
      isOnline: true,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-[70%]  mx-auto">
      <h2 className="text-2xl font-semibold shadow-lg text-gray-800 mb-6 border-b pb-2">
        Online Users
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded b text-black focus:outline-none focus:bg-gray-100"
        />
      </div>
      <ul className="space-y-4">
        {users.map((user, index) => (
          <li key={index} className="flex hover:bg-slate-200 hover:cursor-pointer shadow-md items-center space-x-4">
            <div
              className={`w-4 h-4 rounded-full ${
                user.isOnline ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
            <p className="text-lg text-gray-800">{user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupUser;
