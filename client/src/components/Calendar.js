import React, { useEffect, useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const Calendar = () => {

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/courses')
      .then(r => r.json())
      .then(courses => {
        const events = courses.map(course => ({
          id: course.id,
          title: course.title,
          start: course.start_time,
          end: course.end_time,
          location: course.location,
          capacity: course.capacity,
          students_enrolled: course.students_enrolled,
          price: course.price,
          teacher_id: course.teacher_id,
          daysOfWeek: course.days_of_week
        }));
        setEvents(events);
      })
      .catch(error => console.error(error));
  }, []);


  return (
    <div className='calendar'>
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
      />

    </div>
  )
}

export default Calendar
