// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// MUI imports
import { ThemeProvider, createTheme, CssBaseline, responsiveFontSizes } from "@mui/material";

// Create a custom theme
let theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // bluish tone
    },
    secondary: {
      main: "#9c27b0", // purple for contrast
    },
    background: {
      default: "#f4f6f8", // soft gray background
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    body1: { lineHeight: 1.7 },
    button: { textTransform: "none", fontWeight: "bold" },
  },
  shape: {
    borderRadius: 10, // softer rounded corners
  },
});

// Make fonts responsive
theme = responsiveFontSizes(theme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
