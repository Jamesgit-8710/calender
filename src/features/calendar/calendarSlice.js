import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const savedNotes = localStorage.getItem("notes") || "";

const initialState = {
  current: dayjs(),
  startDate: null,
  endDate: null,
  notes: savedNotes,
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
    setNotes: (state, action) => {
      state.notes = action.payload;
      localStorage.setItem("notes", action.payload);
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