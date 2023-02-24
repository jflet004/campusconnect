import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const navigate = useNavigate()
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

  const handleSubmit = e => {
    e.preventDefault()
    const user = {
      email,
      password
    }
    fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(user => {
            setCurrentUser(user)
            user.admin ? navigate("/admin") : navigate("/")
            setFormData({
              email: "",
              password: ""
            })
          })
        } else {
          r.json().then(data => {
            setErrors(data.errors)
          })
        }
      })
  }


  const studentList = currentUser && currentUser.students ? (
    <>
      {currentUser.students.map(student => (
        <li key={student.id}>
          {student.first_name} {student.last_name}
        </li>
      ))}
      <h4>Balance: ${currentUser.balance}</h4>
    </>
  ) : (
    <span>
      <Link to="/register-students">Click here</Link> to register a student
    </span>
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className='form'>
      {!currentUser || currentUser.error ?
        <>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <br />
            <input
              type='email'
              name='email'
              value={email}
              onChange={handleChange} />
            <br />
            <label>Password</label>
            <br />
            <input type='password'
              name='password'
              value={password}
              onChange={handleChange} />
            <br />
            <input className="login-btn" type='submit' value='Login' />
            <br />
          </form>
        </> :
        <>
          <h4>Students Enrolled</h4>
          {studentList}
        </>
      }
      {errors ? errors : null}
    </div>
  )
}

export default Home