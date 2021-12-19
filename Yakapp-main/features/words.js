import {createSlice} from '@reduxjs/toolkit';

export const wordSlice = createSlice({
  name: 'word',
  initialState: {
    value: [],
  },
  reducers: {
    updateWord: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {updateWord} = wordSlice.actions;

export default wordSlice.reducer;
