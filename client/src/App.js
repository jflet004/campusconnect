import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { UserProvider } from "./context/user"
import Home from './components/Home';
import StudentList from './components/StudentList';
import NavBar from './components/NavBar';

function App() {

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/students")
    .then(r => r.json())
    .then(students => setStudents(students))
    .catch(error => alert(error))
    .finally(() => setLoading(false))
  }, [])


  return (
    <UserProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/current-students" element={<StudentList students={students} />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
