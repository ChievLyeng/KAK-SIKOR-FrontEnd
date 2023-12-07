import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PORT = 3000;

export const GET_ALL_REVIEW = `http://localhost:${PORT}/api/v1/reviews`;
export const GET_REVIEW_BY_ID = (id) =>
  `http://localhost:${PORT}/api/v1/reviews/product/${id}`;

export const fetchReview = createAsyncThunk("reviews/fetch", async () => {
  const response = await axios.get(GET_ALL_REVIEW);
  return response.data;
});

export const getReviewById = createAsyncThunk(
  "products/getReviewById",
  async (id) => {
    try {
      const response = await axios.get(GET_REVIEW_BY_ID(id));
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);