import { configureStore } from '@reduxjs/toolkit';
import authentificationReducer from '../features/authentification/authentificationSlice';
import accountReducer from '../features/account/accountSlice';

export const store = configureStore({
  reducer: {
    authentification: authentificationReducer,
    account: accountReducer,
  },
});
