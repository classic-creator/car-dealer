import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // { id, name, email, role: 'admin' | 'sales' | 'customer' }
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
