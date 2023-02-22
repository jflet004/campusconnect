import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
const UpdateStudent = ({ updateStudent }) => {

  const params = useParams()
  const navigate = useNavigate()

  const [errors, setErrors] = useState(false)

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    student_since: "",
    notes: ""
  })

  useEffect(() => {
    fetch(`/students/${params.id}`)
      .then(r => r.json())
      .then(student => setFormData({
        first_name: student.first_name,
        last_name: student.last_name,
        birthday: student.birthday,
        gender: student.gender,
        student_since: student.student_since,
        notes: student.notes
      }))
  }, [])


  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "gender") {
      setFormData({ ...formData, gender: e.target.value })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`/students/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(updateStudent)
          navigate(`/current-student/${params.id}`)
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
        <label>Birthday</label>
        <br />
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />
        <br />
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
        <br />
        <input
          type="radio"
          name="gender"
          value="Female"
          onChange={handleChange}
        />
        <label>Female</label>
        <br />
        <input
          type="radio"
          name="gender"
          value="Non-binary/non-conforming"
          onChange={handleChange}
        />
        <label>Non-binary/non-conforming</label>
        <br />
        <input
          type="radio"
          name="gender"
          value="Prefer not to respond"
          onChange={handleChange}
        />
        <label>Prefer not to respond</label>
        <br />
        <br />
        <label>Notes</label>
        <br />
        <textarea
          name="notes"
          value={formData.notes}
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
    </div>
  )
}

export default UpdateStudent
