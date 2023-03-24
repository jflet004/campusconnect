import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'
import "./css/NavBar.css"

const NavBar = () => {

  const { currentUser, logout, loggedIn } = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogoutClick = () => {
    fetch('/logout', {
      method: "DELETE"
    })
      .then(() => {
        logout(null)
        navigate('/')
      })
  }

  return (
    <div className='navbar'>
      <NavLink to="/">{!loggedIn ? "Login" : "Home"}</NavLink>
      <NavLink to="/about">About Us</NavLink>
      <NavLink to="/courses">Courses</NavLink>
      {loggedIn && currentUser.admin && (
        <>
          <NavLink to="/calendar">Calendar</NavLink>
          <NavLink to="/admin">Admin Page</NavLink>
        </>
      )}
      {loggedIn && !currentUser.admin && (
        <NavLink to="/register-students">Register Students</NavLink>
      )}
      {loggedIn ? (
        <button onClick={handleLogoutClick} className='logout-btn'>Logout</button>
      ) : (
        <NavLink to="/signup">Create Account</NavLink>
      )}
    </div>
  )
}

export default NavBar
