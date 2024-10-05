import logo from "./logo.svg";
import "./App.css";
import MainContainer from "./components/MainContainer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Chatarea from "./components/Chatarea";
import GroupUser from "./components/GroupUser";
import Users from "./components/Users";

function App() {
  return (
    <div className="App m-1">
      <div>
        {/* <MainContainer/> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="app" element={<MainContainer />}>
            <Route path="Welcome" element={<WelcomePage />} />
            <Route path="chat/:_id" element={<Chatarea />} />
            <Route path="users" element={<WelcomePage />} />
            <Route path="groups" element={<Users/>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
