import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../context/user'
import "../css/Details.css"

const TeacherDetails = () => {

  const { releaseTeacher, assignTeacher, courses, displayErrors, setErrors, loading, setLoading } = useContext(UserContext)

  const [currentTeacher, setCurrentTeacher] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)

  const params = useParams()

  useEffect(() => {
    fetch(`/teachers/${params.id}`)
      .then(r => r.json())
      .then(teacher => setCurrentTeacher(teacher))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [params.id, setLoading])

  const handleCourseChange = e => {
    const courseId = e.target.value;
    const selectedCourse = courses.find(course => course.title === courseId);
    setSelectedCourse(selectedCourse);
  };

  const handleAssignmentSubmit = e => {
    e.preventDefault()
    if (!selectedCourse) {
      setErrors(["Please select a course"])
      return
    }
    assignTeacher({
      teacher_id: currentTeacher.id,
      course_id: selectedCourse.id
    })
  }

  const courseOptions = courses.map((course) => (
    <option key={course.id} value={course.title}>{course.title}: {course.start_time}-{course.end_time}</option>
  ))

  const handleCourseRelease = (course, teacherId) => {
    const assignmentId = course.teacher_assignments.find(assignment => assignment.teacher_id === teacherId).id
    releaseTeacher(assignmentId, teacherId)
  }

  if (loading) return <h1 className='loading'>Loading</h1>

  return (
    <div className='details-card' >
      <h2 className='details-title'>{currentTeacher.first_name}'s Profile <span style={{ fontSize: "15px" }}>(Teacher)</span></h2>
      <Link to={`/update-teacher/${params.id}`} className='details-link'>Edit</Link>
      <p><span>First Name:</span> {currentTeacher.first_name}</p>
      <p><span>Last Name:</span> {currentTeacher.last_name}</p>
      <p><span>Email:</span> {currentTeacher.email}</p>
      <p><span>Phone #:</span> {currentTeacher.phone_number}</p>
      <p><span>Address:</span> {currentTeacher.address}</p>
      <p><span>City:</span> {currentTeacher.city}</p>
      <p><span>State:</span> {currentTeacher.state}</p>
      <p><span>Zip Code:</span> {currentTeacher.postal_code}</p>
      <p><span>Courses:</span> {currentTeacher.courses ? currentTeacher.courses.map(course => <li key={course.id}><Link to={`/current-course/${course.id}`} className='links'>{course.title}: {course.start_time.slice(0, 5)}-{course.end_time.slice(0, 5)}</Link><button onClick={() => { handleCourseRelease(course, parseInt(params.id)) }} className='drop-btn'>X</button></li>) : null}</p>
      <Link to="/current-teachers" className='details-link'>back to Teachers List</Link>
      <form onSubmit={handleAssignmentSubmit}>
        <br />

        <h1 className='details-title'>Assign Course</h1>
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
        <input type="submit" value="Assign Course" className='details-list' />
      </form>
      <br />
      {displayErrors()}
    </div>
  )
}

export default TeacherDetails
