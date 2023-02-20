import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const UserInfo = () => {

  const [currentUser, setCurrentUser] = useState([])
  const [loading, setLoading] = useState(true)

  const params = useParams()
  
  useEffect(() => {
    fetch(`/user-info/${params.id}`)
    .then(r => r.json())
    .then(user => setCurrentUser(user))
    .catch(error => alert(error))
    .finally(() => setLoading(false))
  }, [])

  if(loading) return <h2>Loading</h2>

  return (
    <div>
      <h1>{currentUser.first_name} {currentUser.last_name} (Parent/Guardian)</h1>
      <h5>First Name: {currentUser.first_name}</h5>
      <h5>Last Name: {currentUser.last_name}</h5>
      <h5>Email: {currentUser.email}</h5>
      <h5>Address: {currentUser.address}</h5>
      <h5>City: {currentUser.city}</h5>
      <h5>State: {currentUser.state}</h5>
      <h5>Zip Code: {currentUser.zip_code}</h5>
      <h5>Phone #: {currentUser.phone_number}</h5>
      <h5>Students Registered/Enrolled: {currentUser.students.map(student => (<li key={student.id}>{student.first_name} {student.last_name}</li>))}</h5>
      <h5>Notes: <em>{currentUser.notes}</em></h5>
      <Link to="/current-students">Back</Link>
    </div>
  )
}

export default UserInfo
