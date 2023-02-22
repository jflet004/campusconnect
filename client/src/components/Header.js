import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user';

const Header = () => {
  
  const { currentUser } = useContext(UserContext)

  const [dailyQuote, setDailyQuote] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(r => r.json())
      .then(quotes => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setDailyQuote(randomQuote);
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

if (loading) return <h1>Loading</h1>

return (
  <div>
    {!currentUser || currentUser.error ? (
      <h3>Welcome. Please login or create an account</h3>
    ) : (
      <div>
        <h3>Welcome {currentUser.first_name}</h3>
        {currentUser.admin && (
          <p><em>{dailyQuote.text}</em></p>
        )}
      </div>
    )}
  </div>
);

}

export default Header
