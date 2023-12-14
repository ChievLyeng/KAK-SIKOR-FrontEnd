import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useVerificationMutation } from "../../store/slice/userV2Slice";
import FormContainer from "../../components/FormContainer";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [otp, setOtp] = useState("");
  const [verifyMutation, { isLoading }] = useVerificationMutation();

  const handleVerify = async () => {
    try {
      // Call the verification mutation with email and otp
      const { data, error } = await verifyMutation({ userOTP: otp });

      console.log("Response from mutation:", data);

      // Check the response and show appropriate messages
      if (data) {
        // Handle successful verification
        console.log("Verification successful!");

        // Navigate to the reset password screen upon successful verification
        navigate("/reset-password"); // Change "/reset-password" to the actual path of your reset password screen
      } else if (
        error?.statusCode === 401 &&
        error?.message.includes("Invalid OTP")
      ) {
        // Handle case of Invalid OTP
        console.error("Invalid OTP. Please enter the correct OTP.");
      } else {
        // Handle other error cases
        console.error(error?.message || "Verification failed");
      }
    } catch (error) {
      console.error("Error in handleVerify:", error);
      // Handle errors during verification
      console.error(error?.message || "Error during verification");
    }
  };

  return (
    <FormContainer>
      <Typography
        variant="h4"
        className="title"
        sx={{ margin: "24px", textAlign: "center" }}
      >
        Verification
      </Typography>
      <TextField
        fullWidth
        label="OTP"
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        helperText="Enter the OTP code"
        margin="normal"
        variant="outlined"
      />
      <Button
        type="button"
        variant="contained"
        onClick={handleVerify}
        disabled={isLoading}
        fullWidth
        sx={{ backgroundColor: "#82B440", margin: "24px 0" }}
      >
        Verify OTP
      </Button>
    </FormContainer>
  );
};

export default Verification;
