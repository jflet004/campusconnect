import React, { useState, useEffect } from 'react'

const UserContext = React.createContext()

function UserProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/me')
      .then(r => r.json())
      .then(data => {
        setCurrentUser(data)
        console.log("Current User:", data)
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <h1>Loading</h1>

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }

