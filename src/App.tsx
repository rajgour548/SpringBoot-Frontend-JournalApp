import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import JournalPage from "./Pages/JournalPage";
import WeatherPage from "./Pages/WeatherPage";
import AboutPage from "./Pages/AboutPage";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CssBaseline,
  useTheme,
} from "@mui/material";
import ProfileSettings from "./Pages/ProfileSettings";

function App() {
  const theme = useTheme();

  const AuthLayout = ({ children }: { children: React.ReactNode }) => (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #f8f9fa, #e3f2fd)",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="sm">
        {/* Welcome Section */}
        <Box textAlign="center" mb={4}>
          <Typography
            component="h1"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "bold",
              fontSize: { xs: "2rem", md: "2.5rem" },
              letterSpacing: "1px",
              fontFamily: "'Poppins', sans-serif",
              mb: 2,
            }}
          >
            Welcome to JournalApp
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.1rem" },
              color: theme.palette.grey[700],
              fontFamily: "'Roboto Slab', serif",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.8,
              letterSpacing: "0.3px",
            }}
          >
            Capture your thoughts, track your mood, and grow with powerful
            insights. Start by creating an account or log in to continue
            your journey.
          </Typography>
        </Box>

        {/* Auth Card */}
        <Card
          sx={{
            width: "100%",
            borderRadius: 4,
            boxShadow: "0px 8px 30px rgba(0,0,0,0.15)",
            backgroundColor: "background.paper",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>{children}</CardContent>
        </Card>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            mt: 4,
            textAlign: "center",
            fontSize: "0.9rem",
            color: "text.secondary",
          }}
        >
          © {new Date().getFullYear()} JournalApp — Built with ❤️
        </Box>
      </Container>
    </Box>
  );

  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AuthLayout><Signup /></AuthLayout>} />
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="home" element={<Home />}>
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
