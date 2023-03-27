import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../context/user'
import "../css/Details.css"
const StudentDetails = () => {

  const { courses, enrollStudent, dropStudent, setErrors, displayErrors } = useContext(UserContext)

  const [currentStudent, setCurrentStudent] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    fetch(`/students/${params.id}`)
      .then(r => r.json())
      .then(student => setCurrentStudent(student))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleCourseChange = e => {
    const courseId = e.target.value;
    const selectedCourse = courses.find(course => course.title === courseId);
    console.log(selectedCourse.space_left)
    setSelectedCourse(selectedCourse);
  };

  const handleEnrollmentSubmit = e => {
    e.preventDefault()
    if (!selectedCourse) {
      setErrors(["Please select a course"])
      return
    }
    enrollStudent({
      student_id: currentStudent.id,
      course_id: selectedCourse.id
    })
  }

  const handleDropCourse = (course, studentId) => {
    const enrollmentId = course.enrollments.find(enrollment => enrollment.student_id === studentId).id
    dropStudent(enrollmentId, studentId, course.id)
  }

  const courseOptions = courses.map((course) => (
    <option key={course.id} value={course.title}>{course.title}: {course.start_time.slice(0, 5)}-{course.end_time.slice(0, 5)}</option>
  ))

  if (loading) return <h1 className='loading'>Loading</h1>

  return (
    <div className='details-card' >
      <h2 className='details-title' >{currentStudent.first_name}'s Profile <span style={{ fontSize: "15px" }}>(Student)</span></h2>
      <Link to={`/update-student/${params.id}`} className='details-link'>Edit</Link>
      <p><span>First Name:</span> {currentStudent.first_name}</p>
      <p><span>Last Name:</span> {currentStudent.last_name}</p>
      <p><span>Age:</span> {currentStudent.age}</p>
      <p><span>Birthday:</span> {currentStudent.birthday}</p>
      <p><span>Gender:</span> {currentStudent.gender}</p>
      <p><span>Student Since:</span> {currentStudent.created_at}</p>
      <p><span>Parent/Guardian:</span> {currentStudent.user.first_name} {currentStudent.user.last_name}</p>
      <p><span>Courses:</span> {currentStudent.courses.map(course => <li key={course.id}><Link to={`/current-course/${course.id}`} className='links'>{course.title}: {course.start_time.slice(0, 5)}-{course.end_time.slice(0, 5)}</Link>  <button onClick={() => handleDropCourse(course, parseInt(params.id))} className='drop-btn'>X</button></li>)}</p>
      <p style={{ whiteSpace: 'pre-wrap' }}><span>Notes:<br /></span><em>{currentStudent.notes}</em></p>
      <Link to="/current-students" className='details-link'>back to Student List</Link>
      <form onSubmit={handleEnrollmentSubmit}>

        <br />
        <h1 className='details-title'>Enrollment</h1>
        <label>Courses</label>
        <br />
        <select
          className='details-select'
          name="selectedCourse"
          value={selectedCourse ? selectedCourse.title : ''}
          onChange={handleCourseChange}
        >
          <option value="">Select one</option>
          {courseOptions}
        </select>
        <br />
        <input type="submit" value="Enroll Student" className='details-list' />
      </form>
      <br />
      {displayErrors()}
    </div>
  )
}

export default StudentDetails
