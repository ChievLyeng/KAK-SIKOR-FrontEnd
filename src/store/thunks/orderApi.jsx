import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PORT = 3000

export const GET_ALL_ORDER = `http://localhost:${PORT}/api/v1/orders/`;
export const fetchOrder = createAsyncThunk("order/fetch", async () => {
  const response = await axios.get(GET_ALL_ORDER);
  return response.data;
});
