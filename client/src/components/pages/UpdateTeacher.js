import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const UpdateTeacher = ({ updateTeacher }) => {

  const params = useParams()
  const navigate = useNavigate()

  const [errors, setErrors] = useState(false)

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    postal_code: ""
  })

  useEffect(() => {
    fetch(`/teachers/${params.id}`)
      .then(r => r.json())
      .then(teacher => setFormData({
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        email: teacher.email,
        phone_number: teacher.phone_number,
        address: teacher.address,
        city: teacher.city,
        state: teacher.state,
        postal_code: teacher.postal_code
      }))
  }, [params.id])


  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`/teachers/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(updateTeacher)
          navigate(`/current-teacher/${params.id}`)
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }


  return (
    <div>
      <h1>UpdatePage</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <br />
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <br />
        <label>Last Name</label>
        <br />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <label>Phone #</label>
        <br />
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <br />
        <label>Address</label>
        <br />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <br />
        <label>City</label>
        <br />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <br />
        <label>State</label>
        <br />
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        <br />
        <label>Zip Code</label>
        <br />
        <input
          type="text"
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Update teacher" />
        <br />
        <Link to={`/current-teacher/${params.id}`}>Back</Link>
      </form>
      {errors ? errors.map(error => <li key={error}>{error}</li>) : null}
    </div>
  )
}

export default UpdateTeacher
