import React from "react";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Grid, Typography } from "@material-ui/core";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomePage = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError?.data?.message}</Message>
      ) : (
        <>
          <Typography variant="h3" component="h1">
            All Products
          </Typography>
          <Grid container spacing={3}>
            {Array.isArray(products?.products) &&
              products?.products?.map((product) => (
                <Grid item key={product?._id} xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default HomePage;
