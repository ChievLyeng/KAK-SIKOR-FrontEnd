import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
} from "@material-ui/core";
import {
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/TopAppBar.css";
import Badge from "@mui/material/Badge";

const TopAppBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems); // log the state.cart

  return (
    <header>
      <AppBar position="static" color="primary" className="custom-appbar">
        <Toolbar>
          <Container maxWidth="lg">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h6" component="h1">
                KAK SIKOR
              </Typography>
            </Link>
          </Container>

          <IconButton color="inherit" onClick={handleMenuToggle}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          <div className={menuOpen ? "ml-auto show" : "ml-auto"}>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton color="inherit">
                <ShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge
                    color="success"
                    overlap="circular"
                    badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)}
                    style={{ marginLeft: "15px" }}
                  />
                )}
              </IconButton>
            </Link>

            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton color="inherit">
                <AccountCircle /> SignIn
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default TopAppBar;
