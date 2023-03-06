import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ProgramInfo = () => {

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
      <p><span style={{ fontWeight: 'bold' }}>Title:</span> {course.title}</p>
      <p><span style={{ fontWeight: 'bold' }}>Start Time:</span> {course.start_time}</p>
      <p><span style={{ fontWeight: 'bold' }}>End Time:</span> {course.end_time}</p>
      <p><span style={{ fontWeight: 'bold' }}>Location:</span> {course.location}</p>
      <p><span style={{ fontWeight: 'bold' }}>Price:</span> {course.price}</p>
      <p><span style={{ fontWeight: 'bold' }}>Enrolled Students:</span> {course.students.map(student => <li key={student.id}><Link to={`/current-student/${student.id}`}>{student.first_name} {student.last_name}</Link></li>)}</p>
    </div>
  )
}

export default ProgramInfo
