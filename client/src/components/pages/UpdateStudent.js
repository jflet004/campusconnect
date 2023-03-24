import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../context/user'
import "../css/Details.css"

const UpdateStudent = () => {

  const { updateStudent, displayErrors } = useContext(UserContext)

  const params = useParams()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    created_at: "",
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
        created_at: student.created_at,
        notes: student.notes
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
    updateStudent(params.id, formData)
  }

  return (
    <div className='details-card'>
      <h1 className='details-title'>Update Student</h1>
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
        <label>Student Since</label>
        <br />
        <input
          type="date"
          name="created_at"
          value={formData.created_at}
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
          checked={formData.gender === "Male"}
          onChange={handleChange}
        />
        <label>Male</label>
        <br />
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={formData.gender === "Female"}
          onChange={handleChange}
        />
        <label>Female</label>
        <br />
        <input
          type="radio"
          name="gender"
          value="Non-binary/non-conforming"
          checked={formData.gender === "Non-binary/non-conforming"}
          onChange={handleChange}
        />
        <label>Non-binary/non-conforming</label>
        <br />
        <input
          type="radio"
          name="gender"
          value="Prefer not to respond"
          checked={formData.gender === "Prefer not to respond"}
          onChange={handleChange}
        />
        <label>Prefer not to respond</label>
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
        <input type="submit" value="Update Student" className='details-list' />
        <br />
        <Link to={`/current-student/${params.id}`} className='details-link'>Back</Link>
      </form>
      {displayErrors()}
    </div>
  )
}

export default UpdateStudent
