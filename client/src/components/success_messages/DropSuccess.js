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
    <div>
      <h2 style={{ color: "green" }}>The student has been dropped successfully!</h2>
    </div>
  )
}

export default DropSuccess
