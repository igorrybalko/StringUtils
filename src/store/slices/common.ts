import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import apiCommon from '../../api';

type NotifPayload = {
 message: string;
 variant: 'error' | 'success' | 'info' | 'warning';
};

export const getStingByUrl = createAsyncThunk(
 'common/getStingByUrl',
 async (url: string, thunkAPI) => {
  try {
   const fileInString = await apiCommon.getStingByUrl(url);

   return fileInString;
  } catch (e) {
   return thunkAPI.rejectWithValue(e);
  }
 }
);

const initialState = {
 darkTheme: false,
 notifFlag: false,
 errorMessage: ''
};

export const commonSlice = createSlice({
 name: 'common',
 initialState,
 reducers: {
  toggleTheme(state) {
   state.darkTheme = !state.darkTheme;
  },
  showNotif(state, { payload }: { payload: NotifPayload }) {
   state.notifFlag = !state.notifFlag;
   state.errorMessage = payload.message;
  },
 },
});

export const { toggleTheme, showNotif } = commonSlice.actions;

export default commonSlice.reducer;
