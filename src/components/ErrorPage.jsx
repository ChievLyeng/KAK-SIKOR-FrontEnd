import "../style/ErrorPage.css"; // Import the CSS file
import ClientLayout from "./common/ClientLayout";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";

const ErrorPage = () => {
  return (
    <ClientLayout>
      <Box className="error-container">
        <Typography sx={{ fontWeight: "bold" }} variant="h2">
          404 - Page Not Found
        </Typography>
        <Typography>
          Oops! The page you are looking for does not exist.
        </Typography>
      </Box>
    </ClientLayout>
  );
};

export default ErrorPage;
