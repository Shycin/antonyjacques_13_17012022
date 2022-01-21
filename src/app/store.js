import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authentificationReducer from '../features/authentification/authentificationSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authentification: authentificationReducer,
  },
});
