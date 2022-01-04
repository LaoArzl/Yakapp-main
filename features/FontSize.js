import {createSlice} from '@reduxjs/toolkit';

export const fontSlice = createSlice({
  name: 'fontSize',
  initialState: {value: 14},
  reducers: {
    fontSizes: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {changeSize} = fontSlice.actions;

export default fontSlice.reducer;
