import { useDispatch } from "react-redux";
import { Button, TextField, InputLabel, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";

function ProfileScreen() {
  return (
    <FormContainer>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", margin: "20px 0", paddingTop: "40px " }}
      >
        User Profile
      </Typography>
      <Box>
        <InputLabel>First Name</InputLabel>
        <TextField
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#82B440",
            },
          }}
        />

        <InputLabel>Last Name</InputLabel>
        <TextField
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#82B440",
            },
          }}
        />

        <InputLabel>Email</InputLabel>
        <TextField
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#82B440",
            },
          }}
        />
      </Box>

      <Button
        fullWidth
        type="button"
        variant="contained"
        className="mt-2"
        sx={{
          marginTop: "24px",
          backgroundColor: "#82B440",
          height: "50px",
          fontSize: "1.2rem",
        }}
      >
        Log out
      </Button>

      <Button
        fullWidth
        type="button"
        variant="contained"
        className="mt-2"
        sx={{
          marginTop: "24px",
          marginBottom: "72px",
          backgroundColor: "#82B440",
          height: "50px",
          fontSize: "1.2rem",
        }}
      >
        Edit
      </Button>
    </FormContainer>
  );
}

export default ProfileScreen;
