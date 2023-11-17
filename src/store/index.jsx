import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slice/userSlice";
import { productReducer } from "./slice/productSlice";
import { reviewsReducer } from "./slice/reviewSlice";
import { orderReducer } from "./slice/orderSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    reviews: reviewsReducer,
    orders: orderReducer
  },
});

export * from "./thunks/fetchAPI";
