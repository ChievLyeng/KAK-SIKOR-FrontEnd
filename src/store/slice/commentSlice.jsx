import { createSlice } from "@reduxjs/toolkit";
import { fetchComment } from "../thunks/reviewApi";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const commentsReducer = commentSlice.reducer;
