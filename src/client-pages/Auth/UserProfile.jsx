import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, InputLabel, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { useEffect } from "react";
import { useLogoutMutation } from "../../store/slice/userV2Slice";
import {
  clearCredentials,
  setCredentials,
} from "../../store/slice/authV2Slice";

function ProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load user info from local storage on component mount
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedUserInfo) {
      // If user info is found in local storage, parse and set it in the Redux store
      dispatch(setCredentials(JSON.parse(storedUserInfo)));
    }
  }, [dispatch]);
  const { userInfo } = useSelector((state) => state.auth);

  // Use the useLogoutMutation hook
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();

      // Clear user information from the Redux store
      dispatch(clearCredentials());

      // Clear from local storage
      localStorage.removeItem("userInfo");

      // Redirect to the login page
      navigate("/userlogin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (userInfo) {
    const { data } = userInfo;
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
            value={data?.user.firstName}
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
          onClick={handleLogout}
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
  return (
    <Button
      fullWidth
      type="button"
      variant="contained"
      className="mt-2"
      onClick={handleLogout}
      sx={{
        marginTop: "24px",
        backgroundColor: "#82B440",
        height: "50px",
        fontSize: "1.2rem",
      }}
    >
      Log out
    </Button>
  );
}

export default ProfileScreen;
