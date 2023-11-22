import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AddIcon from "@mui/icons-material/Add";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from 'react-router-dom';
import '../style/Dashboard.css'

export default function TopAppBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productSubMenuOpen, setProductSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProductSubMenu = () => {
    setProductSubMenuOpen(!productSubMenuOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: "black" }}
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/" className="link">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "green"}}
            >
              KAKSIKOR
            </Typography>
          </Link>
          
          <Link to="/myaccount">
            <IconButton>
              <PermIdentityIcon sx={{color:"black"}} />
            </IconButton>
          </Link>

          

        </Toolbar>

          
      </AppBar>

      <Drawer
        variant="temporary"
        open={menuOpen}
        onClose={toggleMenu}
        anchor="left"
        sx={{ width: 350 }}
      >
        <Box
          sx={{
            width: 300,
            paddingTop: 2,
          }}
        >
          <List>
            {[
              {
                text: "Dashboard",
                icon: <DashboardIcon />,
                link: "/",
              },
              {
                text: "Product",
                icon: (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <StoreIcon />
                    </Box>
                  </Box>
                ),
                submenu: [
                  {
                    text: "List Product",
                    link: "/productsList",
                    icon: <AssignmentIcon />,
                  },
                  {
                    text: "Create Product",
                    link: "/create-product",
                    icon: <AddIcon />,
                  },
                ],
              },
              { text: "Order", icon: <AssignmentIcon />, link: "/order" },
              { text: "User", icon: <PeopleIcon />, link: "/usersList" },
              {
                text: "Review",
                icon: <RateReviewIcon />,
                link: "/review-list",
              },
            ].map((item, index) => (
              <div key={index}>
                <ListItem
                  button
                  component="a"
                  href={item.link}
                  onClick={() => {
                    if (item.submenu) {
                      toggleProductSubMenu();
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
                {item.submenu &&
                  productSubMenuOpen &&
                  item.submenu.map((subItem, subIndex) => (
                    <ListItem
                      button
                      key={subIndex}
                      component="a"
                      href={subItem.link}
                      sx={{
                        pl: 4,
                        pr: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
      {/* Content goes here */}
      
    </Box>
  );
}
