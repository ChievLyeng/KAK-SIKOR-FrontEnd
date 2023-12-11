import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { usersReducer } from "./slice/userSlice";
import { productReducer } from "./slice/productSlice";
import { reviewsReducer } from "./slice/reviewSlice";
import { orderReducer } from "./slice/orderSlice";
import { categoriesReducer } from "./slice/categoriesSlice";
import authReducer from "./slice/authSlice";
import { thunk } from "redux-thunk";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  products: productReducer,
  reviews: reviewsReducer,
  orders: orderReducer,
  categories: categoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// })
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export let persistor = persistStore(store);

export * from "./thunks/orderApi";
export * from "./thunks/productApi";
export * from "./thunks/reviewApi";
export * from "./thunks/userApi";
