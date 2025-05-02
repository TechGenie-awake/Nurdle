import { useState } from "react";
import "./CalendarApp.css";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import {
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { calendars } from "./calendars";

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2024-11-18",
        end: "2024-11-18",
      },
    ],
    calendars,
    selectedDate: "2024-11-18",
    plugins: [eventsService],
    callbacks: {
      onDoubleClickDateTime: (date) => {
        console.log("Double clicked on date:", date);
        // You can add logic to open a modal for creating a new event here
      },
    },
  });

  return (
    <div className="calendar-app">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
