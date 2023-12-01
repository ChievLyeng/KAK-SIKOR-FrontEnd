import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PORT = 3000

export const GET_ALL_REVIEW =`http://localhost:${PORT}/reviews`;
  export const fetchReview = createAsyncThunk("reviews/fetch", async () => {
    const response = await axios.get(GET_ALL_REVIEW);
    
    return response.data;
  });
