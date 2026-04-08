import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { changeMonth, changeYear } from "../features/calendar/calendarSlice";
import monthImages from "../constants/monthImages";
import "../styles/header.css"

const Header = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((s) => s.calendar);

  const monthName = current.format("MMMM");

  useEffect(() => {
    Object.values(monthImages).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      <div className="binding">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="ring" />
        ))}
      </div>

      <div className="header">
        <img
          src={monthImages[monthName]}
          alt={monthName}
          loading="eager"
        />

        <div className="date-overlay">
          <p>{current.format("YYYY")}</p>
          <h1>{current.format("MMMM")}</h1>
        </div>

        <div className="switchers">
          <button onClick={() => dispatch(changeMonth(-1))}>←M</button>
          <button onClick={() => dispatch(changeMonth(1))}>M→</button>
          <button onClick={() => dispatch(changeYear(-1))}>-Y</button>
          <button onClick={() => dispatch(changeYear(1))}>+Y</button>
        </div>
      </div>
    </>
  );
}

export default Header;