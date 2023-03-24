import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/user'
import '../css/LoginForm.css'

const Home = () => {
  const { currentUser, login, loggedIn } = useContext(UserContext)

  const navigate = useNavigate()

  const [errors, setErrors] = useState(false)
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
            login(user)
            navigate("/")
            setFormData({
              email: "",
              password: ""
            })
            setErrors(false)
          })
        } else {
          r.json().then(data => {
            setErrors(data.errors)
          })
        }
      })
  }


  const studentList = currentUser.students && currentUser.students.length > 0 ? (
    <div>
      {currentUser.students.map(student => (
        <li key={student.id}>
          {student.first_name} {student.last_name}
        </li>
      ))}
      <h4>Balance: ${currentUser.balance}</h4>
    </div>
  ) : (
    <span>
      <Link to="/register-students">Click here</Link> to register a student
    </span>
  )

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const userAgenda = currentUser.admin && (
    <div className='details_card'>
      <h2>Welcome {currentUser.first_name} {currentUser.last_name}</h2>
      <h3>Agenda for {currentDate}</h3>
      <ul>
        <li>Review and respond to emails and phone messages.</li>
        <li>Attend morning staff meeting to discuss any important updates or issues.</li>
        <li>Conduct classroom observations and provide feedback to teachers.</li>
        <li>Meet with parents and students to address any concerns or issues.</li>
        <li>Review and respond to any additional emails or messages before the end of the day.</li>
        <li>Close out the day by reviewing and prioritizing tasks for the following day.</li>
      </ul>
    </div>
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div>
      {!loggedIn ?
        <div>
          <div className='login-form' >
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={handleChange} />
              <br />
              <label>Password</label>
              <input type='password'
                name='password'
                value={password}
                onChange={handleChange} />
              <br />
              <input type='submit' value='Login' />
              <br />
            </form>
          </div>
          <br />
          <div className='details-card'>
            <p style={{ textAlign: "center", color: "#666666" }}>Welcome to CampusConnect!
              <p>
                If you already have an account, please log in to access your personalized experience. If you don't have an account yet, don't worry - creating one is easy! Simply click on the <strong>'Create Account'</strong> button above and follow the steps.</p>
            </p>
          </div>
        </div> :
        <div className='details-card'>
          {!currentUser.admin && (
            <div>
              <h4>Students Enrolled</h4>
              {studentList}
            </div>
          )}
          {userAgenda}
        </div>
      }
      <div className='errors'>
        {Array.isArray(errors) ? (
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
        ) : (errors ? <li>{errors}</li> : null)}
      </div>
    </div>
  )
}

export default Home