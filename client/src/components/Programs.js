import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Programs = ({ courses }) => {

  const navigate = useNavigate()

  const [filters, setFilters] = useState({
    title: '',
    start_time: '',
    end_time: '',
    location: '',
    capacity: '',
    price: ''
  });

  const filteredCourses = courses.filter(course => {
    const status = course.students_enrolled >= course.capacity ? "Closed" : "Open";

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
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const getCourseStatus = (course) => {
    const status = course.students_enrolled >= course.capacity ? "Closed" : "Open"
    const color = course.students_enrolled >= course.capacity ? "red" : "green"
    const enrollment = `(${course.students_enrolled}/${course.capacity})`
    return { status, color, enrollment };
  };

  return (
    <div >
      <h1>Programs</h1>
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
              <label>Students</label>
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
                <td><button onClick={() => { navigate(`/current-course/${course.id}`) }}>🔎</button> {course.first_title} {course.last_title}</td>
                <td>{course.title}</td>
                <td>{course.start_time}</td>
                <td>{course.end_time}</td>
                <td>{course.location}</td>
                <td style={{ color: getCourseStatus(course).color }}>
                  {getCourseStatus(course).status} {getCourseStatus(course).enrollment}
                </td>
                <td>${course.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Programs
