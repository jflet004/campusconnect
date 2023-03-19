import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UserContext = React.createContext()

function UserProvider({ children }) {

  const navigate = useNavigate()
  
  const [currentUser, setCurrentUser] = useState({})
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [classrooms, setClassrooms] = useState([])
  const [courses, setCourses] = useState([])
  const [teacherAssignments, setTeacherAssignments] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    fetch('/me')
      .then(r => r.json())
      .then(data => {
        setCurrentUser(data)
        if (data.error) {
          setLoggedIn(false)
        } else {
          setLoggedIn(true)
          fetchStudents()
          fetchTeachers()
          fetchCourses()
        }
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

  const fetchStudents = () => {
    fetch("/students")
    .then(r => {
      if (r.ok) {
        r.json().then(students => setStudents(students))
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
    .catch(error => alert(error))
    .finally(() => setLoading(false))
  }

  const fetchTeachers = () => {
    fetch("/teachers")
      .then(r => {
        if (r.ok) {
          r.json().then(teachers => setTeachers(teachers))
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }
  
  const fetchCourses = () => {
    fetch("/courses")
      .then(r => {
        if (r.ok) {
          r.json().then(courses => setCourses(courses))
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }

  const fetchClassrooms = () => {
    fetch("/classrooms")
      .then(r => {
        if (r.ok) {
          r.json().then(classrooms => setClassrooms(classrooms))
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }

  const addStudent = (student) => {
    fetch("/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(data =>setStudents([...students, data]))
          navigate('/successful-registration')
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }

  const addCourse = (course) => {
    fetch("/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(course)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(data =>setCourses([...courses, data]))
          navigate('/enrollment-success')
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }

  const assignTeacher = (teacher) => {
    fetch("/teacher_assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(teacher)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(data => setTeacherAssignments([...teacherAssignments, data]))
          navigate("/enrollment-success")
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }

  const updateStudent = (id, updatedStudent) => {
    fetch(`/students/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedStudent)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(data => {
            const updatedStudents = students.map(student => {
              if (student.id === id) {
                return data;
              }
              return student;
            });
            setStudents(updatedStudents);
            navigate(`/current-student/${id}`);
          });
        } else {
          r.json().then(data => setErrors(data.errors));
        }
      });
  };

  const updateTeacher = (id, updatedTeacher) => {
    fetch(`/teachers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTeacher)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(data => {
            const updatedTeachers = teachers.map(teacher => {
              if (teacher.id === id) {
                return data;
              }
              return teacher;
            });
            setTeachers(updatedTeachers);
            navigate(`/current-teacher/${id}`)
          });
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }

  const updateCourse = (id, updatedCourse) => {
    fetch(`/courses/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCourse)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(data => {
            const updatedCourses = courses.map(course => {
              if (course.id === id) {
                return data;
              }
              return course;
            });
            setCourses(updatedCourses);
            navigate(`/current-course/${id}`)
          });
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }
  
  const deleteCourse = (id) => {
    fetch(`/courses/${id}`, {
      method: "DELETE"
    })
      .then(r => {
        if (r.ok) {
          const updatedCourses = courses.filter(course => course.id !== id);
          setCourses(updatedCourses);
          navigate('/admin');
        } else {
          r.json().then(data => setErrors(data.errors));
        }
      });
  };
  
  

  const login = (user) => {
    setCurrentUser(user)
    fetchStudents()
    fetchTeachers()
    fetchCourses()
    setLoggedIn(true)
  }

  const logout = () => {
    setCurrentUser({})
    setStudents([])
    setTeachers([])
    setCourses([])
    setLoggedIn(false)
  }

  const signup = (user) => {
    setCurrentUser(user)
    fetchStudents()
    fetchTeachers()
    fetchCourses()
    setLoggedIn(true)
  }

  if (loading) return <h1>Loading</h1>

  return (
    <UserContext.Provider value={{ loggedIn, classrooms, updateCourse, currentUser, students, loggedIn, login, signup, logout, addStudent, errors, setErrors, updateStudent, updateTeacher, assignTeacher, teachers, courses, addCourse, deleteCourse, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }

