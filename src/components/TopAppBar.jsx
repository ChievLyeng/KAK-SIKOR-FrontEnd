import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../store/thunks/createInstance";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@material-ui/core/Badge";
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
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
<<<<<<< HEAD
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logOutSuccess } from "../store/slice/authSlice";
import { logOut } from "../store/thunks/authApi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

=======
import { Link } from "react-router-dom";
import { logOutSuccess } from "../store/slice/authSlice";
import { logOut } from "../store/thunks/authApi";
>>>>>>> develop
import "../style/Dashboard.css";

export default function TopAppBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productSubMenuOpen, setProductSubMenuOpen] = useState(false);
<<<<<<< HEAD
  // const user = useSelector((state) => state.auth.login.currentUser);
  // const accessToken = user?.token;
  // const refreshToken = user?.refreshToken;
  // const id = user?.data?.user?._id;
  // console.log("id", accessToken);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  // const handleLogout = () => {
  //   logOut(dispatch, id, navigate, refreshToken, axiosJWT);
  // };
=======
  const user = useSelector((state) => state.auth.login.currentUser);
  const refreshToken = user?.refreshToken;
  const id = user?.data?.user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  const handleLogout = () => {
    logOut(dispatch, id, navigate, refreshToken, axiosJWT);
  };
>>>>>>> develop

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProductSubMenu = () => {
    setProductSubMenuOpen(!productSubMenuOpen);
  };

  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems); // log the state.cart

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
        <Toolbar>
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

          <Link to="/dashboard" className="link">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "green" }}
            >
              KAKSIKOR
            </Typography>
          </Link>

<<<<<<< HEAD
          <Link to="/cart">
            <IconButton>
              <ShoppingCart />
              {cartItems?.length > 0 && (
                <Badge
                  color="primary"
                  overlap="circular"
                  badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)}
                  style={{ marginLeft: "15px" }}
                />
              )}
            </IconButton>
          </Link>

=======
>>>>>>> develop
          <Link to="/myaccount">
            <IconButton>
              <PermIdentityIcon sx={{ color: "black" }} />
            </IconButton>
          </Link>

<<<<<<< HEAD
          <Link to="">
=======
          <Link to="" onClick={handleLogout}>
>>>>>>> develop
            <IconButton>Logout</IconButton>
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
                link: "/dashboard",
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
