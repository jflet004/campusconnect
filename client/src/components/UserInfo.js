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
  }, [params.id])

  if (loading) return <h2>Loading</h2>

  return (
    <div>
      <h1>{currentUser.first_name} {currentUser.last_name} <span style={{fontSize:"15px"}}>(Parent/Guardian)</span></h1>
      <Link to={`/update-user/${params.id}`}>Edit</Link>
      <p><span style={{ fontWeight: 'bold' }}>First Name:</span> {currentUser.first_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Last Name:</span> {currentUser.last_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Email:</span> {currentUser.email}</p>
      <p><span style={{ fontWeight: 'bold' }}>Address:</span> {currentUser.address}</p>
      <p><span style={{ fontWeight: 'bold' }}>City:</span> {currentUser.city}</p>
      <p><span style={{ fontWeight: 'bold' }}>State:</span> {currentUser.state}</p>
      <p><span style={{ fontWeight: 'bold' }}>Zip Code:</span> {currentUser.zip_code}</p>
      <p><span style={{ fontWeight: 'bold' }}>Phone #:</span> {currentUser.phone_number}</p>
      <p><span style={{ fontWeight: 'bold' }}>Students Registered/Enrolled:</span></p>
      <ul>
        {currentUser.students.map(student => (
          <li key={student.id}>{student.first_name} {student.last_name}</li>
        ))}
      </ul>
      <p><span style={{ fontWeight: 'bold' }}>Notes:</span> <em>{currentUser.notes}</em></p>
      <Link to="/current-students">Back</Link>
    </div>
  )
}

export default UserInfo
