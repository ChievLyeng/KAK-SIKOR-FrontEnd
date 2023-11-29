import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../thunks/fetchAPI';
import { fetchUserById } from '../thunks/fetchAPI';

const authSlice = createSlice({
    name: 'login',
    initialState:{
        user: null,
        isLoading: false,
        isAuthenicated: false,
        error: null
  },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
          state.user = null;
          state.isLoading = true;
          state.isAuthenicated = false
          state.error = null;
        })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isAuthenicated = true;
            state.error = null;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.user = null;
            state.isLoading = false;
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access Denied! Invalid Credentials';
            }else{
                state.error = action.error.message;
            }
          })
          .addCase(fetchUserById.pending, (state) => {
            state.user = null;
            state.isLoading = true;
            state.isAuthenicated = false
            state.error = null;
          })
          .addCase(fetchUserById.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isAuthenicated = true;
            state.error = null;
          })
          .addCase(fetchUserById.rejected, (state, action) => {
            state.user = null;
            state.isLoading = false;
          });
    }
});

export const authsReducer = authSlice.reducer