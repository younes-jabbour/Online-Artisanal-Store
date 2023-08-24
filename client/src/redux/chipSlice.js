import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numberItems: 0,
  numberCourses: 0,
};

const chipSlice = createSlice({
  name: "chip",
  initialState,
  reducers: {
    setNumberItems: (state, action) => {
      state.numberItems = action.payload.numberItems;
    },
    setNumberCourses: (state, action) => {
      state.numberCourses = action.payload.numberCourses;
    },
  },
});

export const { setNumberItems, setNumberCourses } = chipSlice.actions;
export default chipSlice.reducer;
