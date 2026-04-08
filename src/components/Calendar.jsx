import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate, setEndDate } from "../features/calendar/calendarSlice";
import "../styles/calendar.css";

const Calendar = () => {
  const dispatch = useDispatch();
  const { startDate, endDate, current, notes } = useSelector((s) => s.calendar);

  const today = dayjs();

  const startOfMonth = current.startOf("month");
  const endOfMonth = current.endOf("month");

  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const prevMonth = startOfMonth.subtract(1, "month");
  const prevDays = prevMonth.daysInMonth();

  const dates = [];

  for (let i = startDay - 1; i >= 0; i--) {
    dates.push({
      date: prevMonth.date(prevDays - i),
      current: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    dates.push({
      date: startOfMonth.date(i),
      current: true,
    });
  }

  let nextDay = 1;
  while (dates.length % 7 !== 0) {
    dates.push({
      date: endOfMonth.add(nextDay, "day"),
      current: false,
    });
    nextDay++;
  }

  const handleClick = (d) => {
    if (!startDate || endDate) {
      dispatch(setStartDate(d));
    } else {
      if (d.isBefore(startDate)) {
        dispatch(setStartDate(d));
      } else {
        dispatch(setEndDate(d));
      }
    }
  };

  const isInRange = (d) => {
    if (!startDate || !endDate) return false;
    return d.isAfter(startDate) && d.isBefore(endDate);
  };

  return (
    <div className="calendar">
      <div className="weekdays">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
          <div
            key={d}
            className={d === "SAT" || d === "SUN" ? "weekend" : ""}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid">
        {dates.map((d, i) => {
          const isSelected =
            startDate && d.date.isSame(startDate, "day");

          const isEnd =
            endDate && d.date.isSame(endDate, "day");

          const isToday = d.date.isSame(today, "day");

          const key = d.date.format("YYYY-MM-DD");
          const hasNote = notes[key];

          // ✅ weekend logic
          const dayIndex = d.date.day(); // 0 = Sun, 6 = Sat
          const isWeekend = (dayIndex === 5 || dayIndex === 6) && d.current;

          return (
            <div
              key={i}
              className={`day 
                ${!d.current ? "muted" : ""}
                ${isSelected ? "selected" : ""}
                ${isEnd ? "end" : ""}
                ${isInRange(d.date) ? "range" : ""}
                ${!startDate && isToday ? "today-active" : ""}
                ${startDate && isToday && !d.date.isSame(startDate, "day") ? "today-border" : ""}
                ${isWeekend ? "weekend" : ""}
              `}
              onClick={() => handleClick(d.date)}
            >
              {d.date.date()}

              {/* dot marker */}
              {hasNote && <span className="dot" />}

              {/* tooltip */}
              {hasNote && (
                <div className="tooltip">
                  {notes[key]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;