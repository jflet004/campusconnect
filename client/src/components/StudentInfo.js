import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const StudentInfo = () => {

  const [currentStudent, setCurrentStudent] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    fetch(`/students/${params.id}`)
      .then(r => r.json())
      .then(student => setCurrentStudent(student))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])


  useEffect(() => {
    fetch('/courses')
      .then(r => r.json())
      .then(courses => {
        setCourses(courses)
        console.log("Current courses:", courses)
      })
      .catch(error => alert(error))
  }, [])

  const courseOptions = courses.map((course) => (
    <option key={course.id} value={course.title}>{course.title}: {course.start_time}-{course.end_time}</option>
  ))

  const handleCourseChange = e => {
    const courseId = e.target.value;
    const selectedCourse = courses.find(course => course.title === courseId);
    setSelectedCourse(selectedCourse);
  };


  const handleEnrollmentSubmit = e => {
    e.preventDefault()
    fetch("/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        student_id: currentStudent.id,
        course_id: selectedCourse.id
      })
    })
      .then(r => r.json())
      .catch(error => alert(error))
  }



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
      <p><span style={{ fontWeight: 'bold' }}>Courses:</span> {currentStudent.courses.map(course => <li key={course.id}>{course.title}: {course.start_time}-{course.end_time}</li>)}</p>
      <p style={{ whiteSpace: 'pre-wrap' }}><span style={{ fontWeight: 'bold' }}>Notes:</span> <em>{currentStudent.notes}</em></p>
      <Link to="/current-students">Back</Link>
      <form onSubmit={handleEnrollmentSubmit}>

        <h1>Enrollment</h1>
        <label>Courses</label>
        <br />
        <select
          name="selectedCourse"
          value={selectedCourse ? selectedCourse.title : ''}
          onChange={handleCourseChange}
        >
          <option value="">Select one</option>
          {courseOptions}
        </select>
        <br />
        <input type="submit" value="Enroll Student" />
      </form>
      <br/>
      {errors ? errors.map(error => <li key={error}>{error}</li>) : null}
    </div>
  )
}

export default StudentInfo
