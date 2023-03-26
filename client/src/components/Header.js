import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../web-icons/logo.svg'
import './css/Header.css'
import './css/Icons.css'

const Header = () => {

  const navigate = useNavigate()

  const clickImage = () => {
    navigate("/secret")
  }

  return (
    <div className='header'>
      <img src={logo} className='logo' alt='logo' onClick={clickImage} />
    </div>
  );
}

export default Header
