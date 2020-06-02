import { createSlice } from '@reduxjs/toolkit';
import pages from '../services/pageService';

export const activePage = createSlice({
  name: 'activePage',
  initialState: {
    value: null
  },
  reducers: {
    setActivePage: (state, data) => {
      state.value = pages.getNameFromPath(data.payload);
    }
  }
});

export const { setActivePage } = activePage.actions;

export const selectActivePage = state => state.activePage.value;

export default activePage.reducer;
