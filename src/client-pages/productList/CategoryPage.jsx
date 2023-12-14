import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import "../../style/HomePage.css";
import ClientLayout from "../../components/common/ClientLayout";
import { useParams, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import { getProductByCategory, fetchCategories } from "../../store";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function CategoryPage() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.categories.data.products);
  const categoriesData = useSelector(
    (state) => state.categories.data.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getProductByCategory({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  return (
    <ClientLayout>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          marginTop: "24px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <InputBase
            placeholder="Search…"
            sx={{
              color: "black",
              width: "90%",
              border: "1px solid green",
              borderRadius: 4,
              padding: "8px 12px",
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </Toolbar>
        <Tabs
          variant="scrollable"
          scrollButtons={false}
          sx={{ marginTop: "24px", marginBottom: "24px" }}
          aria-label="scrollable prevent tabs example"
          value={categories}
        >
          {categories?.map((category) => (
            <Tab
              key={category._id}
              label={category.name}
              component={Link}
              to={`/category/${category._id}`}
              value={category._id}
            />
          ))}
        </Tabs>
        <div className="product-container">
          <Box className="product-container-2">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Card sx={{ minWidth: 140, maxWidth: 240 }}>
                    <Link
                      to={`/product/${product._id}`}
                      sx={{ textDecoration: "none" }}
                    >
                      <CardMedia
                        component="img"
                        alt={`Product Image ${index}`}
                        height="140"
                        image={product.photos[0]?.url || ""}
                      />
                      <CardContent>
                        <Typography variant="subtitle1" color="text.secondary">
                          {product.name}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: "green", textDecoration: "none" }}
                        >
                          {product.price || ""}$/KG
                        </Typography>
                        <Typography variant="caption">
                          <ShoppingCartIcon sx={{ color: "green" }} />
                        </Typography>
                      </CardActions>
                    </Link>
                  </Card>
                </Box>
              ))
            ) : (
              <p>No products found</p>
            )}
          </Box>
        </div>
      </AppBar>
    </ClientLayout>
  );
}
