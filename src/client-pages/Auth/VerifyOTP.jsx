import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useVerificationMutation } from "../../store/slice/userV2Slice";
import FormContainer from "../../components/FormContainer";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [verifyMutation, { isLoading }] = useVerificationMutation();

  const clearError = () => setErrorMessage("");

  const handleInputChange = (e) => {
    setOtp(e.target.value);
    clearError(); // Clear error when user types
  };

  const handleVerify = async () => {
    try {
      clearError();

      // Call the verification mutation with email and otp
      const { data, error } = await verifyMutation({ userOTP: otp });

      console.log("Response from mutation:", data);

      // Check the response and show appropriate messages
      if (data) {
        console.log("Verification successful!");

        navigate("/reset-password");
      } else if (
        error?.statusCode === 401 &&
        error?.message.includes("Invalid OTP")
      ) {
        setErrorMessage("Invalid OTP. Please enter the correct OTP.");
        console.error("Invalid OTP. Please enter the correct OTP.");
      } else {
        const errorText = error?.message || "Verification failed";
        setErrorMessage(errorText);
        console.error(errorText);
      }
    } catch (error) {
      const errorText = error?.message || "Error during verification";
      setErrorMessage(errorText);
      console.error("Error in handleVerify:", error);
      console.error(errorText);
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" className="title">
        Verification
      </Typography>
      <Typography>
        Please Check your Email. We'll send the OTP code to your email.
      </Typography>
      <TextField
        fullWidth
        label="OTP"
        type="text"
        value={otp}
        onChange={handleInputChange}
        helperText={errorMessage || "Enter the OTP code"}
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
        onClick={handleVerify}
        disabled={isLoading}
        fullWidth
        sx={{ backgroundColor: "#82B440" }}
      >
        Verify OTP
      </Button>
    </FormContainer>
  );
};

export default Verification;
