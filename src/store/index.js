import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slice/userSlice";
import { productReducer } from "./slice/productSlice";
import { reviewsReducer } from "./slice/reviewSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    reviews: reviewsReducer,
  },
});

export * from "./thunks/fetchAPI";
