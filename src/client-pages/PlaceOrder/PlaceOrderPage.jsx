import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, List, ListItem, Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../../store/slice/ordersApiSlice";
import { clearCartItems } from "../../store/slice/cartSlice";
import CheckoutSteps from "../../components/CheckoutSteps";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import "../../style/PlaceOrderPage.css";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();

  console.log(cart.cartItems);
  console.log("cart", cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div>
          <Typography variant="h6">Shipping</Typography>
          <Typography>
            <strong>Address:</strong> {cart.shippingAddress.address},{" "}
            {cart.shippingAddress.city}
          </Typography>
        </div>

        <div>
          <Typography variant="h6">Payment Method</Typography>
          <Typography>
            <strong>Method:</strong> {cart.paymentMethod}
          </Typography>
        </div>

        <div className="order-items">
          <Typography variant="h6">Order Items</Typography>
          {cart.cartItems.length === 0 ? (
            <Message variant="info">Your cart is empty</Message>
          ) : (
            <List>
              {cart.cartItems.map((item, index) => (
                <ListItem key={index}>
                  <img
                    src={item.photos[0].url}
                    alt={item.name}
                    className="photos"
                  />
                  <div>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </div>
                  <div>
                    {item.qty} x {item.price} = ${item.qty * item.price}
                  </div>
                </ListItem>
              ))}
            </List>
          )}
        </div>

        <div>
          <Typography variant="h6">Order Summary</Typography>
          <div>
            <div>Items: ${cart.itemsPrice}</div>
            <div>Shipping: ${cart.shippingPrice}</div>
            <div>Tax: ${cart.taxPrice}</div>
            <div>Total: ${cart.totalPrice}</div>
          </div>
        </div>

        {isError && (
          <ListItem>
            <Message variant="danger">{isError}</Message>
          </ListItem>
        )}

        <div>
          <Button
            variant="contained"
            color="primary"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
            {isLoading && <Loader />}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
