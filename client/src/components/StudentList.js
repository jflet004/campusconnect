import React from 'react'

const StudentList = ({ students }) => {

  console.log(students.map(student => student.user.first_name))

  

  return (
    <div>
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Interest</th>
            <th>Parent/Guardian</th>
            <th>Contact Email</th>
            <th>Contact Phone #</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.first_name} {student.last_name}</td>
              <td>{student.age}</td>
              <td>{student.interest}</td>
              <td>{student.user.first_name} {student.user.last_name}</td>
              <td>{student.user.email}</td>
              <td>{student.user.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentList
