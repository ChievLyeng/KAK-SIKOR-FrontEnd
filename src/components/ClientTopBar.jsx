import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { green } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ClientTopBar = () => {
  return (
    <>
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
            <IconButton color="black" aria-label="cart">
              <ShoppingCartIcon sx={{ color: "black" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default ClientTopBar;
