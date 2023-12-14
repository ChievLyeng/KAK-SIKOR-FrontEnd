import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "../style/HomePage.css";
const Product = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 156 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.photos[0].url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className="btn">
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Share
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default Product;
