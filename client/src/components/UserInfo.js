import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const UserInfo = () => {

  const [currentUser, setCurrentUser] = useState([])

  const params = useParams()
  
  useEffect(() => {
    fetch(`/user-info/${params.id}`)
    .then(r => r.json())
    .then(user => setCurrentUser(user))
    .catch(error => alert(error))
  }, [])

  return (
    <div>
      <h1>{currentUser.first_name} {currentUser.last_name} (Parent/Guardian)</h1>
      <Link to="/current-students">Back</Link>
    </div>
  )
}

export default UserInfo
