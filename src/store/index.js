import { configureStore } from '@reduxjs/toolkit';
import activePageReducer from '../features/activePage';

export default configureStore({
  reducer: {
    activePage: activePageReducer
  },
});
