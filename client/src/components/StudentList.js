import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const StudentList = ({ students }) => {

  const navigate = useNavigate()
  
  const [filters, setFilters] = useState({
    name: '',
    age: '',
    interest: '',
    created_at: '',
    parent_guardian: '',
    email: '',
    phone: ''
  });

  const filteredStudents = students.filter(student => {
    return (
      (student.first_name.toLowerCase().includes(filters.name.toLowerCase()) ||
        student.last_name.toLowerCase().includes(filters.name.toLowerCase())) &&
      String(student.age).toLowerCase().includes(filters.age.toLowerCase()) &&
      student.interest.toLowerCase().includes(filters.interest.toLowerCase()) &&
      student.created_at.toLowerCase().includes(filters.created_at.toLowerCase()) &&
      (student.user.first_name.toLowerCase().includes(filters.parent_guardian.toLowerCase()) ||
        student.user.last_name.toLowerCase().includes(filters.parent_guardian.toLowerCase())) &&
      student.user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      student.user.phone_number.toLowerCase().includes(filters.phone.toLowerCase())
    );
  });

  
  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };
  
  return (
    <div >
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>
              <label>Name</label>
              <br />
              <input
                type="text"
                value={filters.name}
                onChange={e => handleFilterChange('name', e.target.value)}
              />
            </th>
            <th>
              <label>Age</label>
              <br />
              <input
                type="text"
                value={filters.age}
                onChange={e => handleFilterChange('age', e.target.value)}
              />
            </th>
            <th>
              <label>Interest</label>
              <br />
              <input
                type="text"
                value={filters.interest}
                onChange={e => handleFilterChange('interest', e.target.value)}
              />
            </th>
            <th>
              <label>Student Since</label>
              <br />
              <input
                type="text"
                value={filters.created_at}
                onChange={e => handleFilterChange('created_at', e.target.value)}
              />
            </th>
            <th>
              <label>Parent/Guardian</label>
              <br />
              <input
                type="text"
                value={filters.parent_guardian}
                onChange={e => handleFilterChange('parent_guardian', e.target.value)}
              />
            </th>
            <th>
              <label>Email</label>
              <br />
              <input
                type="text"
                value={filters.email}
                onChange={e => handleFilterChange('email', e.target.value)}
              />
            </th>
            <th>
              <label>Phone #</label>
              <br />
              <input
                type="text"
                value={filters.phone}
                onChange={e => handleFilterChange('phone', e.target.value)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {
          filteredStudents.map(student => (
            <tr key={student.id}>
              <td><button onClick={() => {navigate(`/student/${student.id}`)}}>🔎</button> {student.first_name} {student.last_name}</td>
              <td>{student.age}</td>
              <td>{student.interest}</td>
              <td>{student.created_at}</td>
              <td><button onClick={() => {navigate(`/users/${student.user.id}`)}}>🔎</button> {student.user.first_name} {student.user.last_name}</td>
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
