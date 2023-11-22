import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Avatar,
  MenuItem,
} from "@mui/material";
import {
  updateProductById,
  fetchCategories,
  getSingleProduct,
} from "../store";

// import "../../style/common.css";

const AccountInformation = () => {
  const initialProductData = {
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    Nutrition_Fact: "",
    Origin: "",
    Supplier: "", // Assuming Supplier is a string initially
    photo: null,
  };
  const params = useParams();
  const [productData, setProductData] = useState(initialProductData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const isAdding = useSelector((state) => state.products.isAdding);
  const addError = useSelector((state) => state.products.addError);
  const categoriesData = useSelector(
    (state) => state.categories.data.categories
  );
  const singleData = useSelector((state) => state.products.singleProduct);

  useEffect(() => {
    dispatch(getSingleProduct(params.id));
    dispatch(updateProductById(params.id));
    dispatch(fetchCategories());
  }, [dispatch, params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the name is 'Supplier', update only the '_id' of the Supplier object
    if (name === "Supplier") {
      setProductData({
        ...productData,
        Supplier: { _id: value }, // Assuming the Supplier object contains only the _id property
      });
    } else {
      setProductData({ ...productData, [name]: value });
    }
    setErrors({ ...errors, [name]: value === "" });
  };

  const handlePhotoChange = (e) => {
    setProductData({ ...productData, photo: e.target.files[0] });
  };

  useEffect(() => {
    if (singleData && singleData.product) {
      setProductData({
        ...singleData.product,
        photo: null,
      });
    }
  }, [singleData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append other fields except for the photo
    for (let key in productData) {
      if (key !== "photo") {
        // Ensure the Supplier field is a string with the _id
        if (key === "Supplier" && typeof productData[key] === "object") {
          formData.append(key, productData[key]._id);
        } else {
          formData.append(key, productData[key]);
        }
      }
    }

   

    try {
      // Make the API call using axios
      const response = await axios.post(
        `http://localhost:3000/products/update-product/${params.id}`,
        formData
      );

      console.log("Update Product API Response:", response.data);

      // On success, reset form data and handle snackbar
      setProductData(initialProductData);
      setErrors({});
      setOpenSnackbar(true);

      // Optionally fetch the updated data
      dispatch(getSingleProduct(params.id));
    } catch (error) {
      console.error("Error updating product:", error);

      // Log the detailed error response, if available
      if (error.response) {
        console.error("Detailed Error Response:", error.response.data);
      }

      // Handle error scenarios as needed
    }
  };

  console.log(singleData);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <>
      <div className="create-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Name"
            name="name"
            value={productData && productData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={errors.name}
            helperText={errors.name && "Name is required"}
          />
          <TextField
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={errors.description}
            helperText={errors.description && "Description is required"}
          />
          <TextField
            label="Price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            type="number"
            fullWidth
            margin="normal"
            error={errors.price}
            helperText={errors.price && "Price is required"}
          />
          <TextField
            label="Category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={errors.category}
            helperText={errors.category && "Category is required"}
            select
          >
            {categoriesData && categoriesData.length > 0 ? (
              categoriesData.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No categories available</MenuItem>
            )}
          </TextField>

          <TextField
            label="Quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
            type="number"
            fullWidth
            margin="normal"
            error={errors.quantity}
            helperText={errors.quantity && "Quantity is required"}
          />
          <TextField
            label="Nutrition Fact"
            name="Nutrition_Fact"
            value={productData.Nutrition_Fact}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={errors.Nutrition_Fact}
            helperText={errors.Nutrition_Fact && "Nutrition Fact is required"}
          />
          <TextField
            label="Origin"
            name="Origin"
            value={productData.Origin}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={errors.Origin}
            helperText={errors.Origin && "Origin is required"}
          />
          <TextField
            label="Supplier"
            name="Supplier"
            value={productData.Supplier ? productData.Supplier._id : ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={errors.Supplier}
            helperText={errors.Supplier && "Supplier is required"}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: "none" }}
            id="photo-upload"
          />

          <div className="photo-upload-container">
            <label htmlFor="photo-upload" className="photo-upload-label">
              <Button variant="contained" component="span">
                {productData.photo ? productData.photo.name : "Upload Photo"}
              </Button>
            </label>
          </div>
          <div className="product-photo-container">
            {productData.photo && (
              <Avatar
                alt="Product Photo"
                src={URL.createObjectURL(productData.photo)}
                sx={{
                  width: 300,
                  height: 300,
                  borderRadius: "0px",
                  marginTop: "18px",
                }}
              />
            )}
          </div>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isAdding}
          >
            {isAdding ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "UPDATE Product"
            )}
          </Button>
        </form>
        <Snackbar
          open={addError !== null && openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={addError || ""}
        />
      </div>
    </>
  );
};

export default AccountInformation;
