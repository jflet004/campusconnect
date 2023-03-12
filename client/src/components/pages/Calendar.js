import React, { useEffect, useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

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
          daysOfWeek: course.days_of_week,
          startRecur: course.start_recur
        }));
        setEvents(events);
      })
      .catch(error => console.error(error));
  }, []);

  const handleEventClick = (info) => {
    const popover = new bootstrap.Popover(info.el, {
      title: info.event.title,
      content: `Start: ${formatDate(info.event.start, {timeZone: 'UTC'})}<br>End: ${formatDate(info.event.end, {timeZone: 'UTC'})}`,
      html: true
    });
    popover.show();
  }

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
        eventRender={handleEventClick}
      />

    </div>
  )
}

export default Calendar
