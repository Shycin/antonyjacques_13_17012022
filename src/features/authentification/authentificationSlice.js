import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { fetchAPI } from './authentificationAPI';
import * as Status from './authentificationStatus'

const initialState = {
    token: null,
    error: null,
    status: Status.IDLE,
    redirect: null
};


export const authentificationAsync = createAsyncThunk(
    'authentification/fetchAPI',
    async (data) => {
        const response = await fetchAPI({url: 'http://localhost:3001/api/v1/user/login', data: data});
        return response;
    }
);


export const tokenVerifAsync = createAsyncThunk(
    'tokenVerif/fetchAPI',
    async (data) => {
        const response = await fetchAPI({url: 'http://localhost:3001/api/v1/user/profile', data: data});
        return response;
    }
);



export const authentificationSlice = createSlice({
    name: 'authentification',
    initialState,
    reducers: {
        /*verifToken: (state, action) => {
            const tokenVerif = action.payload.token

            console.log(tokenVerif)
            state.status = Status.LOGIN;
            tokenVerifAsync({token: tokenVerif})
        },*/
    },
    extraReducers: (builder) => {
        builder
        .addCase(authentificationAsync.pending, (state) => {
            state.status = Status.WAIT;
        })
        .addCase(authentificationAsync.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.token = action.payload.token;
            state.error = null

            localStorage.setItem('token', action.payload.token)

            state.redirect = true
        })
        .addCase(authentificationAsync.rejected, (state, action) => {
            state.status = Status.IDLE;
            state.token = null
            state.error = action.error.message;
        })

        .addCase(tokenVerifAsync.pending, (state) => {
            state.status = Status.LOGIN
        })
        .addCase(tokenVerifAsync.fulfilled, (state, action) => {
            state.redirect = true
        })
        .addCase(tokenVerifAsync.rejected, (state, action) => {

        })
    },
});

//export const { verifToken } = authentificationSlice.actions;

export const errorLogin = (state) => state.authentification.error;
export const Loading = (state) => state.authentification.status;
export const Token = (state) => state.authentification.token;
export const Redirect_Page = (state) => state.authentification.redirect;

export default authentificationSlice.reducer;
