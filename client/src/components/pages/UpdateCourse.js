import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../context/user'
import "../css/Details.css"

const UpdateCourse = () => {

  const { updateCourse, displayErrors, classrooms } = useContext(UserContext)

  const params = useParams()

  const [formData, setFormData] = useState({
    title: "",
    start_time: "",
    end_time: "",
    price: "",
    capacity: "",
    location: ""
  })

  useEffect(() => {
    fetch(`/courses/${params.id}`)
      .then(r => r.json())
      .then(course => setFormData({
        title: course.title,
        start_time: course.start_time,
        end_time: course.end_time,
        price: course.price,
        start_recur: course.start_recur,
        capacity: course.capacity,
        location: course.location
      }))
  }, [params.id])


  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    updateCourse(params.id, formData)
  }

  const locationOptions = classrooms.map(room => <option key={room.id} value={room.name}>{room.name}</option>)

  return (
    <div className='details-card'>
      <h1 className='details-title'>Update Course</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <br />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="details-select"
        />
        <br />
        <br />
        <label>Start Time</label>
        <br />
        <input
          type="datetime-local"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          className="details-select"
        />
        <br />
        <br />
        <label>End Time</label>
        <br />
        <input
          type="datetime-local"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          className="details-select"
        />
        <br />
        <label>End Time</label>
        <br />
        <input
          type="date"
          name="start_recur"
          value={formData.start_recur}
          onChange={handleChange}
          className="details-select"
        />
        <br />
        <br />
        <label>Price</label>
        <br />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="details-select"
        />
        <br />
        <br />
        <label>Location</label>
        <br />
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="details-select"
        >
          <option value="">Select one</option>
          {locationOptions}
        </select>
        <br />
        <input type="submit" value="Update course" className='details-list' />
        <br />
        <Link to={`/current-course/${params.id}`} className='details-link'>Back</Link>
      </form>
      {displayErrors()}
    </div>
  )
}

export default UpdateCourse
