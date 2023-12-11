import React from "react";
import { CircularProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <CircularProgress
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    />
  );
};

export default Loader;
