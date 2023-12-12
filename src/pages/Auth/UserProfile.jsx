import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField, InputLabel, Box, Typography } from "@mui/material";
import { useLogoutMutation } from "../../store/slice/userV2Slice";
import {
  clearCredentials,
  setCredentials,
} from "../../store/slice/authV2Slice";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";

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

  // Assuming user information is stored in the Redux state
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
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleUpdate = async () => {};

  // Render user information on the profile screen
  if (userInfo) {
    const { data } = userInfo;
    return (
      <FormContainer>
        <Typography variant="h4" sx={{ textAlign: "center", margin: "20px 0" }}>
          User Profile
        </Typography>
        <Box>
          <InputLabel>First Name</InputLabel>
          <TextField
            fullWidth
            value={data?.user.firstName}
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
            value={data?.user.lastName}
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
            value={data?.user.email}
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
          //   disabled={isLoading}
          sx={{
            marginTop: "24px",
            backgroundColor: "#82B440",
            height: "50px", // Adjust the height as needed
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
          onClick={handleUpdate}
          //   disabled={isLoading}
          sx={{
            marginTop: "24px",
            marginBottom: "72px",
            backgroundColor: "#82B440",
            height: "50px", // Adjust the height as needed
            fontSize: "1.2rem",
          }}
        >
          Edit
        </Button>
      </FormContainer>
    );
  }
  return <p>No user Data</p>;
}

export default ProfileScreen;
