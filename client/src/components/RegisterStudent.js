import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'

const RegisterStudent = ({ addStudent }) => {

  const { currentUser } = useContext(UserContext)

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    interest: "",
    user_id: currentUser.id
  })
  const [errors, setErrors] = useState(false)
  const navigate = useNavigate()
  const interest = ["Art", "Music", "Drama", "Dance"]

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "gender") {
      setFormData({ ...formData, gender: e.target.value })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch("/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(addStudent)
          navigate('/current-students')
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }


  return (
    <div>
      <h1>Register Student Page</h1>
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
        <label>Birthday</label>
        <br />
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />
        <br />
        <label>Gender</label>
        <br />
        <input
          type="radio"
          name="gender"
          value="Male"
          onChange={handleChange}
        />
        <label>Male</label>
        <input
          type="radio"
          name="gender"
          value="Female"
          onChange={handleChange}
        />
        <label>Female</label>
        <input
          type="radio"
          name="gender"
          value="Non-binary/non-conforming"
          onChange={handleChange}
        />
        <label>Non-binary/non-conforming</label>
        <input
          type="radio"
          name="gender"
          value="Prefer not to respond"
          onChange={handleChange}
        />
        <label>Prefer not to respond</label>
        <br />
        <label>Interest</label>
        <br />
        <select>
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          <option value="">Select one</option>
          {interest.map((option, index) => (
            <option key={index} value={index}>{option}</option>
          ))}
        </select>
        <br />
        <br />
        <br />
        <br />
        <input type="submit" value="Send Registration Form" />
      </form>
    </div>
  )
}

export default RegisterStudent
