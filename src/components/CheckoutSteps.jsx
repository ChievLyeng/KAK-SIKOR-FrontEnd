import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Tabs
      value={step4 ? 3 : step3 ? 2 : step2 ? 1 : 0}
      variant="fullWidth"
      centered
    >
      <Tab label="Sign In" component={Link} to="/login" disabled={!step1} />
      <Tab label="Shipping" component={Link} to="/shipping" disabled={!step2} />
      <Tab label="Payment" component={Link} to="/payment" disabled={!step3} />
      <Tab label="Order" component={Link} to="/placeorder" disabled={!step4} />
    </Tabs>
  );
};

export default CheckoutSteps;
