import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="#fff"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" >
        {props.name}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }