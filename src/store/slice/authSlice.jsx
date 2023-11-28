import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../thunks/fetchAPI';

const authSlice = createSlice({
    name: 'login',
    initialState:{
        user: null,
        isLoading: false,
        error: null
  },
  reducers: {
    initializeUser: (state, action) => {
      state.user = action.payload;
    },
  },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.user = null;
            state.isLoading = true;
            state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
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
    }
});

export const { initializeUser } = authSlice.actions;
export const authsReducer = authSlice.reducer