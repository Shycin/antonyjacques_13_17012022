import { configureStore } from '@reduxjs/toolkit';
import authentificationReducer from '../features/authentification/authentificationSlice';

export const store = configureStore({
  reducer: {
    authentification: authentificationReducer,
  },
});
