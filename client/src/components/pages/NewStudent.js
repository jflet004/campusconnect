import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/user'
import '../css/FormStudent.css'

const NewStudent = () => {

  const { currentUser, courses, addStudent, updateCurrentUserStudentList, loggedIn, displayErrors } = useContext(UserContext)

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    interest: "",
    user_id: currentUser.id
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "gender") {
      setFormData({ ...formData, gender: e.target.value })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    addStudent(formData)
    updateCurrentUserStudentList(formData)
  }

  const courseOptions = courses.map((course) => (
    <option key={course.id} value={course.title}>{course.title}: {course.start_time}-{course.end_time}</option>
  ))

  if (loggedIn) {
    return (
      <div className='student-form'>
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
          <label> Male</label>
          <br />
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
          />
          <label> Female</label>
          <br />
          <input
            type="radio"
            name="gender"
            value="Non-binary/non-conforming"
            onChange={handleChange}
          />
          <label> Non-binary/non-conforming</label>
          <br />
          <input
            type="radio"
            name="gender"
            value="Prefer not to respond"
            onChange={handleChange}
          />
          <label> Prefer not to respond</label>
          <br />
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
        {displayErrors()}
      </div>
    )
  } else {
    return (
      <h1>Log In</h1>
    )
  }
}

export default NewStudent
