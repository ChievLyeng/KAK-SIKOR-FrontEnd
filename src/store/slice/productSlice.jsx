import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  addProduct,
  getSingleProduct,
  updateProductById,
  deleteProduct, // Import the deleteProduct thunk
} from "../thunks/fetchAPI";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    isAdding: false,
    addError: null,
    isUpdating: false,
    updateError: null,
    isLoadingSingleProduct: false,
    singleProduct: null,
    singleProductError: null,
    isDeleting: false, // New state for delete operation
    deleteError: null, // Error state for delete operation
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
        // Handle the successful addition of the product here if needed
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isAdding = false;
        state.addError = action.error.message;
      })
      .addCase(updateProductById.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.isUpdating = false;
        const updatedProduct = action.payload; // Confirm the payload structure
        const index = state.data.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.data[index] = updatedProduct;
        }
      })

      .addCase(updateProductById.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.error.message;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoadingSingleProduct = true;
        state.singleProductError = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoadingSingleProduct = false;
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoadingSingleProduct = false;
        state.singleProductError = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isDeleting = false;
        // Optionally handle success message or update state as needed
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteError = action.error.message;
      });
  },
});

export const productReducer = productSlice.reducer;
