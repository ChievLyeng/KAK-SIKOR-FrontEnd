import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, addProduct } from "../thunks/fetchAPI";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    isAdding: false,
    addError: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.isAdding = true;
        state.addError = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isAdding = false;
        // You might handle the successful addition of the product here
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isAdding = false;
        state.addError = action.error.message;
      });
  },
});

export const productReducer = productSlice.reducer;
