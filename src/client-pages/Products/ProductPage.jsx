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
} from "@material-ui/core";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetProductDetailsQuery } from "../../store/slice/productsApiSlice";
import { addToCart } from "../../store/slice/cartSlice";
import "../../style/ProductPage.css";

const ProductPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [inputError, setInputError] = useState();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);

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

  const addToCartHandler = () => {
    if (product && product.product) {
      if (product.product.price) {
        dispatch(addToCart({ ...product.product, qty }));
        navigate("/cart");
      } else {
        console.error("Product price is missing.");
      }
    } else {
      console.error("Product data is missing or incomplete.");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError?.data?.message}</Message>
      ) : (
        <>
          <Link component={RouterLink} color="primary" to="/">
            Go Back
          </Link>

          <Grid container>
            {product.product.photos && product.product.photos.length > 0 && (
              <Card>
                <CardMedia
                  component="img"
                  alt={product.product.name}
                  className="image-detail"
                  image={product.product.photos[0].url}
                />
              </Card>
            )}
          </Grid>

          <div className="product-detail">
            <p>{product.product.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
            <h2>{product.product.price}$</h2>

            {product.product.quantity > 0 && (
              <TextField
                type="number"
                label="Quantity"
                value={qty}
                onChange={handleQtyChange}
                variant="outlined"
                error={!!inputError}
                helperText={inputError}
              />
            )}

            <Button
              variant="contained"
              type="button"
              onClick={addToCartHandler}
            >
              ADD TO CART
            </Button>

            <div>
              <h3>Nutrition Fact</h3>
              <div>{product.product.Nutrition_Fact}</div>
            </div>

            <div>
              <h3>Description</h3>
              <div>{product.product.description}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
