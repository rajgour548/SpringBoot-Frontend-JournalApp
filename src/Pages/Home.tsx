
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

import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";

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

  const ambientGlow = {
    position: "absolute" as const,
    width: { xs: 320, md: 560 },
    height: { xs: 320, md: 560 },
    borderRadius: "50%",
    background: (theme: any) =>
      theme.palette.mode === "light"
        ? "radial-gradient(circle, rgba(234, 226, 247, 0.6) 0%, rgba(255,255,255,0) 70%)"
        : "radial-gradient(circle, rgba(141, 122, 184, 0.12) 0%, rgba(0,0,0,0) 70%)",
    pointerEvents: "none" as const,
    zIndex: 0,
  };

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          aria-hidden="true"
          sx={{ ...ambientGlow, top: -160, left: "35%" }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Alert
            severity="error"
            sx={{
              borderRadius: 3,
              backdropFilter: "blur(16px)",
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(22,20,30,0.75)",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 10px 30px -5px rgba(50,40,80,0.06)",
            }}
          >
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          bgcolor: "background.default",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            ...ambientGlow,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 360,
            p: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            borderRadius: 5,
            bgcolor: (theme: any) =>
              theme.palette.mode === "light"
                ? "rgba(255,255,255,0.85)"
                : "rgba(22,20,30,0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid",
            borderColor: (theme: any) =>
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.05)"
                : "rgba(255,255,255,0.08)",
            boxShadow: (theme: any) =>
              theme.palette.mode === "light"
                ? "0 10px 30px -5px rgba(50,40,80,0.06)"
                : "0 10px 30px -5px rgba(0,0,0,0.3)",
          }}
        >
          <CircularProgress
            size={38}
            thickness={4}
            sx={{ color: "#8D7AB8", mb: 2.5 }}
          />

          <Typography
            variant="h6"
            fontWeight={800}
            sx={{ letterSpacing: "-0.025em" }}
          >
            Preparing your space
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, lineHeight: 1.8 }}
          >
            Getting your journals ready...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* Ambient lavender background */}
      <Box
        aria-hidden="true"
        sx={{
          ...ambientGlow,
          top: -230,
          left: "15%",
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          ...ambientGlow,
          width: { xs: 260, md: 420 },
          height: { xs: 260, md: 420 },
          top: "42%",
          right: -180,
          background: (theme: any) =>
            theme.palette.mode === "light"
              ? "radial-gradient(circle, rgba(200, 137, 157, 0.12) 0%, rgba(255,255,255,0) 70%)"
              : "radial-gradient(circle, rgba(200, 137, 157, 0.07) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Existing header and profile navigation */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Header actualName={data.actualName} email={data.email} />
      </Box>

      {/* Existing nested page content */}
      <Container
        sx={{
          flex: 1,
          py: { xs: 3, sm: 4 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Outlet />
      </Container>

      {/* Pastel glass-style footer */}
      <Box
        component="footer"
        sx={{
          position: "relative",
          zIndex: 1,
          mt: "auto",
          py: 2.5,
          px: 2,
          textAlign: "center",
          bgcolor: (theme: any) =>
            theme.palette.mode === "light"
              ? "rgba(255,255,255,0.65)"
              : "rgba(22,20,30,0.55)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid",
          borderColor: (theme: any) =>
            theme.palette.mode === "light"
              ? "rgba(0,0,0,0.05)"
              : "rgba(255,255,255,0.08)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.8,
            mb: 0.5,
          }}
        >
          <AutoAwesomeRounded sx={{ fontSize: 16, color: "#8D7AB8" }} />

          <Typography
            variant="body2"
            fontWeight={700}
            sx={{
              color: (theme: any) =>
                theme.palette.mode === "light" ? "#6F5D96" : "#C8B9E8",
              letterSpacing: "0.01em",
            }}
          >
            JournalApp
          </Typography>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          © {new Date().getFullYear()} JournalApp — Capture, Reflect &amp; Grow
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;

