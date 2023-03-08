import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const UpdateCourse = ({ updateCourse, teachers, classrooms }) => {

  const params = useParams()
  const navigate = useNavigate()

  const [errors, setErrors] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    start_time: "",
    end_time: "",
    price: "",
    capacity: "",
    location: "",
    teacher_id: ""
  })

  useEffect(() => {
    fetch(`/courses/${params.id}`)
      .then(r => r.json())
      .then(course => setFormData({
        title: course.title,
        start_time: course.start_time,
        end_time: course.end_time,
        price: course.price,
        capacity: course.capacity,
        location: course.location,
        teacher_id: course.teacher_id
      }))
  }, [params.id])


  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`/courses/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(updateCourse)
          navigate(`/current-course/${params.id}`)
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }

  const teacherOptions = teachers.map((teacher) => (
    <option key={teacher.id} value={teacher.id}>{teacher.first_name} {teacher.last_name}</option>
  ))
  const locationOptions = classrooms.map(room => <option key={room.id} value={room.name}>{room.name}</option>)


  return (
    <div>
      <h1>UpdatePage</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <br />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <label>Start Time</label>
        <br />
        <input
          type="datetime-local"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
        />
        <br />
        <label>End Time</label>
        <br />
        <input
          type="datetime-local"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
        />
        <br />
        <label>Location</label>
        <br />
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          >
          <option value="">Select one</option>
          {locationOptions}
        </select>
        <br />
        <label>Teacher</label>
        <br />
        <select
          name="teacher_id"
          value={formData.teacher_id}
          onChange={handleChange}
          >
          <option value="">Select one</option>
          {teacherOptions}
        </select>
        <br />
        <br />
        <input type="submit" value="Update teacher" />
        <br />
        <Link to={`/current-course/${params.id}`}>Back</Link>
      </form>
      {errors ? errors.map(error => <li key={error}>{error}</li>) : null}
    </div>
  )
}

export default UpdateCourse
