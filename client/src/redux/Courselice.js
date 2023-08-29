// courseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  course: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseData: (state, action) => {
      state.id = action.payload.id;
      state.course = null;
      state.course = action.payload.course;
    },
  },
});

export const { setCourseData } = courseSlice.actions;
export default courseSlice.reducer;
