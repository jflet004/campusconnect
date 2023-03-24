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

  if (loading) return <h1 className='loading'>Loading</h1>

  return (
    <div className='details-card'>
      <h1 className='details-title'>{user.first_name} {user.last_name} <span style={{ fontSize: "15px" }}>(Parent/Guardian)</span></h1>
      <Link to={`/update-user/${params.id}`} className='details-link'>Edit</Link>
      <h3 className='balance'>Current Balance: ${user.balance}</h3>
      <p><span>First Name:</span> {user.first_name}</p>
      <p><span>Last Name:</span> {user.last_name}</p>
      <p><span>Email:</span> {user.email}</p>
      <p><span>Address:</span> {user.address}</p>
      <p><span>City:</span> {user.city}</p>
      <p><span>State:</span> {user.state}</p>
      <p><span>Zip Code:</span> {user.zip_code}</p>
      <p><span>Phone #:</span> {user.phone_number}</p>
      <p><span>Students Registered/Enrolled:</span></p>
      <ul>
        {user.students.map(student => (
          <li key={student.id}><Link to={`/current-student/${student.id}`} className='links'>{student.first_name} {student.last_name}</Link></li>
        ))}
      </ul>
      <p><span>Notes:</span> <em>{user.notes}</em></p>
      <Link to="/current-students" className='details-link'>Back</Link>
    </div>
  )
}

export default UserDetails
