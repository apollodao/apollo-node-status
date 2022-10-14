import {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FED200",
    },
  },
});

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Head>
        <title>Apollo Network Status</title>
        <meta
          name="description"
          content="Quick Dashboard to browse Apollo Resources"
        />
        <link rel="stylesheet" href="https://use.typekit.net/gtf4unz.css" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              fontFamily: "omnes-pro",
            },
          }}
        />
        {children}
      </ThemeProvider>
    </div>
  );
};
