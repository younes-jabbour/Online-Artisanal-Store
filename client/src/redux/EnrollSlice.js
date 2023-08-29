import { createSlice } from "@reduxjs/toolkit";

export const EnrollSlice = createSlice({
  name: "enroll",
  initialState: {
    enrolledCourses: [],
  },

  reducers: {
    enroll: (state, action) => {
      // state.enrolledCourses.push(...action.payload);
    },
    unenroll: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (course) => course.id !== action.payload.course.id
      );
    },
    CheckEnrollExist: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (course) => course.id === action.payload.course.id
      );
    },
  },
});

export const { enroll } = EnrollSlice.actions;

export default EnrollSlice.reducer;
