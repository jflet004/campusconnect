import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'

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
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <br />
        <input
          type='text'
          name='first_name'
          value={first_name}
          onChange={handleChange} />
        <br />
        <label>Last Name</label>
        <br />
        <input
          type='text'
          name='last_name'
          value={last_name}
          onChange={handleChange} />
        <br />
        <label>Email</label>
        <br />
        <input
          type='text'
          name='email'
          value={email}
          onChange={handleChange} />
        <br />
        <label>Address</label>
        <br />
        <input
          type='text'
          name='address'
          value={address}
          onChange={handleChange} />
        <br />
        <label>City</label>
        <br />
        <input
          type='text'
          name='city'
          value={city}
          onChange={handleChange} />
        <br />
        <label>State</label>
        <br />
        <input
          type='text'
          name='state'
          value={state}
          onChange={handleChange} />
        <br />
        <label>Zip Code</label>
        <br />
        <input
          type='text'
          name='zip_code'
          value={zip_code}
          onChange={handleChange} />
        <br />
        <label>Phone Number</label>
        <br />
        <input
          type='text'
          name='phone_number'
          value={phone_number}
          onChange={handleChange} />
        <br />
        <h3>Create Password</h3>
        <label>Password</label>
        <br />
        <input type='password'
          name='password'
          value={password}
          onChange={handleChange} />
        <br />
        <input type='submit' value='Sign up' />
        <br />
      </form>
        <br />
      {errors ? errors.map(error => <li className="error-msg" key={error}>{error}</li>) : null}
    </div>
  )
}

export default SignUp
