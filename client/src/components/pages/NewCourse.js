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
    start_recur: "",
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

  const locationOptions = classrooms.map(room => <option key={room.id} value={room.name}>{room.name}</option>)

  return (
    <div className='login-form'>
      <h1>New Course Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <label>Start</label>
        <input
          type="datetime-local"
          name="start_time"
          value={formData.start_time}
          onChange={handleInputChange}
        />
        <label>End</label>
        <input
          type="datetime-local"
          name="end_time"
          value={formData.end_time}
          onChange={handleInputChange}
        />
        <label>Capacity</label>
        <input
          type="integer"
          name="capacity"
          value={formData.capacity}
          onChange={handleInputChange}
        />
        <label>Price</label>
        <input
          type="float"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <label>Location</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        >
          <option value="">Select one</option>
          {locationOptions}
        </select>
        <label>Rec Start</label>
        <input
          type="date"
          name="start_recur"
          value={formData.start_recur}
          onChange={handleInputChange}
        />
        <label>Recurrence</label>
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
        <br/>
        <input type="submit" value="Add New Course" />
      </form>
      <br />
      {errors ? errors.map(error => <li className="error-msg" key={error}>{error}</li>) : null}
    </div>
  )
}

export default NewCourse