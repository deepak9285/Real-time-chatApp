// import React, { useState } from "react";

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const signupHandler = async (e) => {
//     e.preventDefault(); // Prevents form submission and page reload
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch("https://real-time-chatapp-backend-8cx4.onrender.com/users/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, name, password }),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text(); // Or response.json() depending on backend
//         throw new Error(errorMessage || "Signup failed");
//       }

//       const result = await response.json();
//       localStorage.setItem("userData", JSON.stringify(result));
//       setSuccess("User created successfully!");
//       setName("");
//       setEmail("");
//       setPassword("");
//     } catch (error) {
//       console.error(error);
//       setError("Failed to create user");
//       setSuccess(null);
//     }
//   };

//   return (
//     <div className="h-screen w-screen flex items-center justify-center bg-gray-300">
//       <div className="bg-white p-8 rounded-lg shadow-md w-[50%] h-[60%]">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Sign Up
//         </h2>
//         <form className="space-y-6" onSubmit={signupHandler}>
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email address
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           {success && <p className="text-green-500 text-sm">{success}</p>}
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const signupHandler = async (e) => {
    e.preventDefault(); // Prevents form submission and page reload
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://real-time-chatapp-backend-8cx4.onrender.com/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, password }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text(); // Or response.json() depending on backend
        throw new Error(errorMessage || "Signup failed");
      }

      const result = await response.json();
      localStorage.setItem("userData", JSON.stringify(result));
      setSuccess("User created successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setError("Failed to create user");
      setSuccess(null);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join our AI-powered chat app and start connecting instantly!
        </p>
        <form className="space-y-6" onSubmit={signupHandler}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => Navigate("/login")}
              className="text-blue-600 font-medium hover:underline"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
