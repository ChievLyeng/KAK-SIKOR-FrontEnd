import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PORT = 3000

// user
export const GET_ALL_USER = `http://localhost:${PORT}/v1/api`;
export const LOGIN_USER = `http://127.0.0.1:3001/users/login`;
export const GET_SUPPPLIER_By_Id = (id) =>
`http://localhost:${PORT}/users/supplier/${id}`;
export const GET_USER = (id) => `http://localhost:3001/users/${id}`;
export const DELETE_USER = (id) => `http://localhost:${PORT}users/delete/${id}`;
export const UPDATE_USER = (id) => `http://localhost:3001/users/update/${id}`;

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredential) => {
    try {
      const request = await axios.post(LOGIN_USER, userCredential, {
        withCredentials: true,
      });
      const response = await request.data;
      console.log("login respone :", response.data);

      // save to local storage
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.token));

      console.log("response :", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUserById = createAsyncThunk("user/fetch", async (userId) => {
  try {
    const response = await axios.get(GET_USER(userId));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchUser = createAsyncThunk("users/fetch", async () => {
  try {
    const response = await axios.get(GET_ALL_USER);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

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

export const updateUserById = createAsyncThunk(
  "user/updateProfile",
  async ({ userId, firstName, lastName, phone, gender, token }) => {
    try {
      const response = await axios.post(
        UPDATE_USER(userId),
        {
          firstName,
          lastName,
          phoneNumber: phone,
          gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
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