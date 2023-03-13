import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const StudentDetails = ({ enrollStudent, dropStudent }) => {

  const [currentStudent, setCurrentStudent] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`/students/${params.id}`)
      .then(r => r.json())
      .then(student => setCurrentStudent(student))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [params.id])

  useEffect(() => {
    fetch('/courses')
      .then(r => r.json())
      .then(courses => setCourses(courses))
      .catch(error => alert(error))
  }, [])

  const handleCourseChange = e => {
    const courseId = e.target.value;
    const selectedCourse = courses.find(course => course.title === courseId);
    setSelectedCourse(selectedCourse);
  };

  const handleEnrollmentSubmit = e => {
    e.preventDefault()
    if (!selectedCourse) {
      setErrors(["Please select a course"])
      return
    }
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
      .then(r => {
        if (r.ok) {
          r.json().then(enrollStudent)
          setCourses(courses)
          navigate("/enrollment-success")
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }

  const courseOptions = courses.map((course) => (
    <option key={course.id} value={course.title}>{course.title}: {course.start_time}-{course.end_time}</option>
  ))

  const handleDropCourse = (course, studentId) => {
    const enrollmentId = course.enrollments.find(enrollment => enrollment.student_id === studentId).id

    fetch(`/enrollments/${enrollmentId}`, {
      method: "DELETE"
    })
      .then(r => {
        if (r.ok) {
          dropStudent(studentId)
          navigate("/drop-successful")
        } else {
          r.json().then(data => {
            console.log(data);
            setErrors(data.errors);
          })
        }
      })
      .catch(error => {
        console.error(error);
        alert("An error occurred while dropping the course.");
      })

  }


  if (loading) return <h2>Loading</h2>

  return (
    <div >
      <h2>{currentStudent.first_name}'s Profile <span style={{ fontSize: "15px" }}>(Student)</span></h2>
      <Link to={`/update-student/${params.id}`}>Edit</Link>
      <p><span style={{ fontWeight: 'bold' }}>First Name:</span> {currentStudent.first_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Last Name:</span> {currentStudent.last_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Age:</span> {currentStudent.age}</p>
      <p><span style={{ fontWeight: 'bold' }}>Birthday:</span> {currentStudent.birthday}</p>
      <p><span style={{ fontWeight: 'bold' }}>Gender:</span> {currentStudent.gender}</p>
      <p><span style={{ fontWeight: 'bold' }}>Student Since:</span> {currentStudent.created_at}</p>
      <p><span style={{ fontWeight: 'bold' }}>Courses:</span> {currentStudent.courses.map(course => <li key={course.id}><Link to={`/current-course/${course.id}`}>{course.title}: {course.start_time}-{course.end_time}</Link>  <button onClick={() => handleDropCourse(course, parseInt(params.id))}>Drop</button></li>)}</p>
      <p style={{ whiteSpace: 'pre-wrap' }}><span style={{ fontWeight: 'bold' }}>Notes:<br /></span><em>{currentStudent.notes}</em></p>
      <Link to="/current-students">back to Student List</Link>
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
      <br />
      {errors ? errors.map(error => <li key={error} className="error-msg">{error}</li>) : null}
    </div>
  )
}

export default StudentDetails
