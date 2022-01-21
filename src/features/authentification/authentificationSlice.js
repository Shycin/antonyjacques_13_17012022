import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from './authentificationAPI';
import * as Status from './authentificationStatus'


const initialState = {
    token: null,
    error: null,
    status: Status.IDLE,
};


export const authentificationAsync = createAsyncThunk(
    'authentification/fetchAPI',
    async (data) => {
        const response = await fetchAPI({url: 'http://localhost:3001/api/v1/user/login', data: data});
        return response;
    }
);



export const authentificationSlice = createSlice({
    name: 'authentification',
    initialState,
    reducers: {

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
        })
        .addCase(authentificationAsync.rejected, (state, action) => {
            state.status = Status.IDLE;
            state.token = null
            state.error = action.error.message;
        });
    },
});

//export const { } = authentificationSlice.actions;
export const errorLogin = (state) => state.authentification.error;
export const Loading = (state) => state.authentification.status;

export default authentificationSlice.reducer;
