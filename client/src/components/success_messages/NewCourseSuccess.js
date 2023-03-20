import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NewCourseSuccess = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/calendar")
    }, 1000)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className='details-card'>
      <h2 style={{color: "#00968f"}}>New Course Created!</h2>
    </div>
  )
}

export default NewCourseSuccess
