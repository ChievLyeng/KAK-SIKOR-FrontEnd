import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForgotpasswordMutation } from "../../store/slice/userV2Slice";
import { toast } from "react-toastify";
import "../../style/UserRegister.css";

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
        toast.success("Password reset link sent successfully!");
      } else {
        toast.error("Error sending reset link");
      }
    } catch (error) {
      console.error("Error in handleForgotPassword:", error);
      toast.error(error?.data?.message || "Error sending reset link");
    }
  };

  return (
    <div className="form-container ">
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
    </div>
  );
};

export default ForgotPassword;
