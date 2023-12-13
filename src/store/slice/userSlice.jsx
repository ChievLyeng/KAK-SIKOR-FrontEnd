import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUser,
  fetchSupplierById,
  deleteUser,
  updateUserById,
} from "../thunks/userApi";

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
      .addCase(fetchSupplierById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSupplierById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.supplier = action.payload;
      })
      .addCase(fetchSupplierById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        // Update the state after successful deletion if needed
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const usersReducer = userSlice.reducer;
