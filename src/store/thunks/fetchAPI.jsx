import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API
export const GET_ALL_PRODUCT =
  "http://localhost:3000/products/get-all-products";
export const GET_ALL_REVIEW = "http://localhost:3000/reviews";
export const ADD_PRODUCT = "http://localhost:3000/products/create-product";
export const GET_ALL_USER = "http://localhost:3000/users/users";
export const GET_ALL_ORDER = "http://localhost:3000/orders/";
export const GET_ALL_CATEGORIES =
  "http://localhost:3000/category/get-all-categories";
  
export const GET_SUPPPLIER_By_Id = (id) => 
`http://localhost:3000/users/supplier/${id}`


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

export const fetchOrder = createAsyncThunk("order/fetch", async () => {
  const response = await axios.get(GET_ALL_ORDER);
  return response.data;
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    try {
      const response = await axios.post(ADD_PRODUCT, productData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    try {
      const response = await axios.get(GET_ALL_CATEGORIES);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchSupplierById = createAsyncThunk(
  "supplier/fetchById",
  async(id) => {
    try{
      const response = await axios.get(GET_SUPPPLIER_By_Id(id))
      return response.data
    }catch(error){
      return error.response.data
    }
  }
)
