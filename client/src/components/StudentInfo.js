import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const StudentInfo = () => {

  const [currentStudent, setCurrentStudent] = useState([])
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    fetch(`/students/${params.id}`)
      .then(r => r.json())
      .then(student => setCurrentStudent(student))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <h2>Loading</h2>

  return (
    <div className='info-card'>
      <h2>{currentStudent.first_name}'s Profile (Student)</h2>
      <Link to={`/update-student/${params.id}`}>Edit</Link>
      <p><span style={{ fontWeight: 'bold' }}>First Name:</span> {currentStudent.first_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Last Name:</span> {currentStudent.last_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Age:</span> {currentStudent.age}</p>
      <p><span style={{ fontWeight: 'bold' }}>Birthday:</span> {currentStudent.birthday}</p>
      <p><span style={{ fontWeight: 'bold' }}>Gender:</span> {currentStudent.gender}</p>
      <p><span style={{ fontWeight: 'bold' }}>Student Since:</span> {currentStudent.student_since}</p>
      <p><span style={{ fontWeight: 'bold' }}>Courses:</span> COMING SOON</p>
      <p><span style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap' }}>Notes:</span> <em>{currentStudent.notes}</em></p>
      <Link to="/current-students">Back</Link>
    </div>
  )
}

export default StudentInfo
