import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import InfoIcon from "@mui/icons-material/Info";
import GavelIcon from "@mui/icons-material/Gavel";
import "../../src/style/ClientTopBar.css";

const ClientTopBar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleCartClick = () => {
    navigate("/Cart");
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Product Market", icon: <StoreIcon />, path: "/product-market" },
    { text: "About Us", icon: <InfoIcon />, path: "/about-us" },
    { text: "Terms and Conditions", icon: <GavelIcon />, path: "/terms" },
  ];

  return (
    <div className="top-container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "transparent", boxShadow: "none" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="black"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleToggleSidebar}
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: green[500] }}
            >
              KAKSIKOR
            </Typography>
            <IconButton color="black" aria-label="user">
              <AccountCircleIcon sx={{ color: "black" }} />
            </IconButton>
            <IconButton
              color="black"
              aria-label="cart"
              onClick={handleCartClick}
            >
              <ShoppingCartIcon sx={{ color: "black" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          onClose={handleToggleSidebar}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleMenuItemClick(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default ClientTopBar;
