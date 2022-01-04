import {createSlice} from '@reduxjs/toolkit';

export const masterWordSlice = createSlice({
  name: 'masterWord',
  initialState: {
    value: [],
  },
  reducers: {
    updateMasterWord: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {updateMasterWord} = masterWordSlice.actions;

export default masterWordSlice.reducer;
