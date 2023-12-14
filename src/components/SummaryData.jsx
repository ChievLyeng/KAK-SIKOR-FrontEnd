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
import "../style/Dashboard.css";

function SummaryData() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.data);
  const users = useSelector((state) => state.users.data);
  // const { data: orders, isLoading, isError } = useGetAllordersQuery();
  const reviews = useSelector((state) => {
    return state.reviews.data;
  });
  const orders = useSelector((state) => {
    return state.orders?.data;
  });
  const Products = products.products;
  const productLength = Products ? Products.length : 0;

  useEffect(() => {
    dispatch(fetchOrder());
    dispatch(fetchProducts());
    dispatch(fetchUser());
    dispatch(fetchReview());
  }, [dispatch]);

  return (
    <>
      {/* Add margin styles and center content */}
      <Header title="Dashboard" />

      <Grid container spacing={4} className="MuiGrid-root suumary-container">
        <Grid item xs={8}>
          <Grid container spacing={2} sx={{ padding: "0px" }}>
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
                  value={users?.result || 0}
                  icon={<PersonOutlineIcon />}
                />
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Link to="" className="link">
                <OutlinedCard
                  title="Total Order"
                  value={orders?.length}
                  icon={<ShoppingBagIcon />}
                />
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Link to="/review-list" className="link">
                <OutlinedCard
                  title="Total Review"
                  value={reviews.result || 0}
                  icon={<ReviewsIcon />}
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
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
