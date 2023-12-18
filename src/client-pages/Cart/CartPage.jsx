import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { removeFromCart } from "../../store/slice/cartSlice";
import Message from "../../components/Message";
import ClientLayout from "../../components/common/ClientLayout";
import "../../style/Cart.css";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cart:", cart);

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping"); // /login?redirect=/shipping
  };

  console.log(cart);

  return (
    <>
      <ClientLayout>
        <div className="container">
          {cart.cartItems.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <div className="cart-item">
              <Box>
                <Card key={item.id}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Link to={`/product/${item._id}`}>
                        {" "}
                        <Box sx={{ height: "100px" }}>
                          <img
                            className="cart-img"
                            src={item.photos[0].url}
                            alt=""
                          />
                        </Box>
                      </Link>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "30px",
                        }}
                      >
                        <Box>
                          <Box>
                            <Typography>{item.name}</Typography>
                          </Box>
                        </Box>
                        <Box>{item.qty}x</Box>
                      </Box>
                    </Box>

                    <Box sx={{ marginRight: "10px" }}>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={(e) => {
                          e.stopPropagation(); // Stop propagation of the click event
                          removeFromCartHandler(item._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </div>
          ))}
          <hr />
          <div className="recipe">
            <p className="order">Order Summary</p>
            <p>Total: {cart.totalPrice}</p>
            <p>Shipping: {cart.shippingPrice}</p>
            <p>Tax: {cart.taxPrice}</p>
          </div>
          <hr />
          <button
            variant="contained"
            className="btn"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </ClientLayout>
    </>
  );
};

export default CartPage;
