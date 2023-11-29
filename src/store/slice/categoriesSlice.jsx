import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, createCategory } from "../thunks/fetchAPI";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // ...your other reducers...
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
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload); // Push the created category to the existing data array
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
