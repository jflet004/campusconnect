import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const UpdateUser = ({ updateUser }) => {

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
    zip_code: "",
    notes: ""
  })

  useEffect(() => {
    fetch(`/users/${params.id}`)
      .then(r => r.json())
      .then(user => setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
        city: user.city,
        state: user.state,
        zip_code: user.zip_code,
        notes: user.notes
      }))
  }, [params.id])


  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "gender") {
      setFormData({ ...formData, gender: e.target.value })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`/users/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(updateUser)
          navigate(`/current-user/${params.id}`)
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
        <br />
        <label>Zip Code</label>
        <br />
        <input
          type="text"
          name="zip_code"
          value={formData.zip_code}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Notes</label>
        <br />
        <textarea
          name="notes"
          value={formData.notes === null ? "" : formData.notes}
          onChange={handleChange}
          rows="4"
          cols="50"
        />
        <br />
        <br />
        <input type="submit" value="Update Student" />
        <br />
        <Link to={`/current-student/${params.id}`}>Back</Link>
      </form>
      {errors ? errors.map(error => <li key={error}>{error}</li>) : null}
    </div>
  )
}

export default UpdateUser
