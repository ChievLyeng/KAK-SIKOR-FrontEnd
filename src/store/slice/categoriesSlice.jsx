import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../thunks/fetchAPI"; // Assuming fetchCategories is an async thunk for category fetching

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
