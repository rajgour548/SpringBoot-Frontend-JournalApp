import { useEffect, useState } from "react";
import { fetchHomeData } from "../Services/HomeServices";
import type { HomeData } from "../Services/HomeServices";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import {
  Container,
  Box,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";

function Home() {
  const [data, setData] = useState<HomeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchHomeData();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    })();
  }, []);

  if (error)
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  if (!data)
    return (
      <Container
        sx={{
          py: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress color="primary" />
      </Container>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Header */}
      <Header actualName={data.actualName} email={data.email} userName={data.userName} />

      {/* Content Area */}
      <Container sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 2,
          mt: "auto",
          bgcolor: "primary.main",
          color: "black",
        }}
      >
        <Typography variant="body2" color="white">
          © {new Date().getFullYear()} JournalApp — Capture, Reflect & Grow 🌟
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
