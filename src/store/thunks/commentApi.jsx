import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const GET_ALL_COMMENT = `${import.meta.env.VITE_BASE_URL}/api/v1/comments`;
export const ADD_COMMENT = `${import.meta.env.VITE_BASE_URL}/api/v1/comments/:reviewId`;
export const fetchComment = createAsyncThunk("comments/fetch", async () => {
  const response = await axios.get(GET_ALL_COMMENT);

  return response.data;
});

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData) => {
    try {
      const response = await axios.post(ADD_COMMENT, commentData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
