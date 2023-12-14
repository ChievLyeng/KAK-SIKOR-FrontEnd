import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordFields = ({
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isTyping,
  handleInputChange,
}) => {
  return (
    <>
      <FormControl fullWidth variant="outlined" margin="normal">
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

      <FormControl fullWidth variant="outlined" margin="normal">
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
    </>
  );
};

export default PasswordFields;
