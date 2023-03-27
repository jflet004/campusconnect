import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UserContext = React.createContext()

function UserProvider({ children }) {

  const navigate = useNavigate()
  const location = useLocation()

  const [currentUser, setCurrentUser] = useState({})
  const [users, setUsers] = useState([])
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [courses, setCourses] = useState([])
  const [classrooms, setClassrooms] = useState([])
  const [enrollments, setEnrollments] = useState([])
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
          fetchClassrooms()
          fetchEnrollments()
          fetchTeacherAssignments()
        }
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setErrors(false)
  }, [location])

  const fetchStudents = () => {
    fetch("/students")
      .then(r => {
        if (r.ok) {
          r.json().then(students => {
            setStudents(students)
          })
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
          r.json().then(teachers => {
            setTeachers(teachers)
          })
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

  const fetchEnrollments = () => {
    fetch("/enrollments")
      .then(r => {
        if (r.ok) {
          r.json().then(enrollments => setEnrollments(enrollments))
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }

  const fetchTeacherAssignments = () => {
    fetch("/teacher_assignments")
      .then(r => {
        if (r.ok) {
          r.json().then(teacherAssignments => setTeacherAssignments(teacherAssignments))
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
          r.json().then(data => {
            setStudents([...students, data])
            setErrors(false)
          })
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
          r.json().then(data => {
            setCourses([...courses, data])
            setErrors(false)
          })
          navigate('/submit-successful')
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
          r.json().then(data => {
            setTeacherAssignments([...teacherAssignments, data])
            setErrors(false)
          })
          navigate("/assignment-success")
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }


  const enrollStudent = (student) => {
    fetch("/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(data => {
            setEnrollments([...enrollments, data])
            updateStudentEnrollment(student.course_id)
            setErrors(false)
          })
          navigate("/enrollment-success")
        } else {
          r.json().then(data => {
            setErrors(data.errors)
          })
        }
      })
  }

  const updateStudentEnrollment = (courseId) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          number_of_students_enrolled: course.number_of_students_enrolled + 1
        }
      }
      return course
    })
    setCourses(updatedCourses)
  }


  const updateUser = (id, updatedUser) => {
    fetch(`/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(data => {
            const updatedUsers = users.map(user => {
              if (user.id === id) {
                return data;
              }
              return user;
            });
            setUsers(updatedUsers);
            setErrors(false)
            navigate(`/users/${id}`)
          })
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
                return data
              }
              return student
            });
            setStudents(updatedStudents)
            setErrors(false)
            navigate(`/current-student/${id}`)
          });
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }

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
                return data
              }
              return teacher
            });
            setTeachers(updatedTeachers)
            setErrors(false)
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
                return data
              }
              return course
            });
            setCourses(updatedCourses)
            setErrors(false)
            navigate(`/current-course/${id}`)
          })
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      })
  }





  const updateCurrentUserStudentList = (newStudent) => {
    setCurrentUser(() => {
      if (!currentUser.students) {
        currentUser.students = [newStudent]
        currentUser.balance = 0
        return currentUser
      } else {
        currentUser.students.push(newStudent)
        return currentUser
      }
    })
  }



  const deleteCourse = (id) => {
    fetch(`/courses/${id}`, {
      method: "DELETE"
    })
      .then(r => {
        if (r.ok) {
          const updatedCourses = courses.filter(course => course.id !== id)
          setCourses(updatedCourses)
          setErrors(false)
        } else {
          r.json().then(data => setErrors(data.errors))
        }
      });
  };

  const dropStudent = (enrollmentId, studentId, courseId) => {
    fetch(`/enrollments/${enrollmentId}`, {
      method: "DELETE"
    })
      .then(r => {
        if (r.ok) {
          const updatedEnrollments = enrollments.filter(enrollment => enrollment.student_id !== studentId)
          setEnrollments(updatedEnrollments)
          updateStudentDrop(courseId)
          setErrors(false)
          navigate("/drop-successful")
        } else {
          r.json().then(data => {

            setErrors(data.errors)
          })
        }
      })
      .catch(() => alert("An error occurred while dropping the course."))
  }

  const updateStudentDrop = (courseId) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          number_of_students_enrolled: course.number_of_students_enrolled - 1,
        }
      }
      return course
    })
    setCourses(updatedCourses)
  }

  const releaseTeacher = (assignmentId, teacherId) => {
    fetch(`/teacher_assignments/${assignmentId}`, {
      method: "DELETE"
    })
      .then(r => {
        if (r.ok) {
          const updatedTeacherAssignments = teacherAssignments.filter(assignment => assignment.teacher_id !== teacherId)
          setTeacherAssignments(updatedTeacherAssignments)
          setErrors(false)
          navigate("/release-successful")
        } else {
          r.json().then(data => {
            setErrors(data.errors)
          })
        }
      })
      .catch(() => alert("An error occurred while dropping the course."))
  }


  const login = (user) => {
    setCurrentUser(user)
    fetchStudents()
    fetchTeachers()
    fetchCourses()
    fetchClassrooms()
    fetchEnrollments()
    fetchTeacherAssignments()
    setLoggedIn(true)
  }

  const logout = () => {
    setCurrentUser({})
    setStudents([])
    setTeachers([])
    setCourses([])
    setClassrooms([])
    setEnrollments([])
    setTeacherAssignments([])
    setLoggedIn(false)
    setErrors(false)
  }

  const signup = (user) => {
    setCurrentUser(user)
    fetchStudents()
    fetchTeachers()
    fetchCourses()
    fetchClassrooms()
    fetchEnrollments()
    fetchTeacherAssignments()
    setLoggedIn(true)
  }

  const displayErrors = () => (
    <div className='errors'>
      {Array.isArray(errors) ? (
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
      ) : (errors ? <li>{errors}</li> : null)}
    </div>
  )

  if (loading) return <h1 className='loading'>Loading</h1>

  return (
    <UserContext.Provider value={{ login, signup, logout, loggedIn, classrooms, updateCourse, currentUser, setCurrentUser, updateCurrentUserStudentList, updateUser, students, updateStudent, addStudent, enrollStudent, dropStudent, courses, setCourses, addCourse, deleteCourse, teachers, updateTeacher, assignTeacher, releaseTeacher, errors, setErrors, displayErrors, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }

