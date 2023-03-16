import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'
import "./css/NavBar.css"

const NavBar = () => {

  const { currentUser, logout} = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogoutClick = () => {
    fetch('/logout', {
      method: "DELETE"
    })
      .then(() => {
        logout(null)
        navigate('/')
      })
    { }
  }



  return (
    <div className='navbar'>
      <NavLink to="/">{currentUser && !currentUser.error ? "Home" : "Login"}</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/courses">Programs</NavLink>
      {currentUser && currentUser.admin && (
        <>
          <NavLink to="/calendar">Calendar</NavLink>
          <NavLink to="/admin">Admin Page</NavLink>
        </>
      )}
      {currentUser && !currentUser.error && !currentUser.admin && (
        <>
          <NavLink to="/register-students">Register Students</NavLink>
        </>
      )}
      {currentUser && !currentUser.error ? (
        <button onClick={handleLogoutClick} className='logout-btn'>Logout</button>
      ) : (
        <NavLink to="/signup">Create Account</NavLink>
      )}
    </div>
  )
}

export default NavBar
