import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "../css/Details.css"
const UserDetails = () => {

  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    fetch(`/users/${params.id}`)
      .then(r => r.json())
      .then(user => setUser(user))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) return <h2>Loading</h2>

  return (
    <div className='details-card'>
      <h1 className='details-title'>{user.first_name} {user.last_name} <span style={{ fontSize: "15px" }}>(Parent/Guardian)</span></h1>
      <Link to={`/update-user/${params.id}`} className='details-link'>Edit</Link>
      <h3>Current Balance: ${user.balance}</h3>
      <p><span style={{ fontWeight: 'bold' }}>First Name:</span> {user.first_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Last Name:</span> {user.last_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Email:</span> {user.email}</p>
      <p><span style={{ fontWeight: 'bold' }}>Address:</span> {user.address}</p>
      <p><span style={{ fontWeight: 'bold' }}>City:</span> {user.city}</p>
      <p><span style={{ fontWeight: 'bold' }}>State:</span> {user.state}</p>
      <p><span style={{ fontWeight: 'bold' }}>Zip Code:</span> {user.zip_code}</p>
      <p><span style={{ fontWeight: 'bold' }}>Phone #:</span> {user.phone_number}</p>
      <p><span style={{ fontWeight: 'bold' }}>Students Registered/Enrolled:</span></p>
      <ul>
        {user.students.map(student => (
          <li key={student.id}>{student.first_name} {student.last_name}</li>
        ))}
      </ul>
      <p><span style={{ fontWeight: 'bold' }}>Notes:</span> <em>{user.notes}</em></p>
      <Link to="/current-students" className='details-link'>Back</Link>
    </div>
  )
}

export default UserDetails
