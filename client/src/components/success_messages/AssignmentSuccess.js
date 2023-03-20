import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AssignmentSuccess = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(-1)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className='details-card'>
      <h2 style={{color: "#00968f"}}>Teacher assignment has been successful!</h2>
    </div>
  )
}

export default AssignmentSuccess