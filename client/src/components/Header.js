import React from 'react'
import logo from '../web-icons/logo.svg'
import './css/Header.css'
import './css/Icons.css'

const Header = () => {
  return (
    <div className='header'>
      <img src={logo} className='logo' alt='logo' />
    </div>
  );
}

export default Header
