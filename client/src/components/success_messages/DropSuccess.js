import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DropSuccess = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(-1)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className='details-card'>
      <h2 style={{ color: "#00968f" }}>The student has been dropped successfully!</h2>
    </div>
  )
}

export default DropSuccess
