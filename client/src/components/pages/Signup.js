import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/user'
import '../css/LoginForm.css'

const SignUp = () => {

  const { setCurrentUser } = useContext(UserContext)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone_number: "",
    city: "",
    state: "",
    zip_code: "",
    password: ""
  })
  const [errors, setErrors] = useState([])

  const { first_name, last_name, address, city, state, zip_code, email, password, phone_number } = formData

  const handleSubmit = e => {
    e.preventDefault()
    const user = {
      first_name,
      last_name,
      email,
      address,
      city,
      state,
      zip_code,
      phone_number,
      password
    }

    fetch('/signup', {
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
            navigate('/')
          })
        } else {
          r.json().then(data => {
            setErrors(data.errors)
          })
        }
      })
  }

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, "")
    const formattedPhoneNumber = phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3")

    return formattedPhoneNumber
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    let formattedValue = value;
    if (name === 'phone_number') {
      formattedValue = formatPhoneNumber(value);
    }
    setFormData({ ...formData, [name]: formattedValue });
  }

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type='text'
          name='first_name'
          value={first_name}
          onChange={handleChange} />
        <label>Last Name</label>
        <input
          type='text'
          name='last_name'
          value={last_name}
          onChange={handleChange} />
        <label>Email</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={handleChange} />
        <label>Address</label>
        <input
          type='text'
          name='address'
          value={address}
          onChange={handleChange} />
        <label>City</label>
        <input
          type='text'
          name='city'
          value={city}
          onChange={handleChange} />
        <label>State</label>
        <input
          type='text'
          name='state'
          value={state}
          onChange={handleChange} />
        <label>Zip Code</label>
        <input
          type='text'
          name='zip_code'
          value={zip_code}
          onChange={handleChange} />
        <label>Phone Number</label>
        <input
          type='text'
          name='phone_number'
          value={phone_number}
          onChange={handleChange} />
        <h3>Create Password</h3>
        <label>Password</label>
        <input type='password'
          name='password'
          value={password}
          onChange={handleChange} />
        <br />
        <input type='submit' value='Sign up' />
        <br />
      </form>
      <div className='errors'>
        {errors ? errors.map(error => <li key={error}>{error}</li>) : null}
      </div>
    </div>
  )
}

export default SignUp
