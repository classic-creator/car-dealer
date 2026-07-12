import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMobileMenuOpen: false,
  theme: 'light', // 'light' or 'dark'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    }
  }
});

export const { toggleMobileMenu, closeMobileMenu, toggleTheme } = uiSlice.actions;

export default uiSlice.reducer;
