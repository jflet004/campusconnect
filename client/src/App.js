import React from 'react'
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
import AssignmentSuccess from './components/success_messages/AssignmentSuccess';
import ReleaseSuccess from './components/success_messages/ReleaseSuccess';
import Calendar from './components/pages/Calendar';
import NewCourseSuccess from './components/success_messages/NewCourseSuccess';
import backgroundImg from './web-icons/background.png'
import "./components/css/App.css"
import "./components/css/Footer.css"

function App() {

  return (
    <UserProvider>
      <div className='page-container' >
        <NavBar />
        <Header />
        <div className='backgroundImg' />
          <img src={backgroundImg} alt="background" className='backgroundImg' />
        <div className='page-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/new-course" element={<NewCourse />} />
            <Route path="/register-students" element={<NewStudent  />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/current-students" element={<StudentList />} />
            <Route path="/current-teachers" element={<TeacherList />} />
            <Route path="/current-course/:id" element={<CourseDetails />} />
            <Route path="/current-student/:id" element={<StudentDetails />} />
            <Route path="/current-teacher/:id" element={<TeacherDetails />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/update-course/:id" element={<UpdateCourse />} />
            <Route path="/update-student/:id" element={<UpdateStudent />} />
            <Route path="/update-teacher/:id" element={<UpdateTeacher />} />
            <Route path="/update-user/:id" element={<UpdateUser />} />
            <Route path="/successful-registration" element={<RegistrationSuccess />} />
            <Route path="/enrollment-success" element={<EnrollmentSuccess />} />
            <Route path="/assignment-success" element={<AssignmentSuccess />} />
            <Route path="/drop-successful" element={<DropSuccess />} />
            <Route path="/release-successful" element={<ReleaseSuccess />} />
            <Route path="/submit-successful" element={<NewCourseSuccess />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
