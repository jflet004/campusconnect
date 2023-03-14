import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';
import '../css/List.css'

const CourseList = ({ courses, deleteCourse }) => {

  
  const { currentUser } = useContext(UserContext)

  const navigate = useNavigate()

  const [errors, setErrors] = useState(false)
  const [filters, setFilters] = useState({
    title: '',
    start_time: '',
    end_time: '',
    location: '',
    capacity: '',
    price: ''
  });

  const handleCourseDelete = (courseId) => {
    fetch(`/courses/${courseId}`, {
      method: "DELETE"
    })
      .then(r => {
        if (r.ok) {
          deleteCourse(courseId)
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
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
    setFilters({...filters, [key]: value})
  }

  const getCourseStatus = (course) => {
    const status = course.number_of_students_enrolled >= course.capacity ? "Closed" : "Open"
    const color = course.number_of_students_enrolled >= course.capacity ? "red" : "green"
    const enrollment = `(${course.number_of_students_enrolled}/${course.capacity})`
    return { status, color, enrollment };
  };


  return (
    <div >
      <table>
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
          {
            filteredCourses.map(course => (
              <tr key={course.id}>
                <td><button onClick={() => { navigate(`/current-course/${course.id}`) }} className='mg'>🔎</button> {course.title}</td>
                <td>{course.start_time.slice(0,5)}</td>
                <td>{course.end_time.slice(0,5)}</td>
                <td>{course.location}</td>
                <td style={{ color: getCourseStatus(course).color }}>
                  {getCourseStatus(course).status} {getCourseStatus(course).enrollment}
                </td>
                <td>${course.price}</td>
                {currentUser.admin ? <td><button onClick={() => handleCourseDelete(course.id)}>X</button> {course.first_title} {course.last_title}</td> : null}
              </tr>
            ))}
        </tbody>
      </table>
      {errors ? <li>{errors}</li> : null}
    </div>
  )
}

export default CourseList
