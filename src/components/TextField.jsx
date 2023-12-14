import React from "react";
import { TextField } from "@mui/material";

const StyledTextField = ({
  fullWidth,
  label,
  type,
  name,
  value,
  onChange,
  margin,
  variant,
  helperText,
  error,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      margin={margin}
      variant={variant}
      helperText={helperText}
      error={error}
      sx={{
        margin: "15px 0",
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#82B440",
          },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#82B440",
        },
      }}
    />
  );
};

export default StyledTextField;
