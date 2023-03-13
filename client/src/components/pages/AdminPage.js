import React from 'react'
import { Link } from 'react-router-dom'
import '../css/AdminPage.css'

const AdminPage = () => {
  return (
    <div>
      <h1>AdminPage</h1>
      <Link to="/current-students">View Students</Link>
      
      <Link to="/current-teachers">View Teachers</Link>
      
      <Link to="/courses">View Programs</Link>
      
      <Link to="/new-course">Add Program</Link>
      
    </div>
  )
}

export default AdminPage
