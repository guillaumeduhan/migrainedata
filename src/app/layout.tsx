"use client";

import "./globals.scss";
import React, { useState } from "react";
import { lightTheme, darkTheme } from "./theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthContextProvider } from "./context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);
  const switchTheme: any = () => {
    setIsDark(!isDark);
  };

  return (
    <html lang="en">
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <body>
            <AuthContextProvider switchTheme={switchTheme}>
              {children}
            </AuthContextProvider>
          </body>
        </LocalizationProvider>
      </ThemeProvider>
    </html>
  );
}
