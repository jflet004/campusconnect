import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';
import courseIcon from '../../web-icons/courses.svg'
import '../css/CourseList.css'

const CourseList = () => {

  const { currentUser, loggedIn, deleteCourse, courses } = useContext(UserContext)
  const navigate = useNavigate()
  // const [availableCourses, setAvailableCourses] = useState([])
  const [filters, setFilters] = useState({
    title: '',
    start_time: '',
    end_time: '',
    location: '',
    capacity: '',
    price: ''
  });

  // useEffect(() => {
  //   fetch("/courses")
  //     .then(r => r.json())
  //     .then(data => setAvailableCourses(data))
  //     .catch(error => alert(error))
  // }, [])

  const handleCourseDelete = (courseId) => {
    deleteCourse(courseId)
  }

  const filteredCourses = courses.filter(course => {
    const status = course.number_of_students_enrolled >= course.capacity ? "Closed" : "Open";
    return (
      course.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      course.start_time.toLowerCase().includes(filters.start_time.toLowerCase()) &&
      course.end_time.toLowerCase().includes(filters.end_time.toLowerCase()) &&
      course.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      (status.toLowerCase().includes(filters.capacity.toLowerCase()) || String(course.capacity).toLowerCase().includes(filters.capacity.toLowerCase())) &&
      String(course.price).toLowerCase().includes(filters.price.toLowerCase())
    )
  })

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
  }

  const getCourseStatus = (course) => {
    const status = course.number_of_students_enrolled >= course.capacity ? "Closed" : "Open"
    const color = course.number_of_students_enrolled >= course.capacity ? "red" : "green"
    const enrollment = `(${course.number_of_students_enrolled}/${course.capacity})`
    return { status, color, enrollment };
  };

  const coursesOffered = courses.map(course => {
      const dayOfWeekStrings = course.days_of_week.map(dayOfWeek => {
        switch (dayOfWeek) {
          case '0':
            return 'Sunday'
          case '1':
            return 'Monday'
          case '2':
            return 'Tuesday'
          case '3':
            return 'Wednesday'
          case '4':
            return 'Thursday'
          case '5':
            return 'Friday'
          case '6':
            return 'Saturday'
          default:
            return ''
        }
      })
      const dayOfWeekString = dayOfWeekStrings.join(", ")
      return (
        <div key={course.id} className='details-courses'>
          <p style={{ fontWeight: "bold" }}>{course.title}</p>
          <p style={{ fontSize: "14px" }}>{dayOfWeekString}</p>
          <p style={{ fontSize: "14px" }}>{course.start_time.slice(0, 5)} - {course.end_time.slice(0, 5)}</p>
          <p style={{ fontSize: "14px", color: getCourseStatus(course).color }}>{getCourseStatus(course).status} {getCourseStatus(course).enrollment}</p>
        </div>
      )
  })


  const courseList = filteredCourses.map(course => (
    <tr className='course-table-rows' key={course.id}>
      <td>{currentUser.admin ? <button onClick={() => { navigate(`/current-course/${course.id}`) }} className='details-button'>🔎</button> : null} {course.title}</td>
      <td>{course.start_time.slice(0, 5)}</td>
      <td>{course.end_time.slice(0, 5)}</td>
      <td>{course.location}</td>
      <td style={{ color: getCourseStatus(course).color }}>
        {getCourseStatus(course).status} {getCourseStatus(course).enrollment}
      </td>
      <td>${course.price}</td>
      {currentUser.admin ? <td><button onClick={() => handleCourseDelete(course.id)} className='delete-course' >X</button> {course.first_title} {course.last_title}</td> : null}
    </tr>
  ))


  if (!loggedIn) {
    return (
      <div>
        <div >
          <p style={{ textAlign: "center", color: "#666666", fontWeight: "bold" }}>Create an account or login to register your student</p>
          <br />
          <h1 style={{ textAlign: "center", color: "#012460" }}>Courses</h1>
          {coursesOffered}
        </div>
        <br />
      </div>
    )
  } else {
    return (
      <div >
        <img src={courseIcon} width="30px" className="student-icon-inline" alt='icon' />
        <h1 className='student-title'>Courses</h1>
        <table className='course-table'>
          <thead>
            <tr>
              <th>
                <label>Title</label>
                <br />
                <input
                  type="text"
                  value={filters.title}
                  onChange={e => handleFilterChange('title', e.target.value)}
                />
              </th>
              <th>
                <label>Start</label>
                <br />
                <input
                  type="text"
                  value={filters.start_time}
                  onChange={e => handleFilterChange('start_time', e.target.value)}
                />
              </th>
              <th>
                <label>End</label>
                <br />
                <input
                  type="text"
                  value={filters.end_time}
                  onChange={e => handleFilterChange('end_time', e.target.value)}
                />
              </th>
              <th>
                <label>Location</label>
                <br />
                <input
                  type="text"
                  value={filters.location}
                  onChange={e => handleFilterChange('location', e.target.value)}
                />
              </th>
              <th>
                <label>Status</label>
                <br />
                <input
                  type="text"
                  value={filters.capacity}
                  onChange={e => handleFilterChange('capacity', e.target.value)}
                />
              </th>
              <th>
                <label>Price</label>
                <br />
                <input
                  type="text"
                  value={filters.price}
                  onChange={e => handleFilterChange('price', e.target.value)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {courseList}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CourseList
