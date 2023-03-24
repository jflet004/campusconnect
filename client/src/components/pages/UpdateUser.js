import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../context/user'
import "../css/Details.css"

const UpdateUser = () => {

  const { updateUser, displayErrors } = useContext(UserContext)

  const params = useParams()


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
    updateUser(params.id, formData)
  }


  return (
    <div className='details-card'>
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
        <input type="submit" value="Update Parent/Guardian" className='details-list' />
        <br />
        <Link to={`/users/${params.id}`} className='details-link'>Back</Link>
      </form>
      {displayErrors()}
    </div>
  )
}

export default UpdateUser
