import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewCourse = ({ addCourse, teachers, classrooms }) => {

  const navigate = useNavigate()

  const [errors, setErrors] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    start_time: "",
    end_time: "",
    price: "",
    capacity: "",
    location: "",
    teacher_id: "",
    days_of_week: []
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleDaysOfWeekChange = (event) => {
    const selectedDays = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    )
    setFormData({
      ...formData,
      days_of_week: selectedDays,
    })
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

  return (
    <div>
      <h1>New Course Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <br />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <br />
        <label>Start</label>
        <br />
        <input
          type="datetime-local"
          name="start_time"
          value={formData.start_time}
          onChange={handleInputChange}
        />
        <br />
        <label>End</label>
        <br />
        <input
          type="datetime-local"
          name="end_time"
          value={formData.end_time}
          onChange={handleInputChange}
        />
        <br />
        <label>Capacity</label>
        <br />
        <input
          type="integer"
          name="capacity"
          value={formData.capacity}
          onChange={handleInputChange}
        />
        <br />
        <label>Price</label>
        <br />
        <input
          type="float"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <br />
        <label>Location</label>
        <br />
        <select
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        >
          <option value="">Select one</option>
          {locationOptions}
        </select>
        <br />
        <label>Recurrence</label>
        <br />
        <select
          name="days_of_week"
          multiple={true}
          value={formData.days_of_week}
          onChange={handleDaysOfWeekChange}
        >
          <option value="0">Sunday</option>
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
          <option value="6">Saturday</option>
        </select>
        <br />
        <label>Teacher</label>
        <br />
        <select
          name="teacher_id"
          value={formData.teacher_id}
          onChange={handleInputChange}
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

export default NewCourse