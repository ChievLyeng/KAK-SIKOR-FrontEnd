import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slice/userSlice";
import { productReducer } from "./slice/productSlice";
import { reviewsReducer } from "./slice/reviewSlice";
import { orderReducer } from "./slice/orderSlice";
import { categoriesReducer } from "./slice/categoriesSlice";
import { authsReducer } from './slice/authSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    reviews: reviewsReducer,
    orders: orderReducer,
    categories: categoriesReducer,
    auth: authsReducer
  },
});

export * from "./thunks/orderApi";
export * from "./thunks/productApi";
export * from "./thunks/reviewApi";
export * from "./thunks/userApi";

