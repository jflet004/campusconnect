import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../context/user'
import "../css/Details.css"
const TeacherDetails = ({ releaseTeacher }) => {

  const { assignTeacher, errors, setErrors, loading, setLoading } = useContext(UserContext)

  const [currentTeacher, setCurrentTeacher] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`/teachers/${params.id}`)
      .then(r => r.json())
      .then(teacher => setCurrentTeacher(teacher))
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

    fetch(`/teacher_assignments/${assignmentId}`, {
      method: "DELETE"
    })
      .then(r => {
        if (r.ok) {
          releaseTeacher(teacherId)
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
    <div className='details-card' >
      <h2 className='details-title'>{currentTeacher.first_name}'s Profile <span style={{ fontSize: "15px" }}>(Teacher)</span></h2>
      <Link to={`/update-teacher/${params.id}`} className='details-link'>Edit</Link>
      <p><span style={{ fontWeight: 'bold' }}>First Name:</span> {currentTeacher.first_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Last Name:</span> {currentTeacher.last_name}</p>
      <p><span style={{ fontWeight: 'bold' }}>Email:</span> {currentTeacher.email}</p>
      <p><span style={{ fontWeight: 'bold' }}>Phone #:</span> {currentTeacher.phone_number}</p>
      <p><span style={{ fontWeight: 'bold' }}>Address:</span> {currentTeacher.address}</p>
      <p><span style={{ fontWeight: 'bold' }}>City:</span> {currentTeacher.city}</p>
      <p><span style={{ fontWeight: 'bold' }}>State:</span> {currentTeacher.state}</p>
      <p><span style={{ fontWeight: 'bold' }}>Zip Code:</span> {currentTeacher.postal_code}</p>
      <p><span style={{ fontWeight: 'bold' }}>Courses:</span> {currentTeacher.courses ? currentTeacher.courses.map(course => <li key={course.id}><Link to={`/programs/${course.id}`} className='details'>{course.title}: {course.start_time}-{course.end_time}</Link><button onClick={() => { handleCourseRelease(course, parseInt(params.id)) }} className='drop-btn'>X</button></li>) : null}</p>
      <Link to="/current-teachers" className='details-link'>back to Teachers List</Link>
      <form onSubmit={handleAssignmentSubmit}>
      <br/>

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
      {errors ? errors.map(error => <li key={error} className="error-msg">{error}</li>) : null}
    </div>
  )
}

export default TeacherDetails
