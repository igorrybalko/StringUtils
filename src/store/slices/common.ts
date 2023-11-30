import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 darkTheme: false,
};

export const commonSlice = createSlice({
 name: 'common',
 initialState,
 reducers: {
  toggleTheme(state) {
   state.darkTheme = !state.darkTheme;
  },
 },
});

export const { toggleTheme } = commonSlice.actions;

export default commonSlice.reducer;
