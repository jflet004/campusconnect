import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/current-students">Student List</NavLink>
    </div>
  )
}

export default NavBar
