import { Link } from "react-router-dom";
import OutlinedCard from "../components/common/OutlineCard";
import SaleCard from "../components/common/SaleCard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchUser, fetchReview, fetchOrder } from "../store";
import Header from "../components/common/Header";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SummaryOrderStatus() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => {
    return state.orders?.data?.data;
  });
  const Allorders = orders?.orders || null
  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  return (
    <>
      {/* Add margin styles and center content */}
      <Header title="Product Order" />
      <Grid container spacing={3} className="MuiGrid-root suumary-container">
        <Grid item xs={4}>
          <Link to="/productsList" className="link">
            <OutlinedCard
              title="Pending"
              value={orders?.orderPending}
              icon={<Inventory2Icon />}
            />
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="" className="link">
            <OutlinedCard
              title="Delivered"
              value={orders?.orderDelivered}
              icon={<ShoppingBagIcon />}
            />
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/usersList" className="link">
            <OutlinedCard
              title="Completed"
              value={orders?.orderCompleted}
              icon={<PersonOutlineIcon />}
            />
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default SummaryOrderStatus;
