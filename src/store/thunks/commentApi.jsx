import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const PORT = 3000;

export const GET_ALL_COMMENT = `http://localhost:${PORT}/api/v1/comments`;
export const ADD_COMMENT = `http://localhost:${PORT}/api/v1/comments/:reviewId`;

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
