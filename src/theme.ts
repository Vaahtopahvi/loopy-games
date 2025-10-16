import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
      dark: "#1565c0", // hover for contained primary
    },
    background: {
      default: "#0f1119",
      paper: "#181b25",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        },
      },
    },
  },
});

export default theme;
