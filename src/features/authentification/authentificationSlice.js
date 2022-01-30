import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { fetchAPI } from './authentificationAPI';
import * as Status from './authentificationStatus'

const initialState = {
    token: null,
    error: null,
    status: Status.IDLE,

    tokenIsValid: null,

    profile: null
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


export const modificationAsync = createAsyncThunk(
    'modification/fetchAPI',
    async (data) => {
        const response = await fetchAPI({method: 'PUT', url: 'http://localhost:3001/api/v1/user/profile', data: data});
        return response;
    }
);



export const authentificationSlice = createSlice({
    name: 'authentification',
    initialState,
    reducers: {
        tokenIsInvalid: (state) => {
            state.status = Status.IDLE
            state.tokenIsValid = false
        },
        logout: (state) => {
            state.token =  null
            state.error =  null
            state.status =  Status.IDLE

            state.tokenIsValid =  null

            state.profile =  null

            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(authentificationAsync.pending, (state) => {
            state.status = Status.WAIT
        })
        .addCase(authentificationAsync.fulfilled, (state, action) => {
            state.status = Status.IDLE
            state.token = action.payload.token
            state.error = null

            localStorage.setItem('token', action.payload.token)

            state.tokenIsValid = true
        })
        .addCase(authentificationAsync.rejected, (state, action) => {
            state.status = Status.IDLE
            state.token = null
            state.error = action.error.message
            state.tokenIsValid = false
        })


        .addCase(tokenVerifAsync.pending, (state) => {
            state.status = Status.LOGIN
        })
        .addCase(tokenVerifAsync.fulfilled, (state, action) => {
            state.status = Status.IDLE
            state.token = localStorage.getItem('token')
            state.error = null

            state.profile = action.payload.profile



            state.tokenIsValid = true
        })
        .addCase(tokenVerifAsync.rejected, (state, action) => {
            state.status = Status.IDLE
            state.token = null
            state.tokenIsValid = false

            localStorage.removeItem('token')
        })



        .addCase(modificationAsync.pending, (state) => {
            state.status = Status.WAIT
        })
        .addCase(modificationAsync.fulfilled, (state, action) => {
            state.status = Status.IDLE
            state.profile = action.payload.profile
        })
        .addCase(modificationAsync.rejected, (state, action) => {
            state.status = Status.IDLE
        })
    },
});

export const { logout, tokenIsInvalid, tokenCheckValidity } = authentificationSlice.actions;

export const errorLogin = (state) => state.authentification.error;
export const Loading = (state) => state.authentification.status;
export const Token = (state) => state.authentification.token;
export const TokenIsValid = (state) => state.authentification.tokenIsValid;
export const Profile = (state) => state.authentification.profile;

export default authentificationSlice.reducer;
