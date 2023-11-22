import { Link } from "react-router-dom";
import OutlinedCard from "../common-component/OutlineCard";
import SaleCard from "../common-component/SaleCard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchUser, fetchReview, fetchOrder } from "../store";
import Header from "../common-component/Header";
import Grid from "@mui/material/Grid";
import "../style/Dashboard.css";

function SummaryData() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.data);
  const products = useSelector((state) => state.products.data);
  const users = useSelector((state) => state.users.data);
  const reviews = useSelector((state) => state.reviews.data);

  useEffect(() => {
    dispatch(fetchOrder());
    dispatch(fetchProducts());
    dispatch(fetchUser());
    dispatch(fetchReview());
  }, [dispatch]);

  const Order = orders.orders;
  const Products = products.products;

  const orderLength = Order ? Order.length : 0;
  const productLength = Products ? Products.length : 0;

  return (
    <>
      {/* Add margin styles and center content */}
      <Header title="Dashboard" />

      <Grid container spacing={4} className="MuiGrid-root suumary-container">
        <Grid item xs={8}>
          <Grid
            container
            spacing={2}
            sx={{padding:"0px"}}
          >
            <Grid item xs={6}>
              <Link to="/productsList" className="link">
                <OutlinedCard
                  title="Total Product"
                  value={productLength}
                  icon={<Inventory2Icon />}
                />
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Link to="/usersList" className="link">
                <OutlinedCard
                  title="Total User"
                  value={users.result}
                  icon={<PersonOutlineIcon />}
                />
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Link to="" className="link">
                <OutlinedCard
                  title="Total Order"
                  value={orderLength}
                  icon={<ShoppingBagIcon />}
                />
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Link to="/review-list" className="link">
                <OutlinedCard
                  title="Total Review"
                  value={reviews.result}
                  icon={<ReviewsIcon />}
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4} >
          <Grid item xs={16}>
            <Link to="" className="link">
              <SaleCard
                title="Total Sale"
                value="$ 299999"
                icon={<MonetizationOnIcon />}
              />
            </Link>
          </Grid>
        </Grid>

      </Grid>
    </>
  );
}

export default SummaryData;
