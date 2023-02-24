import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const EnrollmentSuccess = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(-1)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div>
      <h2 style={{color: "green"}}>The enrollment has been successful!</h2>
    </div>
  )
}

export default EnrollmentSuccess
