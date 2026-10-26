
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import type { ReactNode } from "react";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import JournalPage from "./Pages/JournalPage";
import WeatherPage from "./Pages/WeatherPage";
import AboutPage from "./Pages/AboutPage";
import ProfileSettings from "./Pages/ProfileSettings";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CssBaseline,
  useTheme,
  Alert,
} from "@mui/material";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";

function App() {
  const theme = useTheme();

  const AuthLayout = ({ children }: { children: ReactNode }) => (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
      }}
    >
      {/* Ambient lavender glow */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          width: { xs: 280, md: 440 },
          height: { xs: 280, md: 440 },
          top: { xs: -100, md: -150 },
          left: { xs: -100, md: -120 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(234, 226, 247, 0.7) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Ambient pastel-pink glow */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          width: { xs: 300, md: 460 },
          height: { xs: 300, md: 460 },
          bottom: { xs: -120, md: -160 },
          right: { xs: -100, md: -120 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(248, 225, 235, 0.6) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Welcome section */}
        <Box textAlign="center" mb={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 1.5,
            }}
          >
            <AutoAwesomeRounded
              sx={{
                color: "#C8899D",
                fontSize: { xs: 23, md: 27 },
              }}
            />

            <Typography
              component="h1"
              sx={{
                color: theme.palette.mode === "light" ? "#8D7AB8" : "#C5B5E8",
                fontWeight: 800,
                fontSize: { xs: "1.8rem", md: "2.35rem" },
                letterSpacing: "-0.8px",
                lineHeight: 1.25,
              }}
            >
              Welcome to JournalApp
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 520,
              mx: "auto",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              color: "text.secondary",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.8,
              letterSpacing: "0.2px",
            }}
          >
            Capture your thoughts, track your mood, and grow with powerful
            insights. Start by creating an account or log in to continue your
            journey.
          </Typography>
        </Box>


{/* Free-tier backend notice */}
<Alert
  severity="info"
  sx={{
    mb: 3,
    borderRadius: 2,
    alignItems: "center",
    "& .MuiAlert-message": {
      fontSize: { xs: "0.8rem", sm: "0.875rem" },
      lineHeight: 1.6,
    },
  }}
>
  <strong>Demo hosting notice:</strong> This app runs on a free hosting
  plan. After a period of inactivity, the backend may go to sleep,
  so your first request might take a little longer while it wakes up.
  Thanks for your patience!
</Alert>


        {/* Authentication card */}
        <Card
          elevation={0}
          sx={{
            width: "100%",
            borderRadius: { xs: "22px", sm: "28px" },
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.85)"
                : "rgba(22, 20, 30, 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid",
            borderColor:
              theme.palette.mode === "light"
                ? "rgba(0, 0, 0, 0.05)"
                : "rgba(255, 255, 255, 0.08)",
            boxShadow:
              theme.palette.mode === "light"
                ? "0 10px 30px -5px rgba(50, 40, 80, 0.08)"
                : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <CardContent
            sx={{
              p: { xs: 2.5, sm: 3.5, md: 4 },
              "&:last-child": {
                pb: { xs: 2.5, sm: 3.5, md: 4 },
              },
            }}
          >
            {children}
          </CardContent>
        </Card>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            mt: 2,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.85rem",
              letterSpacing: "0.2px",
            }}
          >
            © {new Date().getFullYear()} JournalApp — Built with{" "}
            <Box
              component="span"
              sx={{
                color: "#C8899D",
                fontWeight: 700,
              }}
            >
              ♥
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );

  return (
    <>
      <CssBaseline />

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthLayout>
                <Signup />
              </AuthLayout>
            }
          />

          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />

          <Route path="/home" element={<Home />}>
            <Route index element={<WeatherPage />} />
            <Route path="journal" element={<JournalPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;