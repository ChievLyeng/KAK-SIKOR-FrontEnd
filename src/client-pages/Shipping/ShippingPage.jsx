import React from "react";
import CheckoutSteps from "../../components/CheckoutSteps";
import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../store/slice/cartSlice";
import ClientLayout from "../../components/common/ClientLayout";
import "../../style/ShippingPage.css";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart; // destructure shippingAddress from cart slice

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city }));
    navigate("/payment");
  };

  return (
    <>
      <ClientLayout>
        <div>
          <CheckoutSteps step1 step2 />
          <div className="shipping">
            <form onSubmit={submitHandler} className="shipping">
              <h2>Shipping</h2>
              <div>
                <TextField
                  type="string"
                  label="Address"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <TextField
                  type="string"
                  label="City"
                  variant="outlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>

              <Button
                variant="contained"
                type="submit"
                style={{
                  backgroundColor: "#82B440",
                  width: "100%",
                  marginBottom: "16px",
                }}
              >
                Continue
              </Button>
            </form>
          </div>
        </div>
      </ClientLayout>
    </>
  );
};

export default ShippingScreen;
