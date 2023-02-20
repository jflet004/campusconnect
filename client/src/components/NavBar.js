import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'

const NavBar = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext)

  const [dailyQuote, setDailyQuote] = useState([])

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(r => r.json())
      .then(quotes => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setDailyQuote(randomQuote);
      })
      .catch(error => alert(error))
  }, []);

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
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/programs">Programs</NavLink>
      <NavLink to="/events">Events</NavLink>
      {currentUser && currentUser.admin && (
        <>
          <NavLink to="/admin">Admin Page</NavLink>
          <h3>Welcome {currentUser.first_name}</h3>
          <p><em>{dailyQuote.text}</em></p>
        </>
      )}
      {currentUser && !currentUser.error && !currentUser.admin && (
        <NavLink to="/register-students">Register Students</NavLink>
      )}
      {currentUser && !currentUser.error ? (
        <button onClick={handleLogoutClick}>Logout</button>
      ) : (
        <NavLink to="/signup">Create Account</NavLink>
      )}
    </div>
  )
}

export default NavBar
