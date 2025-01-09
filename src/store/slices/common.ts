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
   const result = await apiCommon.getStingByUrl(url);

   return result;
  } catch (e) {
   return thunkAPI.rejectWithValue(e);
  }
 }
);

export const getPageContent = createAsyncThunk(
 'common/getPageContent',
 async (id: number, thunkAPI) => {
  try {
   const result = await apiCommon.getPageContent(id);

   return result;
  } catch (e) {
   return thunkAPI.rejectWithValue(e);
  }
 }
);

export const getHtpasswd = createAsyncThunk(
 'common/getHtpasswd',
 async (password: string, thunkAPI) => {
  try {
   const result = await apiCommon.getHtpasswd(password);

   return result;
  } catch (e) {
   return thunkAPI.rejectWithValue(e);
  }
 }
);

const initialState = {
 darkTheme: false,
 notifFlag: false,
 errorMessage: '',
 cookieAgree: '',
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
  setCookieAgree(state, { payload }: { payload: string }) {
   state.cookieAgree = payload;
  },
 },
});

export const { toggleTheme, showNotif, setCookieAgree } = commonSlice.actions;

export default commonSlice.reducer;
