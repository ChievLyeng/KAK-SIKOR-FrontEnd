import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
} from "./../slice/authSlice";
// import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const LOGIN_USER = `${import.meta.env.VITE_BASE_URL}/api/v1/users/login`;
const UPDATE_USER = (id) =>
  `${import.meta.env.VITE_BASE_URL}/api/v1/users/${id}`;

export const loginUser = async (user, dispatch, navigate) => {
  console.log("fethc apii");
  axios.defaults.withCredentials = true;
  dispatch(loginStart());
  try {
    const res = await axios.post(LOGIN_USER, user, {
      withCredentials: true,
    });
    dispatch(loginSuccess(res.data));
    navigate("/dashboard");
  } catch (err) {
    console.log(err);
    dispatch(loginFailed());
  }
};

export const logOut = async (
  dispatch,
  id,
  navigate,
  refreshToken,
  axiosJWT
) => {
  console.log("id", id);
  dispatch(logOutStart());
  axios.defaults.withCredentials = true;
  console.log("regfe", refreshToken);
  try {
    const res = await axiosJWT.get(
      `http://127.0.0.1:3000/api/v1/users/logout/${id}`,
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
        withCredentials: true,
      }
    );
    console.log("res", res.data);
    dispatch(logOutSuccess());
    navigate("/");
  } catch (err) {
    dispatch(logOutFailed());
  }
};

export const updateUserById = async (
  { userId, firstName, lastName, phone, gender, token },
  dispatch
) => {
  dispatch(updateUserStart());
  try {
    const response = await axios.put(
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
    dispatch(updateUserSuccess(response.data));
  } catch (error) {
    dispatch(updateUserFailed());
  }
};
