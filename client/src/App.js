import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { UserProvider } from "./context/user"
import Home from './components/pages/Home';
import NavBar from './components/NavBar';
import About from './components/pages/About';
import Events from './components/pages/Events';
import Signup from './components/pages/Signup';
import Header from './components/Header';
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

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'

function App() {

  const [students, setStudents] = useState([])
  const [classrooms, setClassrooms] = useState([])
  const [teachers, setTeachers] = useState([])
  const [courses, setCourses] = useState([])
  const [users, setUsers] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/students")
      .then(r => r.json())
      .then(students => setStudents(students))
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetch("/teachers")
      .then(r => r.json())
      .then(teachers => setTeachers(teachers))
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

  const addStudent = registeredStudents => {
    setStudents(newStudent => [...newStudent, registeredStudents])
  }

  const addCourse = currentCourses => {
    setCourses(newCourse => [...newCourse, currentCourses])
  }

  const deleteCourse = courseId => {
    setCourses(courses.filter(course => course.id !== courseId))
  }

  const enrollStudent = courseEnrollment => {
    setEnrollments(newEnrollment => [...newEnrollment, courseEnrollment])
  }

  const dropStudent = studentId => {
    setEnrollments(enrollments.filter(enrollment => enrollment.student_id !== studentId))
  }

  const assignTeacher = courseAssignment => {
    setAssignments(newAssignment => [...newAssignment, courseAssignment])
  }

  const releaseTeacher = teacherId => {
    setAssignments(assignments.filter(assignment => assignment.teacher_id !== teacherId))
  }

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

  const updateTeacher = updatedTeacher => {
    setTeachers(prevTeacher => {
      return prevTeacher.map(teacher => {
        if (teacher.id === updatedTeacher.id) {
          return updatedTeacher
        } else {
          return teacher
        }
      })
    })
  }

  const updateCourse = updatedCourse => {
    setCourses(prevCourse => {
      return prevCourse.map(course => {
        if (course.id === updatedCourse.id) {
          return updatedCourse
        } else {
          return course
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
      <div >
        <NavBar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<CourseList courses={courses} deleteCourse={deleteCourse} />} />
          <Route path="/new-course" element={<NewCourse addCourse={addCourse} teachers={teachers} classrooms={classrooms} />} />
          <Route path="/current-course/:id" element={<CourseDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/current-students" element={<StudentList students={students} />} />
          <Route path="/current-teachers" element={<TeacherList teachers={teachers} />} />
          <Route path="/student/:id" element={<StudentDetails enrollStudent={enrollStudent} dropStudent={dropStudent} />} />
          <Route path="/current-teacher/:id" element={<TeacherDetails assignTeacher={assignTeacher} releaseTeacher={releaseTeacher} />} />
          <Route path="/update-student/:id" element={<UpdateStudent updateStudent={updateStudent} />} />
          <Route path="/update-teacher/:id" element={<UpdateTeacher updateTeacher={updateTeacher} />} />
          <Route path="/update-course/:id" element={<UpdateCourse updateCourse={updateCourse} teachers={teachers} classrooms={classrooms} />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/update-user/:id" element={<UpdateUser updateUser={updateUser} />} />
          <Route path="/register-students" element={<NewStudent addStudent={addStudent} />} />
          <Route path="/successful-registration" element={<RegistrationSuccess />} />
          <Route path="/enrollment-success" element={<EnrollmentSuccess />} />
          <Route path="/drop-successful" element={<DropSuccess />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
