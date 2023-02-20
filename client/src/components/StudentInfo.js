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

  if(loading) return <h2>Loading</h2>

  return (
    <div>
      <h2>{currentStudent.first_name}'s Info (Student)</h2>
      <h5>First Name:{currentStudent.first_name}</h5>
      <h5>Last Name:{currentStudent.last_name}</h5>
      <h5>Age:{currentStudent.age}</h5>
      <h5>Birthday:{currentStudent.birthday}</h5>
      <h5>Gender: {currentStudent.gender}:</h5>
      <h5>Student Since:{currentStudent.student_since}</h5>
      <h5>Courses: COMING SOON</h5>
      <h5>Notes: COMMING SOON</h5>
      
      <Link to="/current-students">Back</Link>
    </div>
  )
}

export default StudentInfo
