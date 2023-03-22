import React from 'react'
import { Link } from 'react-router-dom'
import '../css/AdminPage.css'

const AdminPage = () => {
  return (
    <div className='link-container'>
      {/* <h1>AdminPage</h1> */}
      <Link to="/current-students">View Students</Link>
      <br/>
      <Link to="/current-teachers">View Teachers</Link>
      <br/>
      <Link to="/courses">View Courses</Link>
      <br/>
      <Link to="/new-course">Add Course</Link>
      <br/>
    </div>
  )
}

export default AdminPage
