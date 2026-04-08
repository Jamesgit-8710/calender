import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../features/calendar/calendarSlice";
import "../styles/notes.css"


const Notes = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.calendar.notes);
    return (
        <div className="notes">
            <h3>Notes</h3>
            <textarea
                value={notes}
                onChange={(e) => dispatch(setNotes(e.target.value))}
            />
        </div>
    )
}

export default Notes
