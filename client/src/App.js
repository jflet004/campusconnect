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
import AddProgram from './components/AddProgram';
import TeacherList from './components/TeacherList';
import TeacherInfo from './components/TeacherInfo';
import UpdateTeacher from './components/UpdateTeacher';
import UpdateCourse from './components/UpdateCourse';
import Calendar from './components/Calendar';

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
  
  
  const enrollStudent = courseEnrollment => {
    setEnrollments(newEnrollment => [...newEnrollment, courseEnrollment])
  }

  const dropStudent = studentId => {
    setEnrollments(enrollments => {
      enrollments.filter(enrollment => enrollment.student_id !== studentId)
    })
  }
  const assignTeacher = courseAssignment => {
    setAssignments(newAssignment => [...newAssignment, courseAssignment])
  }

  const removeTeacher = teacherId => {
    setAssignments(assignments => {
      assignments.filter(assignment => assignment.teacher_id !== teacherId)
    })
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
      <div className="App">
        <NavBar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Programs courses={courses} />} />
          <Route path="/new-course" element={<AddProgram addCourse={addCourse} teachers={teachers} classrooms={classrooms} />} />
          <Route path="/current-course/:id" element={<ProgramInfo />} />
          <Route path="/events" element={<Events />} />
          <Route path="/current-students" element={<StudentList students={students} />} />
          <Route path="/current-teachers" element={<TeacherList teachers={teachers} />} />
          <Route path="/current-student/:id" element={<StudentInfo enrollStudent={enrollStudent} dropStudent={dropStudent} />} />
          <Route path="/current-teacher/:id" element={<TeacherInfo assignTeacher={assignTeacher} removeTeacher={removeTeacher} />} />
          <Route path="/update-student/:id" element={<UpdateStudent updateStudent={updateStudent} />} />
          <Route path="/update-teacher/:id" element={<UpdateTeacher updateTeacher={updateTeacher} />} />
          <Route path="/update-course/:id" element={<UpdateCourse updateCourse={updateCourse} teachers={teachers} classrooms={classrooms} />} />
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
