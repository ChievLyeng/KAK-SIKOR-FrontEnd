import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const SaleCard = ({ title, value, icon }) => {
  return (
    <Box className="outside-box">
      <Card variant="outlined" className="sale-card">
        <CardContent className="MuiCardContent-root">
          <Typography
            className="TypographyTittle" gutterBottom>
            {title}
          </Typography>

          <Typography variant="h5" component="div" className="saleTypography">
            {value}
          </Typography>

          <Box className="customBox">
            {React.cloneElement(icon, {
              className: "customIcon",
            })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SaleCard;
