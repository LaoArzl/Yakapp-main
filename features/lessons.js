import { createSlice } from "@reduxjs/toolkit";

export const lessonSlice = createSlice({
  name: "lesson",
  initialState: {
    value: [],
  },
  reducers: {
    updateLesson: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateLesson } = lessonSlice.actions;

export default lessonSlice.reducer;
