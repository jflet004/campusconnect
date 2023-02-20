import React from 'react'
import { Link } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div>
      <h1>AdminPage</h1>
      <Link to="/current-students">Current Students</Link>
    </div>
  )
}

export default AdminPage
