import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slice/apiSlice"; //apiSlice
import cartSliceReducer from "./slice/cartSlice"; //cartSlice
import authV2Slice from "./slice/authV2Slice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authV2Slice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
