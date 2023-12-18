import React, { useState } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Grid,
  Button,
  Card,
  CardMedia,
  TextField,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetProductDetailsQuery } from "../../store/slice/productsApiSlice";
import { addToCart } from "../../store/slice/cartSlice";
import ClientLayout from "../../components/common/ClientLayout";
import Typography from "@mui/material/Typography";
import "../../style/ProductPage.css";

const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [inputError, setInputError] = useState();
  const [openModal, setOpenModal] = useState(false);

  const { data: product } = useGetProductDetailsQuery(productId);

  const handleQtyChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      const parsedValue = parseInt(value);
      if (parsedValue === 0 || parsedValue > product?.product?.quantity) {
        setInputError("Input must be between 1 and the available quantity");
      } else {
        setInputError("");
        setQty(parsedValue);
      }
    } else {
      setInputError("");
      setQty("");
    }
  };

  const revealQty = () => {
    setOpenModal(true);
  };

  const closeQtyModal = () => {
    setOpenModal(false);
  };

  const addToCartHandler = () => {
    if (product && product.product) {
      if (product.product.price) {
        dispatch(addToCart({ ...product.product, qty }));
        closeQtyModal();
        navigate("/cart");
      } else {
        console.error("Product price is missing.");
      }
    } else {
      console.error("Product data is missing or incomplete.");
    }
  };

  return (
    <ClientLayout>
      <div className="product">
        <Typography variant="h4" gutterBottom>
          {product?.product?.name}
        </Typography>
        <div className="product-img-container">
          <img
            className="product-img"
            src={product?.product?.photos[0]?.url}
            alt=""
          />
        </div>
        <div className="inStock">
          {product?.product?.quantity > 0 ? "In Stock" : "Out of Stock"}
        </div>

        <Dialog open={openModal} onClose={closeQtyModal}>
          <DialogTitle>Enter Quantity</DialogTitle>
          <DialogContent>
            <TextField
              type="number"
              label="Quantity"
              value={qty}
              onChange={handleQtyChange}
              variant="outlined"
              error={!!inputError}
              helperText={inputError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeQtyModal}>Cancel</Button>
            <Button onClick={addToCartHandler}>Confirm</Button>
          </DialogActions>
        </Dialog>
        <Typography variant="h5">{product?.product?.price}$</Typography>

        <button type="button" onClick={revealQty}>
          ADD TO CARD
        </button>

        <button>CONTACT SUPPLIER</button>
        <div>
          <hr />
          <Typography sx={{ textAlign: "left", marginTop: "15px" }}>
            Nutrition Fact
          </Typography>
          <p className="para">{product?.product?.Nutrition_Fact}</p>
        </div>
        <div>
          <hr />
          <Typography sx={{ textAlign: "left", marginTop: "15px" }}>
            Description
          </Typography>
          <p className="para">{product?.product?.description}</p>
        </div>
        <div>
          <hr />
          <Typography sx={{ textAlign: "left", marginTop: "15px" }}>
            Features & details
          </Typography>
        </div>
        <div>
          <hr />
          <Typography sx={{ textAlign: "left", marginTop: "15px" }}>
            About Supplier
          </Typography>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ProductPage;
