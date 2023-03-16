import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../context/user'
import '../css/Details.css'


const CourseDetails = ({ authErrors }) => {

  const { currentUser } = useContext(UserContext)

  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    fetch(`/courses/${params.id}`)
      .then(r => r.json())
      .then(course => setCourse(course))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) return <h1>Loading</h1>

  
  return (
    <div className='details-card'>
      {authErrors ? <li>{authErrors}</li> :
      <>
      <h1 className='details-title'>
        {course.title}
        <br />
        {currentUser.admin ? <Link to={`/update-course/${params.id}`} className='details-link'>Edit</Link> : null}</h1>
      <p><span style={{ fontWeight: 'bold' }}>Start Time:</span> {course.start_time.slice(0,5)}</p>
      <p><span style={{ fontWeight: 'bold' }}>End Time:</span> {course.end_time.slice(0,5)}</p>
      <p><span style={{ fontWeight: 'bold' }}>Location:</span> {course.location}</p>
      <p><span style={{ fontWeight: 'bold' }}>Price:</span> ${course.price}</p>
      <p><span style={{ fontWeight: 'bold' }}>Teacher:</span> {course.teachers_full_name} {course.teachers.last_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Enrolled Students:</span> {course.students ? course.students.map(student => <li key={student.id} className='details-list'><Link to={`/current-student/${student.id}`} className='details-link'>{student.first_name} {student.last_name}</Link></li>) : null}</p>
      <Link to="/courses" className='details-link'>back to Course List</Link>
      </>}
    </div>
  )
}

export default CourseDetails
