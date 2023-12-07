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
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import "../style/ProductPage.css";

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

  const addToCartHandler = () => {
    if (product && product?.product) {
      if (product?.product?.price) {
        dispatch(addToCart({ ...product?.product, qty }));
        navigate("/cart");
      } else {
        console.error("Product price is missing.");
      }
    } else {
      console.error("Product data is missing or incomplete.");
    }
  };

  const handleQtyChange = (e) => {
    let { value } = e.target;
    if (value !== "") parseInt(value);
    if (parseInt(value) === 0) value = "";
    if (value > product?.product?.quantity || value === "")
      setInputError("Input must not exceed quantity");
    else setInputError();
    setQty(Number(e.target.value));
  };

  console.log(product?.product);

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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardMedia
                  component="img"
                  alt={product?.product?.name}
                  className="image-detail"
                  image={product?.product?.photos[0]?.url}
                />
              </Card>
            </Grid>

            <div className="product-detail">
              <div>
                {product?.product?.quantity > 0 ? (
                  <p>In Stock</p>
                ) : (
                  <p>Out of Stock</p>
                )}
              </div>
              <div>
                <h2>{product?.product?.price}$</h2>
              </div>
              <div>
                {product.product?.quantity > 0 && (
                  <TextField
                    type="number"
                    label="Quantity"
                    value={qty !== 0 ? qty : ""}
                    onChange={handleQtyChange}
                    variant="outlined"
                    error={!!inputError}
                    helperText={inputError}
                  />
                )}
              </div>

              <Button
                variant="contained"
                type="button"
                onClick={addToCartHandler}
              >
                ADD TO CART
              </Button>

              <div>
                <h3>Nutrition Fact</h3>
                <div>{product?.product?.Nutrition_Fact} </div>
              </div>

              <div>
                <h3>Description</h3>
                <div>{product?.product?.description} </div>
              </div>
            </div>
          </Grid>
        </>
      )}
    </>
  );
};

export default ProductPage;
