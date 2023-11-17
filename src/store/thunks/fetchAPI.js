import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API
export const GET_ALL_PRODUCT =
  "http://localhost:3000/products/get-all-products";
export const GET_ALL_REVIEW = "http://localhost:3000/reviews";
export const ADD_PRODUCT = "http://localhost:3000/products/create-product";
export const GET_ALL_USER = "http://localhost:3000/users/users";

// Function

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  const response = await axios.get(GET_ALL_PRODUCT);

  return response.data;
});

export const fetchReview = createAsyncThunk("reviews/fetch", async () => {
  const response = await axios.get(GET_ALL_REVIEW);

  return response.data;
});

export const fetchUser = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get(GET_ALL_USER);

  return response.data;
});
