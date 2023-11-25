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
  `http://localhost:3000/users/supplier/${id}`;
export const UPDATE_PRODUCT = (id) =>
  `http://localhost:3000/products/update-product/${id}`;
export const GET_SINGLE_PRODUCT = (id) =>
  `http://localhost:3000/products/get-product/${id}`;
export const DELETE_PRODUCT = (id) =>
  `http://localhost:3000/products/delete-product/${id}`;
export const DELETE_USER = (id) => `http://localhost:3000/users/delete/${id}`;
const LOGIN_USER = `http://127.0.0.1:3001/users/login`

// Function
export const loginUser =  createAsyncThunk(
  'user/loginUser',
  async(userCredential) => {
      try{
        // axios.defaults.withCredentials = true; // stroe cookie
        const request = await axios.post(LOGIN_USER,userCredential)
        const response = await request.data.data;

        

      // save to local storage
      localStorage.setItem('user',JSON.stringify(response))

      console.log(response)
      return response
      }catch(error){
        console.log(error)
      }
  }
);

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
  async (id) => {
    try {
      const response = await axios.get(GET_SUPPPLIER_By_Id(id));
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

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

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    const response = await axios.delete(DELETE_USER(id));
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
});


