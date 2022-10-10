import "../styles/globals.css";
import type { AppProps } from "next/app";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";

const theme = createTheme({
  palette: {
    primary: {
      main: "hsl(180, 29%, 50%)",
      light: "hsl(180, 8%, 52%)",
      dark: "hsl(180, 14%, 20%)",
    },
  },

  breakpoints: {
    values: {
      // extra-small
      xs: 0,
      // small
      sm: 375,
      // medium
      md: 900,
      // large
      lg: 1100,
      // extra-large
      xl: 1440,
    },
  },

  typography: {
    fontSize: 15,
    fontFamily: ["League Spartan", "Roboto"].join(","),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
