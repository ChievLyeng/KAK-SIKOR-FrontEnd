import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GET_ALL_ORDER = `${import.meta.env.VITE_BASE_URL}/api/v1/orders/`;
export const fetchOrder = createAsyncThunk("order/fetch", async () => {
  const response = await axios.get(GET_ALL_ORDER);
  return response.data;
});
