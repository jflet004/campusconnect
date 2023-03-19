import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { UserProvider } from "./context/user"
import Home from './components/pages/Home';
import NavBar from './components/NavBar';
import About from './components/pages/About';
import Signup from './components/pages/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminPage from './components/pages/AdminPage';
import StudentList from './components/pages/StudentList';
import CourseList from './components/pages/CourseList';
import TeacherList from './components/pages/TeacherList';
import StudentDetails from './components/pages/StudentDetails';
import TeacherDetails from './components/pages/TeacherDetails';
import CourseDetails from './components/pages/CourseDetails';
import UserDetails from './components/pages/UserDetails';
import NewStudent from './components/pages/NewStudent';
import NewCourse from './components/pages/NewCourse';
import UpdateStudent from './components/pages/UpdateStudent';
import UpdateUser from './components/pages/UpdateUser';
import UpdateTeacher from './components/pages/UpdateTeacher';
import UpdateCourse from './components/pages/UpdateCourse';
import RegistrationSuccess from './components/success_messages/RegistrationSuccess';
import EnrollmentSuccess from './components/success_messages/EnrollmentSuccess';
import DropSuccess from './components/success_messages/DropSuccess';
import Calendar from './components/pages/Calendar';

import "./components/css/Footer.css"

function App() {


  const [classrooms, setClassrooms] = useState([])
  const [users, setUsers] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)


  useEffect(() => {
    fetch("/enrollments")
      .then(r => r.json())
      .then(enrollments => setEnrollments(enrollments))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetch("/teacher_assignments")
      .then(r => r.json())
      .then(assignments => setAssignments(assignments))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetch("/classrooms")
      .then(r => r.json())
      .then(data => setClassrooms(data))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

  const enrollStudent = courseEnrollment => {
    setEnrollments(newEnrollment => [...newEnrollment, courseEnrollment])
  }

  const dropStudent = studentId => {
    setEnrollments(enrollments.filter(enrollment => enrollment.student_id !== studentId))
  }

  const releaseTeacher = teacherId => {
    setAssignments(assignments.filter(assignment => assignment.teacher_id !== teacherId))
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
      <div className='page-container' >
        <NavBar />
        <Header />
        <div className='page-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/new-course" element={<NewCourse classrooms={classrooms} />} />
            <Route path="/register-students" element={<NewStudent  />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/current-students" element={<StudentList errors={errors} />} />
            <Route path="/current-teachers" element={<TeacherList errors={errors} />} />
            <Route path="/current-course/:id" element={<CourseDetails authErrors={errors} />} />
            <Route path="/current-student/:id" element={<StudentDetails enrollStudent={enrollStudent} dropStudent={dropStudent} />} />
            <Route path="/current-teacher/:id" element={<TeacherDetails releaseTeacher={releaseTeacher} />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/update-course/:id" element={<UpdateCourse classrooms={classrooms} />} />
            <Route path="/update-student/:id" element={<UpdateStudent />} />
            <Route path="/update-teacher/:id" element={<UpdateTeacher />} />
            <Route path="/update-user/:id" element={<UpdateUser updateUser={updateUser} />} />
            <Route path="/successful-registration" element={<RegistrationSuccess />} />
            <Route path="/enrollment-success" element={<EnrollmentSuccess />} />
            <Route path="/drop-successful" element={<DropSuccess />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
