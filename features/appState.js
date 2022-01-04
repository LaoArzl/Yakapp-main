import {createSlice} from '@reduxjs/toolkit';

export const appStateSlice = createSlice({
  name: 'appState',
  initialState: {value: ''},
  reducers: {
    changeAppState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {changeAppState} = appStateSlice.actions;

export default appStateSlice.reducer;
