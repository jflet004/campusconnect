import React from 'react'
import { Link } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div>
      <h1>AdminPage</h1>
      <Link to="/current-students">View Students</Link>
      <br/>
      <Link to="/programs">View Programs</Link>
      <br/>
      <Link to="/new-program">Add Program</Link>
      <br/>
    </div>
  )
}

export default AdminPage
