import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'

const Home = () => {
  const { setCurrentUser } = useContext(UserContext)
  
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
            navigate('/current-students')
          })
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <br/>
        <input
          type='email'
          name='email'
          value={email}
          onChange={handleChange} />
          <br/>
        <label>Password</label>
          <br/>
        <input type='password'
          name='password'
          value={password}
          onChange={handleChange} />
          <br/>
        <input type='submit' value='Login' />
          <br/>
      </form>
      {errors ? errors : null}
    </div>
  )
}

export default Home