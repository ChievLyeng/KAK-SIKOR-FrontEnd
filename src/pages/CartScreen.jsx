import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Card,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { removeFromCart } from "../slices/cartSlice";
import Message from "../components/Message";
import "../style/Cart.css";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cart:", cart);

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Grid container spacing={3}>
      <Grid item md={8}>
        <Typography variant="h4" style={{ marginBottom: "20px" }}>
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <Card variant="outlined">
            <List>
              {cartItems.map((item) => (
                <ListItem key={item._id}>
                  <div className="cart-proceed">
                    <div>
                      <Grid container spacing={2}>
                        <Grid item md={2}>
                          <img
                            src={item.photos[0].url}
                            alt={item.name}
                            className="cart-image"
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                          <Typography variant="body2">{item.qty}qty</Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="cart-price">
                      <div>
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </div>
                      <div>
                        <Typography variant="body2">
                          ${item.price}/Kg
                        </Typography>
                      </div>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          </Card>
        )}
      </Grid>
      <div>
        <Typography variant="h6">Order Summary</Typography>
        <div className="order-summary">
          <div>
            <div>Subtotal: ${cart.itemsPrice}</div>
            <div>ShippingPrice: ${cart.shippingPrice}</div>
            <div>TaxPrice: ${cart.taxPrice}</div>
            <div>TotalPrice: ${cart.totalPrice}</div>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default CartScreen;
