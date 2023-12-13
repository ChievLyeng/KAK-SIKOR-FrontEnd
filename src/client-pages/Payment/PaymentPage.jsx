import React, { useState, useEffect } from "react";
import {
  FormLabel,
  Radio,
  FormControl,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps";
import { savePaymentMethod } from "../../store/slice/cartSlice";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <FormControl component="form" onSubmit={submitHandler}>
        <FormLabel component="legend">Select Method</FormLabel>
        <FormControlLabel
          control={
            <Radio
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          }
          label="PayPal or Credit Card"
        />
        <Button type="submit" variant="contained" color="primary">
          Continue
        </Button>
      </FormControl>
    </div>
  );
};

export default PaymentScreen;
