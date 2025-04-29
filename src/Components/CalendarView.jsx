import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { getCalendarTasks } from "../services/CalendarService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const localizer = momentLocalizer(moment);

export default function CalendarView() {
  const [events, setEvents] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      const tasks = await getCalendarTasks(user.uid);
      setEvents(tasks);
    };
    fetchTasks();
  }, [user]);

  return (
    <div className="p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
