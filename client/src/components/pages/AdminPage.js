import React from 'react'
import { Link } from 'react-router-dom'
import '../css/AdminPage.css'

const AdminPage = () => {
  return (
    <div className='link-container'>
      <div className='admin-students'>
        <Link to="/current-students">View Students</Link>
      </div>
      <br />
      <div className='admin-teachers'>
        <Link to="/current-teachers">View Teachers</Link>
      </div>
      <br />
      <div className='admin-courses'>
        <Link to="/courses">View Courses</Link>
      </div>
      <br />
      <div className='admin-add-course'>
        <Link to="/new-course">Add Course</Link>
      </div>
      <br />
    </div>
  )
}

export default AdminPage
