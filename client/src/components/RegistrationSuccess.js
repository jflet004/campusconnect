import React from 'react'
import { Link } from 'react-router-dom'

const RegistrationSuccess = () => {
  return (
    <div>
      <p>Your student's registration form has been <b>submitted.</b></p>
      <p>Staff will give you a call soon to check availability.</p>
      <p style={{fontSize: "17px"}}><em>If you have any question, give us a call at (323) 262-7734.</em></p>
      <br/>
      <Link to='/'>Home Page</Link>
    </div>
  )
}

export default RegistrationSuccess
