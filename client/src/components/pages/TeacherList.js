import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';

const TeacherList = ({ teachers, errors }) => {

  const { currentUser } = useContext(UserContext)
  
  const navigate = useNavigate()

  const [filters, setFilters] = useState({
    name: '',
    email: '',
    phone_number: ''
  });

  const filteredTeachers = teachers.filter(teacher => {
    return (
      (teacher.first_name.toLowerCase().includes(filters.name.toLowerCase()) ||
        teacher.last_name.toLowerCase().includes(filters.name.toLowerCase())) &&
      teacher.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      teacher.phone_number.toLowerCase().includes(filters.phone_number.toLowerCase())
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
      <br/>
      {errors ? <li>{errors}</li> :
      <>
      <h1>Teacher List</h1>
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
                value={filters.phone_number}
                onChange={e => handleFilterChange('phone_number', e.target.value)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {
            filteredTeachers.map(teacher => (
              <tr key={teacher.id}>
                <td>{currentUser.admin ? <button onClick={() => { navigate(`/current-teacher/${teacher.id}`) }}>🔎</button> : null} {teacher.first_name} {teacher.last_name}</td>
                <td>{teacher.created_at}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone_number}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </>}
    </div>
  )
}

export default TeacherList
