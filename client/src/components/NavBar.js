import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/current-students">Current Students</NavLink>
      <NavLink to="/register-students">Register Students</NavLink>
    </div>
  )
}

export default NavBar
