import React, { useState, useEffect } from "react";
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
import { useResetpasswordMutation } from "../../store/slice/userV2Slice";
import FormContainer from "../../components/FormContainer";
import { useSelector } from "react-redux";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetpasswordMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const redirect = "/userlogin"; // Redirect to login page after resetting password

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const validatePassword = (password) => {
    setPasswordValidation({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const [errorFields, setErrorFields] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleInputChange = (e, inputType) => {
    setIsTyping(true);
    setErrorMessage(""); // Clear the error message
    const newPassword = e.target.value;
    if (inputType === "newPassword") {
      setPassword(newPassword);
      validatePassword(newPassword);
      setErrorFields({ ...errorFields, password: false });
    } else {
      setConfirmPassword(newPassword);
      setErrorFields({ ...errorFields, confirmPassword: false });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsTyping(false); // Reset the typing state

    if (!password || !confirmPassword) {
      setErrorMessage("Please fill in all required fields");
      setErrorFields({
        password: !password,
        confirmPassword: !confirmPassword,
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setErrorFields({ password: true, confirmPassword: true });
      return;
    }

    try {
      // Get the email from local storage
      const storedEmail = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).email
        : "";

      console.log(storedEmail);

      const { data } = await resetPassword({
        email: storedEmail,
        newPassword: password,
        confirmPassword: confirmPassword,
      });

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
      <Typography variant="h4" className="title" sx={{ margin: "24px 0" }}>
        Reset Password
      </Typography>
      <Typography>
        This new password should be different from the previous password
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
          error={errorFields.password}
          sx={{
            margin: "24px 0",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: errorFields.password ? "red" : "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: errorFields.password ? "red" : "#82B440",
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
            onChange={(e) => handleInputChange(e, "newPassword")}
          />
          <FormHelperText
            id="outlined-adornment-password-helper-text"
            sx={{ color: errorFields.password ? "red" : "inherit" }}
          >
            {errorFields.password
              ? "Please enter a valid password"
              : "*Required"}
          </FormHelperText>
          {isTyping && (
            <div style={{ marginTop: "8px", marginLeft: "15px" }}>
              {Object.keys(passwordValidation).map((key) => (
                <Typography
                  key={key}
                  variant="caption"
                  color={passwordValidation[key] ? "green" : "red"}
                  sx={{
                    display: "flex",
                  }}
                >
                  {passwordValidation[key] ? "✓" : "✗"} {key}
                </Typography>
              ))}
            </div>
          )}
        </FormControl>

        <FormControl
          fullWidth
          variant="outlined"
          error={errorFields.confirmPassword}
          sx={{
            margin: " 0",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: errorFields.confirmPassword ? "red" : "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: errorFields.confirmPassword ? "red" : "#82B440",
            },
          }}
        >
          <InputLabel htmlFor="outlined-adornment-confirm-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e, "confirmPassword")}
          />
          <FormHelperText
            id="outlined-adornment-confirm-password-helper-text"
            sx={{ color: errorFields.confirmPassword ? "red" : "inherit" }}
          >
            {errorFields.confirmPassword
              ? "Passwords do not match"
              : "*Required"}
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
