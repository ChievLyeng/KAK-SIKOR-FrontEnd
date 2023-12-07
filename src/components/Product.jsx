import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        {product.photos && product.photos.length > 0 ? (
          <CardMedia
            component="img"
            alt="Product Image"
            height="200"
            image={product.photos[0].url} // Fix: Accessing the 'url' property
          />
        ) : (
          <div>No Image Available</div>
        )}
      </Link>

      <CardContent>
        <Link to={`/product/${product._id}`}>
          <Typography variant="h6" component="div">
            <strong>{product.name}</strong>
          </Typography>
        </Link>

        <Typography variant="h5" component="h3">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
