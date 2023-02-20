import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const StudentInfo = () => {

  const [currentStudent, setCurrentStudent] = useState([])

  const params = useParams()
  
  useEffect(() => {
    fetch(`/students/${params.id}`)
    .then(r => r.json())
    .then(student => setCurrentStudent(student))
    .catch(error => alert(error))
  }, [])

  return (
    <div>
      <h1>{currentStudent.first_name}'s Info</h1>
      <Link to="/current-students">Back</Link>
    </div>
  )
}

export default StudentInfo
