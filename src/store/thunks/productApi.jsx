import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PORT = 3000

axios.defaults.withCredentials = true;

// product
export const GET_ALL_PRODUCT =
  `http://localhost:${PORT}/api/v1/products`;
  export const ADD_PRODUCT = `http://localhost:${PORT}/api/v1/products`;
  export const UPDATE_PRODUCT = (id) =>
  `http://localhost:${PORT}/api/v1/products/${id}`;
  export const GET_SINGLE_PRODUCT = (id) =>
  `http://localhost:${PORT}/api/v1/products/${id}`;
  export const DELETE_PRODUCT = (id) =>
  `http://localhost:${PORT}/api/v1/products/${id}`;
  export const GET_ALL_CATEGORIES =
  `http://localhost:${PORT}/api/v1/categories`; 
  export const CREATE_CATEGORY = `http://localhost:${PORT}/api/v1/catagories`;

  export const updateProductById = createAsyncThunk(
    "products/updateProduct",
    async ({ id }) => {
      try {
        const response = await axios.post(UPDATE_PRODUCT(id));
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    }
  );

  export const fetchProducts = createAsyncThunk("product/fetch", async () => {
    const response = await axios.get(GET_ALL_PRODUCT);
  
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

  export const getSingleProduct = createAsyncThunk(
    "products/getProductById",
    async (id) => {
      try {
        const response = await axios.get(GET_SINGLE_PRODUCT(id));
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    }
  );
  
  export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id) => {
      try {
        const response = await axios.delete(DELETE_PRODUCT(id));
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

  export const createCategory = createAsyncThunk(
    "categories/create",
    async (categoryName) => {
      console.log("Sending data to server:", categoryName);
      try {
        const response = await axios.post(CREATE_CATEGORY, {
          name: categoryName,
        });
        console.log("Response from server:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error from server:", error.response.data);
        throw error.response.data;
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