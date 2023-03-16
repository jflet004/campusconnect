import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/user'
import '../css/CourseForm.css'

const NewCourse = ({ classrooms }) => {

const { addCourse, errors } = useContext(UserContext)

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
    addCourse(formData)
  }

  const locationOptions = classrooms.map(room => <option key={room.id} value={room.name}>{room.name}</option>)

  return (
    <div className='course-form'>
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
        <label>Rec Start</label>
        <br />
        <input
          type="date"
          name="start_recur"
          value={formData.start_recur}
          onChange={handleInputChange}
        />
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
        <input type="submit" value="Add New Course" />
      </form>
      <br />
      {errors ? errors.map(error => <li className="error-msg" key={error}>{error}</li>) : null}
    </div>
  )
}

export default NewCourse