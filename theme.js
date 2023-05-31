import React from "react";

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#43a047",
    },
    secondary: {
      main: "#0d47a1",
    },
  },
});

export default theme;