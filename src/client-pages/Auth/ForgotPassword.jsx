import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForgotpasswordMutation } from "../../store/slice/userV2Slice";
import FormContainer from "../../components/FormContainer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotpasswordMutation();

  const handleForgotPassword = async () => {
    try {
      console.log("Email before mutation call:", email);

      // Call the forgotPassword mutation
      const response = await forgotPassword({ email });

      console.log("Response from mutation:", response);

      // Check the response and show appropriate messages
      if (response.data) {
        // Save the email to local storage
        localStorage.setItem("userInfo", JSON.stringify({ email }));

        console.log("Password reset link sent successfully!");
      } else {
        console.error("Error sending reset link");
      }
    } catch (error) {
      console.error("Error in handleForgotPassword:", error);
      console.error(error?.data?.message || "Error sending reset link");
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" className="title">
        Forgot Password
      </Typography>
      <TextField
        fullWidth
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        helperText="Enter your email address"
        margin="normal"
        variant="outlined"
      />
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleForgotPassword}
        disabled={isLoading}
        fullWidth
      >
        Send Reset Link
      </Button>
    </FormContainer>
  );
};

export default ForgotPassword;
