import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../context/user'
import "../css/Details.css"
const StudentDetails = () => {

  const { courses, enrollStudent, dropStudent, errors, setErrors, updateCourseEnrollment, updateCourseDrop } = useContext(UserContext)

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
    updateCourseEnrollment(selectedCourse.id)
  }
  
  const courseOptions = courses.map((course) => (
    <option key={course.id} value={course.title}>{course.title}: {course.start_time}-{course.end_time}</option>
    ))
    
    const handleDropCourse = (course, studentId) => {
      const enrollmentId = course.enrollments.find(enrollment => enrollment.student_id === studentId).id
      dropStudent(enrollmentId, studentId)
      updateCourseDrop(course.id)
  }


  if (loading) return <h2>Loading</h2>

  return (
    <div className='details-card' >
      <h2 className='details-title' >{currentStudent.first_name}'s Profile <span style={{ fontSize: "15px" }}>(Student)</span></h2>
      <Link to={`/update-student/${params.id}`} className='details-link'>Edit</Link>
      <p><span style={{ fontWeight: 'bold' }}>First Name:</span> {currentStudent.first_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Last Name:</span> {currentStudent.last_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Age:</span> {currentStudent.age}</p>
      <p><span style={{ fontWeight: 'bold' }}>Birthday:</span> {currentStudent.birthday}</p>
      <p><span style={{ fontWeight: 'bold' }}>Gender:</span> {currentStudent.gender}</p>
      <p><span style={{ fontWeight: 'bold' }}>Student Since:</span> {currentStudent.created_at}</p>
      <p><span style={{ fontWeight: 'bold' }}>Parent/Guardian:</span> {currentStudent.user.first_name} {currentStudent.user.last_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Courses:</span> {currentStudent.courses.map(course => <li key={course.id}><Link to={`/current-course/${course.id}`} className='details'>{course.title}: {course.start_time.slice(0,5)}-{course.end_time.slice(0,5)}</Link>  <button onClick={() => handleDropCourse(course, parseInt(params.id))} className='drop-btn'>X</button></li>)}</p>
      <p style={{ whiteSpace: 'pre-wrap' }}><span style={{ fontWeight: 'bold' }}>Notes:<br /></span><em>{currentStudent.notes}</em></p>
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
      <div className='errors'>
        {Array.isArray(errors) ? (
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
        ) : (errors ? <li>{errors}</li> : null)}
      </div>
    </div>
  )
}

export default StudentDetails
