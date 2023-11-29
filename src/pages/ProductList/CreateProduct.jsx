import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Avatar,
  MenuItem,
} from "@mui/material";
import { addProduct, fetchCategories } from "../../store";
import TopAppBar from "../../components/TopAppBar";
import "../../style/common.css";

const CreateProduct = () => {
  const initialProductData = {
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    Nutrition_Fact: "",
    Origin: "",
    Supplier: "",
    photos: [],
  };

  const [productData, setProductData] = useState(initialProductData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const isAdding = useSelector((state) => state.products.isAdding);
  const addError = useSelector((state) => state.products.addError);
  const categoriesData = useSelector(
    (state) => state.categories.data.categories
  );

  console.log(categoriesData);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
    setErrors({ ...errors, [name]: value === "" });
  };

  const handlePhotoChange = (e) => {
    setProductData({ ...productData, photos: [...e.target.files] });
  };

  const handleSubmit = () => {
    const fieldErrors = {};
    for (let key in productData) {
      if (productData[key] === "" && key !== "photos") {
        fieldErrors[key] = true;
      }
    }

    if (productData.photos.length === 0) {
      fieldErrors.photos = true;
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
    } else {
      const formData = new FormData();
      for (let key in productData) {
        if (key === "photos") {
          productData[key].forEach((file) => formData.append("photos", file));
        } else {
          formData.append(key, productData[key]);
        }
      }
      console.log(formData);
      dispatch(addProduct(formData)); // Send formData to backend
      setProductData(initialProductData);
      setErrors({});
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <TopAppBar />
      <div className="create-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Name"
            name="name"
            value={productData.name}
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
            style={{ display: "none" }}
            id="photo-upload"
            multiple // Allow multiple file selection
          />

          <div className="photo-upload-container">
            <label htmlFor="photo-upload" className="photo-upload-label">
              <Button variant="contained" component="span">
                Upload Photos
              </Button>
            </label>
          </div>
          <div className="product-photo-container">
            {productData.photos &&
              productData.photos.length > 0 &&
              productData.photos.map((photo, index) => (
                <Avatar
                  key={index}
                  alt={`Product Photo ${index + 1}`}
                  src={URL.createObjectURL(photo)}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "0px",
                    marginTop: "18px",
                  }}
                />
              ))}
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
              "Add Product"
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

export default CreateProduct;
