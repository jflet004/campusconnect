import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'

const NavBar = () => {

  const {currentUser, setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    fetch('/logout', {
      method: "DELETE"
    })
    setCurrentUser(null)
    navigate('/login')
  }

  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/current-students">Current Students</NavLink>
      <NavLink to="/register-students">Register Students</NavLink>
      <NavLink to="/signup">Create Account</NavLink>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  )
}

export default NavBar
