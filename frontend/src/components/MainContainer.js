import React from 'react'
import Chatarea from './Chatarea'
import Sidearea from './Sidearea'
import WelcomePage from './WelcomePage'
import Login from './Login'
import Signup from './Signup'
import GroupUser from './GroupUser'
import { Outlet } from 'react-router'

function MainContainer() {
  return (
   <>
    <div className="container flex">
        <Sidearea/>
        <Outlet />
        {/* <GroupUser/> */}
        {/* <Chatarea/> */}
        {/* <WelcomePage/> */}
        {/* <Login/> */}
        {/* <Signup/> */}
    </div>
    </>
  )
}

export default MainContainer