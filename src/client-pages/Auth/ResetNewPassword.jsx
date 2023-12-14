import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useResetpasswordMutation } from "../../store/slice/userV2Slice";
import FormContainer from "../../components/FormContainer";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [email, setEmail] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetpasswordMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const redirect = "/login"; // Redirect to login page after resetting password

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleInputChange = () => {
    setIsTyping(true);
    setErrorMessage(""); // Clear the error message
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsTyping(false); // Reset the typing state

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // Get the email from local storage
      const storedEmail = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).email
        : "";

      const { data } = await resetPassword({ email: storedEmail, password });
      console.log("Reset Password Data:", data);

      if (data) {
        console.log("Password reset successfully!");
        navigate(redirect);
      } else {
        setErrorMessage("Invalid credentials or server error");
      }
    } catch (err) {
      console.error("Reset Password Error:", err);
      setErrorMessage(
        err?.data?.message || err.error || "Server error occurred"
      );
    }
  };

  return (
    <FormContainer>
      <Typography
        variant="h4"
        className="title"
        sx={{ margin: "24px", textAlign: "center" }}
      >
        Reset Password
      </Typography>

      <form onSubmit={submitHandler}>
        {errorMessage && !isTyping && (
          <Typography color="error" sx={{ marginBottom: "16px" }}>
            {errorMessage}
          </Typography>
        )}
        <FormControl
          fullWidth
          variant="outlined"
          sx={{
            margin: "24px 0",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#82B440",
            },
          }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            New Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
            value={password}
            onChange={(e) => {
              handleInputChange();
              setPassword(e.target.value);
            }}
          />
          <FormHelperText id="outlined-adornment-password-helper-text">
            *Required
          </FormHelperText>
        </FormControl>

        <FormControl
          fullWidth
          variant="outlined"
          sx={{
            margin: " 0",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#82B440",
            },
          }}
        >
          <InputLabel htmlFor="outlined-adornment-confirm-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              handleInputChange();
              setConfirmPassword(e.target.value);
            }}
          />
          <FormHelperText id="outlined-adornment-confirm-password-helper-text">
            *Required
          </FormHelperText>
        </FormControl>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          className="mt-2"
          disabled={isLoading}
          sx={{
            marginTop: "24px",
            backgroundColor: "#82B440",
          }}
        >
          Reset Password
        </Button>
      </form>
    </FormContainer>
  );
}

export default ResetPassword;
