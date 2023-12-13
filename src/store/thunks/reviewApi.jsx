import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const PORT = 3000;

export const GET_ALL_REVIEW = `http://localhost:${PORT}/api/v1/reviews`;
export const GET_REVIEW_BY_ID = (id) =>
  `http://localhost:${PORT}/api/v1/reviews/product/${id}`;
export const DELETE_REVIEW = (id) =>
  `http://localhost:${PORT}/api/v1/reviews/${id}`;

export const fetchReview = createAsyncThunk("reviews/fetch", async () => {
  const response = await axios.get(GET_ALL_REVIEW);
  return response.data;
});

export const getReviewById = createAsyncThunk(
  "reviews/getReviewById",
  async (id) => {
    try {
      const response = await axios.get(GET_REVIEW_BY_ID(id));
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id) => {
    try {
      const response = await axios.delete(DELETE_REVIEW(id));
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with an error status (4xx or 5xx)
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        return "Network error or no response received";
      } else {
        // Something happened in setting up the request that triggered an error
        return "Error setting up the request";
      }
    }
  }
);
