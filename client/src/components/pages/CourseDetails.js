import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../context/user'


const CourseDetails = () => {

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
    <div>
      <h1>Program Info</h1>
      {currentUser.admin ? <Link to={`/update-course/${params.id}`}>Edit</Link> : null}
      <p><span style={{ fontWeight: 'bold' }}>Title:</span> {course.title}</p>
      <p><span style={{ fontWeight: 'bold' }}>Start Time:</span> {course.start_time}</p>
      <p><span style={{ fontWeight: 'bold' }}>End Time:</span> {course.end_time}</p>
      <p><span style={{ fontWeight: 'bold' }}>Location:</span> {course.location}</p>
      <p><span style={{ fontWeight: 'bold' }}>Price:</span> {course.price}</p>
      <p><span style={{ fontWeight: 'bold' }}>Teacher:</span> {course.teachers_full_name} {course.teachers.last_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Enrolled Students:</span> {course.students ? course.students.map(student => <li key={student.id}><Link to={`/current-student/${student.id}`}>{student.first_name} {student.last_name}</Link></li>) : null}</p>
    </div>
  )
}

export default CourseDetails
