import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'

const NavBar = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    fetch('/logout', {
      method: "DELETE"
    })
    setCurrentUser(null)
    navigate('/')
  }


  return (
    <div>
      {!currentUser || currentUser.error ?
        <>
          <NavLink to="/">Home</NavLink>
          {/* <NavLink to="/login">Login</NavLink> */}
          <NavLink to="/signup">Create Account</NavLink>
        </> :
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/current-students">Current Students</NavLink>
          <NavLink to="/register-students">Register Students</NavLink>
          <button onClick={handleLogoutClick}>Logout</button>
        </>
      }
    </div>
  )
}

export default NavBar
