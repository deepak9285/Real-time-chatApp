import React, { createContext, useState } from 'react';
import { Provider } from 'react-redux';  // Redux provider
import { store } from './features/store'; // Assuming you have your Redux store set up
import Chatarea from './Chatarea';
import Sidearea from './Sidearea';
import WelcomePage from './WelcomePage';
import Login from './Login';
import Signup from './Signup';
import GroupUser from './GroupUser';
import { Outlet } from 'react-router';

// Create your custom context
export const mycontext = createContext();

function MainContainer() {
  const [refresh, setRefresh] = useState(true);

  return (
    <>
      <div className="container flex">
        {/* Wrap the entire app with Redux Provider */}
    
          {/* Wrap components with your custom context */}
          <mycontext.Provider value={{ refresh, setRefresh }}>
            <Sidearea />
            <Outlet />
            {/* <GroupUser /> */}
            {/* <Chatarea /> */}
            {/* <WelcomePage /> */}
            {/* <Login /> */}
            {/* <Signup /> */}
          </mycontext.Provider>
      
      </div>
    </>
  );
}

export default MainContainer;
