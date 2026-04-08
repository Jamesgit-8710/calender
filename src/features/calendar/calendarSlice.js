import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const savedNotes = JSON.parse(localStorage.getItem("notes")) || {};

const initialState = {
  current: dayjs(),
  startDate: dayjs(),
  endDate: null,
  notes: savedNotes, // ✅ now object
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
      state.endDate = null;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },

    // ✅ notes per date
    setNotes: (state, action) => {
      const { date, text } = action.payload;
      if (text) {
        state.notes[date] = text;
      } else {
        delete state.notes[date]; // remove if empty
      }
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },

    changeMonth: (state, action) => {
      state.current = state.current.add(action.payload, "month");
    },
    changeYear: (state, action) => {
      state.current = state.current.add(action.payload, "year");
    },
  },
});

export const {
  setStartDate,
  setEndDate,
  setNotes,
  changeMonth,
  changeYear
} = calendarSlice.actions;

export default calendarSlice.reducer;