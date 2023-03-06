import './App.css';
import React, { useState, useEffect } from 'react'
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
import RegistrationSuccess from './components/RegistrationSuccess';
import EnrollmentSuccess from './components/EnrollmentSuccess';
import ProgramInfo from './components/ProgramInfo';
import DropSuccessful from './components/DropSuccessful';
import UpdateUser from './components/UpdateUser';

function App() {

  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [users, setUsers] = useState([])
  const [enrollments, setEnrollment] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/students")
      .then(r => r.json())
      .then(students => setStudents(students))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetch("/courses")
      .then(r => r.json())
      .then(courses => setCourses(courses))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetch("/enrollments")
      .then(r => r.json())
      .then(enrollments => setEnrollment(enrollments))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

  const addStudent = registeredStudents => setStudents(newStudent => [...newStudent, registeredStudents])
  const enrollStudent = courseEnrollment => setEnrollment(newEnrollment => [...newEnrollment, courseEnrollment])
  const dropStudent = selectedCourse => setEnrollment(enrollments => enrollments.filter(enrollment => enrollment.id !== selectedCourse.id))
  const updateStudent = updatedStudent => {
    setStudents(prevStudents => {
      return prevStudents.map(student => {
        if (student.id === updatedStudent.id) {
          return updatedStudent
        } else {
          return student
        }
      })
    })
  }
  const updateUser = (updatedUser) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        } else {
          return user;
        }
      });
    });
  };

  if (loading) return <h2>Loading</h2>

  return (
    <UserProvider>
      <div className="App">
        <NavBar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs courses={courses}/>} />
          <Route path="/programs/:id" element={<ProgramInfo />} />
          <Route path="/events" element={<Events />} />
          <Route path="/current-students" element={<StudentList students={students} />} />
          <Route path="/current-student/:id" element={<StudentInfo enrollStudent={enrollStudent} dropStudent={dropStudent} />} />
          <Route path="/update-student/:id" element={<UpdateStudent updateStudent={updateStudent} />} />
          <Route path="/current-user/:id" element={<UserInfo />} />
          <Route path="/update-user/:id" element={<UpdateUser updateUser={updateUser} />} />
          <Route path="/register-students" element={<RegisterStudent addStudent={addStudent} />} />
          <Route path="/successful-registration" element={<RegistrationSuccess />} />
          <Route path="/enrollment-success" element={<EnrollmentSuccess />} />
          <Route path="/drop-successful" element={<DropSuccessful />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
