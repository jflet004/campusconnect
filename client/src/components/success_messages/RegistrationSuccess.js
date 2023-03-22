import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/user'

const RegistrationSuccess = () => {

  // const { currentUser } = useContext(UserContext)

  // useEffect(() => {
  //   console.log(currentUser)
  // }, [])

  return (
    <div className='details-card'>
      <p>Your student's registration form has been <b>submitted.</b></p>
      <p>Staff will give you a call soon to check availability.</p>
      <br/>
      <p style={{fontSize: "17px"}}><em>If you have any question, give us a call at (323) 262-7734.</em></p>
      <br/>
      <Link to='/'>Home Page</Link>
    </div>
  )
}

export default RegistrationSuccess
