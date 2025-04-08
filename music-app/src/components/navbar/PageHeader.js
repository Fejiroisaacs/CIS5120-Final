import React from "react";
import "./NavBar.css";
import { Typography } from "@mui/material";

const PageHeader = ({ title }) => {
  return (
    <div className="top-bar">
      <div className="navbar-content">
        <Typography
          fontFamily={"Montserrat, sans-serif"}
          fontSize={"36px"}
        >
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default PageHeader;