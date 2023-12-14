import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForgotpasswordMutation } from "../../store/slice/userV2Slice";
import FormContainer from "../../components/FormContainer";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPassword, { isLoading }] = useForgotpasswordMutation();

  const handleForgotPassword = async () => {
    try {
      setErrorMessage(""); // Clear previous error message

      if (!email) {
        setErrorMessage("Email is required");
        return;
      }

      // Email format validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Invalid email format");
        return;
      }

      console.log("Email before mutation call:", email);

      // Call the forgotPassword mutation
      const response = await forgotPassword({ email });

      console.log("Response from mutation:", response);

      // Check the response and show appropriate messages
      if (response.data) {
        // Save the email to local storage
        localStorage.setItem("userInfo", JSON.stringify({ email }));

        console.log("Password reset link sent successfully!");

        // Navigate to the OTP screen upon successful password reset
        navigate("/verify");
      } else {
        const errorText =
          response.error?.data?.message || "Error sending reset link";
        setErrorMessage(errorText);
        console.error(errorText);
      }
    } catch (error) {
      const errorText = error?.data?.message || "Error sending reset link";
      setErrorMessage(errorText);
      console.error("Error in handleForgotPassword:", error);
      console.error(errorText);
    }
  };

  const clearError = () => {
    setErrorMessage("");
  };

  const handleBlur = () => {
    if (!email) {
      setErrorMessage("Email is required");
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" className="title" sx={{ margin: "24px" }}>
        Forgot Password
      </Typography>
      <Typography>
        Don’t worry. Resetting your password is easy. Just tell us the email
        address you registered with. And please wait for the notification alert
        in your email.
      </Typography>
      <TextField
        fullWidth
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          clearError(); // Clear error when user types
        }}
        onBlur={handleBlur}
        helperText={errorMessage || "Enter your email address"}
        error={Boolean(errorMessage)}
        margin="normal"
        variant="outlined"
        sx={{
          margin: "34px 0",
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: errorMessage ? "red" : "#82B440",
            },
          "& .MuiInputLabel-root.Mui-focused": {
            color: errorMessage ? "red" : "#82B440",
          },
        }}
      />

      <Button
        type="button"
        variant="contained"
        onClick={handleForgotPassword}
        disabled={isLoading}
        fullWidth
        sx={{ backgroundColor: "#82B440" }}
      >
        Send Reset Link
      </Button>
    </FormContainer>
  );
};

export default ForgotPassword;
