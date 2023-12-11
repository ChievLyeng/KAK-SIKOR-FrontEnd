import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Avatar,
  MenuItem,
} from "@mui/material";
import { fetchCategories, getSingleProduct } from "../../store";
import TopAppBar from "../../components/TopAppBar";
import "../../style/common.css";
import "../../style/CreateProduct.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";

const UpdateProduct = () => {
  const initialProductData = {
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    Nutrition_Fact: "",
    Origin: "",
    Supplier: "",
    photos: [], // To store multiple photos
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const singleData = useSelector((state) => state.products.singleProduct);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  console.log(productData);
  useEffect(() => {
    dispatch(getSingleProduct(params.id));
    dispatch(fetchCategories());
  }, [dispatch, params.id]);

  useEffect(() => {
    if (singleData && singleData.product) {
      const { product } = singleData;
      setProductData({
        ...product,
        category: product.category._id,
        Supplier: product.Supplier ? product.Supplier._id : "",
        photos: [],
      });
    }
  }, [singleData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const selectedPhotos = Array.from(e.target.files);
    setProductData({ ...productData, photos: selectedPhotos });

    const previews = selectedPhotos.map((photo) => URL.createObjectURL(photo));
    setPhotoPreviews(previews);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("quantity", productData.quantity);
    formData.append("Nutrition_Fact", productData.Nutrition_Fact);
    formData.append("Origin", productData.Origin);
    formData.append("Supplier", productData.Supplier);

    const photos = productData.photos; // Assuming photos is an array of File objects
    photos.forEach((photo, index) => {
      formData.append(`photos`, photo); // Append all photos with the same key
    });

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/products/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );

      setProductData(initialProductData);
      setErrors({});
      setOpenSnackbar(true);

      dispatch(getSingleProduct(params.id));
    } catch (error) {
      console.error("Error updating product:", error);
      if (error.response) {
        console.error("Detailed Error Response:", error.response.data);
      }
      // Handle error scenario
    } finally {
      setIsLoading(false); // Reset loading state whether the update succeeds or fails
      navigate("/productsList");
    }
  };
  console.log(productData);

  const handleCancelPreview = (index) => {
    const updatedPreviews = photoPreviews.filter((_, i) => i !== index);
    setPhotoPreviews(updatedPreviews);
  };

  console.log(productData);

  return (
    <>
      <TopAppBar />
      <div className="create-form">
        <form onSubmit={(e) => e.preventDefault()} className="create-container">
          <div>
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
              value={productData.Supplier}
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
              multiple // Allow multiple photo selection
              style={{ display: "none" }}
              id="photo-upload"
            />
            {/* <img src={productData.photos[0].url} alt="" /> */}

            <div className="photo-upload-container">
              <label htmlFor="photo-upload" className="photo-upload-label">
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    backgroundColor: "#82B440",
                  }}
                >
                  UPLOAD PHOTOS
                </Button>
              </label>
            </div>
            {/* Render photo previews */}
            <div className="product-photo-container">
              {photoPreviews.map((preview, index) => (
                <div
                  key={index}
                  className="avatar-wrapper"
                  style={{ position: "relative" }}
                >
                  <Avatar
                    alt={`Product Photo ${index + 1}`}
                    src={preview}
                    sx={{
                      width: 300,
                      height: 300,
                      borderRadius: "0px",
                      marginTop: "18px",
                      marginRight: "18px",
                    }}
                  />
                  <IconButton
                    onClick={() => handleCancelPreview(index)}
                    sx={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                </div>
              ))}
            </div>
            <br />
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#82B440",
              }}
              onClick={handleSubmit}
              disabled={isAdding || isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isAdding ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "UPDATE Product"
              )}
            </Button>
          </div>
          <div>
            {" "}
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
          </div>
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

export default UpdateProduct;
