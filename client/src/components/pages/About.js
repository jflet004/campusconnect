import React, { useContext } from 'react'
import { UserContext } from '../../context/user'

const About = () => {

  const { currentUser, loggedIn } = useContext(UserContext)

  // if(!loggedIn) {
  //   return ()
  // }
  
  return (
    <div>
      <h1>Tell me</h1>
    </div>
  )
}

export default About
