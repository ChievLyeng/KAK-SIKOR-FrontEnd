import { createSlice } from "@reduxjs/toolkit";
import { fetchReview } from "../thunks/reviewApi";
import { getReviewById } from "../thunks/reviewApi";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getReviewById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReviewById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getReviewById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const reviewsReducer = reviewSlice.reducer;
