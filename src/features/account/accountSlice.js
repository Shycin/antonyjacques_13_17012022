import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { simulatefetchAPI } from './accountAPI';
import * as Status from './accountStatus'

const initialState = {
    userAccount: null,
    error: null,
    status: Status.IDLE,
};


export const accountAsync = createAsyncThunk(
    'account/fetchAPI',
    async (data) => {
        const response = await simulatefetchAPI({userID: data.userID});
        return response;
    }
);


export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        logout: (state) => {
            state.userAccount= null
            state.error= null
            state.status= Status.IDLE
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(accountAsync.pending, (state) => {
            state.status = Status.INIT
        })
        .addCase(accountAsync.fulfilled, (state, action) => {
            state.status = Status.IDLE
            state.error = null
            state.userAccount = action.payload.userAccount
        })
        .addCase(accountAsync.rejected, (state, action) => {
            state.status = Status.IDLE
            state.error = action.error.message
        })
    },
});

export const { logout, tokenIsInvalid, tokenCheckValidity } = accountSlice.actions;

export const userAccount = (state) => state.account.userAccount;
export const error = (state) => state.account.error;
export const Loading = (state) => state.account.status;

export default accountSlice.reducer;