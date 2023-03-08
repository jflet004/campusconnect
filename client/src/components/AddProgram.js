import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddProgram = ({ addCourse, teachers, classrooms }) => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
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


  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch("/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(addCourse)
          navigate('/enrollment-success')
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }

  const teacherOptions = teachers.map((teacher) => (
    <option key={teacher.id} value={teacher.id}>{teacher.first_name} {teacher.last_name}</option>
  ))

  const locationOptions = classrooms.map(room => <option key={room.id} value={room.name}>{room.name}</option>)

  // if (loading) return <h1>Loading</h1>

  return (
    <div>
      <h1>New Program Form</h1>
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
        <label>Start</label>
        <br />
        <input
          type="datetime-local"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
        />
        <br />
        <label>End</label>
        <br />
        <input
          type="datetime-local"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
        />
        <br />
        <label>Capacity</label>
        <br />
        <input
          type="integer"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
        />
        <br />
        <label>Price</label>
        <br />
        <input
          type="float"
          name="price"
          value={formData.price}
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
        <input type="submit" value="Submit Registration Form" />
      </form>
      <br />
      {errors ? errors.map(error => <li className="error-msg" key={error}>{error}</li>) : null}
    </div>
  )
}

export default AddProgram