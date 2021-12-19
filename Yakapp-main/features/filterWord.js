import {createSlice} from '@reduxjs/toolkit';

export const filterWordSlice = createSlice({
  name: 'filterWord',
  initialState: {
    value: [],
  },
  reducers: {
    updateFilterWord: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {updateFilterWord} = filterWordSlice.actions;

export default filterWordSlice.reducer;
