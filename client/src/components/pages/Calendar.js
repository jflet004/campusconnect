import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '../css/Icons.css'
const Calendar = () => {

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetch('/courses')
      .then(r => r.json())
      .then(courses => {
        const events = courses.map(course => ({
          title: course.title,
          startTime: course.start_time,
          endTime: course.end_time,
          location: course.location,
          capacity: course.capacity,
          students_enrolled: course.students_enrolled,
          price: course.price,
          daysOfWeek: course.days_of_week,
          startRecur: course.start_recur,
          allDay: false
        }));
        setEvents(events);
        setLoading(false)
      })
      .catch(error => alert(error));
  }, []);


  if (loading) return <h1>Loading</h1>

  return (
    <div className='full-calendar'>

      <img src='web-icons/calendar.svg' width="30px" className="inline" alt='icon' />
      <h1 className='title'>Calendar</h1>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
          contentHeight: "100px"
        }}
        events={events}
      />
    </div>
  )
}

export default Calendar
