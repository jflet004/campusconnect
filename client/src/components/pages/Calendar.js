import React, { useEffect, useState } from 'react'
import { formatDate } from '@fullcalendar/core'
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
          // id: course.id,
          title: course.title,
          startTime: course.start_time,
          endTime: course.end_time,
          location: course.location,
          capacity: course.capacity,
          students_enrolled: course.students_enrolled,
          price: course.price,
          // teacher_id: course.teacher_id,
          daysOfWeek: course.days_of_week,
          startRecur: course.start_recur,
          allDay: false
        }));
        setEvents(events);
      })
      .catch(error => console.error(error));
  }, []);

  const handleEventClick = (info) => {
    console.log(info)
  }

  console.log(events)

  return (
    <div>

      <img src='web-icons/calendar.svg' width="40px" className="inline" />
      <h1 className='title'>Calendar</h1>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}

        eventClick={handleEventClick}

      />

    </div>
  )
}

export default Calendar
