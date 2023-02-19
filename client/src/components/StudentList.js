import React from 'react'

const StudentList = ({ students }) => {

  console.log(students)

  return (
    <div>
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Interest</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.first_name} {student.last_name}</td>
              <td>{student.age}</td>
              <td>{student.interest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentList
