import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../thunks/fetchAPI";
import { fetchSupplierById } from "../thunks/fetchAPI";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    supplier: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSupplierById.pending, (state,action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSupplierById.fulfilled, (state,action) => {
        state.isLoading = false;
        state.supplier = action.payload;
      })
      .addCase(fetchSupplierById.rejected, (state,action) => {
        state.isLoading = false;
        state.error = action.error.message
      })
     
  },
});

export const usersReducer = userSlice.reducer;
