import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { changeMonth, changeYear } from "../features/calendar/calendarSlice";
import "../styles/header.css"


const monthImages = {
  January: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=1200&q=80&auto=format",
  February: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80&auto=format",
  March: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80&auto=format",
  April: "https://images.unsplash.com/photo-1493815793585-d94ccbc86df8?w=1200&q=80&auto=format",
  May: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80&auto=format",
  June: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format",
  July: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format",
  August: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format",
  September: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80&auto=format",
  October: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=1200&q=80&auto=format",
  November: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=80&auto=format",
  December: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1200&q=80&auto=format"
};

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