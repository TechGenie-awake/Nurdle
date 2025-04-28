import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Set up the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Board Meeting",
      start: new Date(2025, 3, 21, 10, 0), // April 21, 2025, 10:00 AM
      end: new Date(2025, 3, 21, 12, 0), // April 21, 2025, 12:00 PM
    },
    {
      title: "Team Lunch",
      start: new Date(2025, 3, 22, 12, 0), // April 22, 2025, 12:00 PM
      end: new Date(2025, 3, 22, 13, 0), // April 22, 2025, 1:00 PM
    },
  ]);

  const handleSelectEvent = (event) => {
    alert(event.title);
  };

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
      />
    </div>
  );
};

export default TaskCalendar;
