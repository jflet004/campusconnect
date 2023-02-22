import './App.css';
import React, { useState, useEffect, useContext } from 'react'
import { Routes, Route } from "react-router-dom"
import { UserProvider } from "./context/user"
import Home from './components/Home';
import StudentList from './components/StudentList';
import NavBar from './components/NavBar';
import RegisterStudent from './components/RegisterStudent';
import Signup from './components/Signup';
import AdminPage from './components/AdminPage';
import About from './components/About';
import Programs from './components/Programs';
import Events from './components/Events';
import StudentInfo from './components/StudentInfo';
import UserInfo from './components/UserInfo';
import UpdateStudent from './components/UpdateStudent';
import Header from './components/Header';

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

  const addStudent = registeredStudents => setStudents(newStudent => [...newStudent, registeredStudents])
  const updateStudent = (updatedStudent) => {
    setStudents((prevStudents) => {
      return prevStudents.map((student) => {
        if (student.id === updatedStudent.id) {
          return updatedStudent;
        } else {
          return student;
        }
      });
    });
  };

  return (
    <UserProvider>
      <div className="App">
        <NavBar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/current-students" element={<StudentList students={students} />} />
          <Route path="/current-student/:id" element={<StudentInfo />} />
          <Route path="/update-student/:id" element={<UpdateStudent updateStudent={updateStudent} />} />
          <Route path="/current-user/:id" element={<UserInfo />} />
          <Route path="/register-students" element={<RegisterStudent addStudent={addStudent} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
