import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../features/calendar/calendarSlice";
import "../styles/notes.css";

const Notes = () => {
    const dispatch = useDispatch();
    const { startDate, notes } = useSelector((state) => state.calendar);

    const selectedKey = startDate.format("YYYY-MM-DD");
    const value = notes[selectedKey] || "";

    return (
        <div className="notes">
            <h3>Notes</h3>
            <textarea
                value={value}
                onChange={(e) =>
                    dispatch(
                        setNotes({
                            date: selectedKey,
                            text: e.target.value,
                        })
                    )
                }
            />
        </div>
    );
};

export default Notes;