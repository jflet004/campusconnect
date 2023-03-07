import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'

const RegisterStudent = ({ addStudent }) => {

  const { currentUser } = useContext(UserContext)
  
  const navigate = useNavigate()
  
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    interest: "",
    user_id: currentUser.id
  })

  useEffect(() => {
    fetch('/courses')
      .then(r => r.json())
      .then(course => {
        setCourses(course)
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
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
    console.log(formData)
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
        navigate('/successful-registration')
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }
  
  const courseOptions = courses.map((course) => (
    <option key={course.id} value={course.title}>{course.title}: {course.start_time}-{course.end_time}</option>
  ))

  if(loading) return <h1>Loading</h1>

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
          <br/>
        <input
          type="radio"
          name="gender"
          value="Female"
          onChange={handleChange}
          />
        <label>Female</label>
          <br/>
        <input
          type="radio"
          name="gender"
          value="Non-binary/non-conforming"
          onChange={handleChange}
        />
        <label>Non-binary/non-conforming</label>
        <br/>
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
        <select
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          >
          <option value="">Select one</option>
          {courseOptions}
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

export default RegisterStudent
