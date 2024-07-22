import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../Dashbord/greeting.css";

const localizer = momentLocalizer(moment);

const Greeting = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const events = [
    {
      title: 'Meeting',
      start: new Date(),
      end: new Date(moment().add(1, 'hour').toDate()),
    },
  ];

  return (
    <div className="greeting">
      <div className="greeting-header">
        <h2>{getGreeting()} :-)</h2>
        <div className="calendar-container">
          <button className="calendar-icon" onClick={toggleCalendar}>
            <FaCalendarAlt />
          </button>
          {isCalendarOpen && (
            <div className="calendar-popup">
              <h3>Today's Date</h3>
              <p>{`${month} ${day}, ${year}`}</p>
              <div style={{ height: 400 }}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <p>Here's what's happening with your Show Timez today.</p>
    </div>
  );
};

export default Greeting;
