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
import { addProduct, fetchCategories, createCategory } from "../../store";
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
  const { unwrapResult } = "@reduxjs/toolkit";
  const isAdding = useSelector((state) => state.products.isAdding);
  const addError = useSelector((state) => state.products.addError);
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const categoriesData = useSelector(
    (state) => state.categories.data.categories
  );

  const handleCreateCategory = () => {
    setShowNewCategoryForm(!showNewCategoryForm);
  };

  const handleSubmitNewCategory = async (e) => {
    e.preventDefault();

    if (newCategoryName.trim() === "") {
      setOpenSnackbar(true);
      return;
    }

    try {
      await dispatch(createCategory(newCategoryName));
      setNewCategoryName("");
      setShowNewCategoryForm(false);
      dispatch(fetchCategories());
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

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
      dispatch(addProduct(formData));
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
          <div>
            <div>
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
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateCategory}
              >
                CREATE CATEGORY
              </Button>

              {/* New category form */}
              {showNewCategoryForm && (
                <div>
                  <form onSubmit={handleSubmitNewCategory}>
                    <TextField
                      label="New Category Name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                      Submit New Category
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
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
                    width: 250,
                    height: 250,
                    borderRadius: "3px",
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
