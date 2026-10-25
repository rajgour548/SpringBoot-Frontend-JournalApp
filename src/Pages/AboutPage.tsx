
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

import {
  CheckCircleRounded,
  SpaRounded,
  AutoAwesomeRounded,
  HandshakeRounded,
  MenuBookRounded,
} from "@mui/icons-material";

import { GridLegacy as Grid } from "@mui/material";

function About() {
  const glassCardSx = {
    height: "100%",
    borderRadius: 4,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    maxWidth: 350,
    margin: "0 auto",
    boxSizing: "border-box",
    bgcolor: (theme: any) =>
      theme.palette.mode === "light"
        ? "rgba(255, 255, 255, 0.85)"
        : "rgba(22, 20, 30, 0.75)",
    backdropFilter: "blur(16px)",
    border: "1px solid",
    borderColor: (theme: any) =>
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.05)"
        : "rgba(255, 255, 255, 0.08)",
    boxShadow: (theme: any) =>
      theme.palette.mode === "light"
        ? "0 10px 30px -5px rgba(50, 40, 80, 0.06)"
        : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: (theme: any) =>
        theme.palette.mode === "light"
          ? "0 18px 36px -8px rgba(80, 60, 120, 0.14)"
          : "0 18px 36px -8px rgba(0, 0, 0, 0.4)",
    },
  };

  const iconBoxSx = {
    width: 58,
    height: 58,
    mx: "auto",
    mb: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    bgcolor: (theme: any) =>
      theme.palette.mode === "light"
        ? "rgba(234, 226, 247, 0.8)"
        : "rgba(141, 122, 184, 0.18)",
    color: "#8D7AB8",
  };

  const features = [
    "Secure sign-up & login with Google OAuth or email",
    "Create, edit, and delete journal entries anytime",
    "Beautiful dashboard with real-time weather info",
    "Sentiment insights to track your mood over time",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* Soft ambient lavender background */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: -150,
          left: "50%",
          transform: "translateX(-50%)",
          width: 650,
          height: 500,
          borderRadius: "50%",
          background: (theme: any) =>
            theme.palette.mode === "light"
              ? "radial-gradient(circle, rgba(234, 226, 247, 0.6) 0%, rgba(255,255,255,0) 70%)"
              : "radial-gradient(circle, rgba(141, 122, 184, 0.10) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 1 }}
      >
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1.25}
            sx={{ mb: 2 }}
          >
            <MenuBookRounded
              sx={{
                fontSize: { xs: 30, sm: 36 },
                color: "#8D7AB8",
              }}
            />

            <Typography
              variant="h3"
              component="h1"
              fontWeight={800}
              sx={{
                letterSpacing: "-0.045em",
                fontSize: {
                  xs: "2rem",
                  sm: "2.6rem",
                  md: "3rem",
                },
              }}
            >
              About{" "}
              <Box
                component="span"
                sx={{
                  color: "#8D7AB8",
                  display: "inline",
                }}
              >
                JournalApp
              </Box>
            </Typography>
          </Stack>

          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="700px"
            mx="auto"
            sx={{
              fontWeight: 400,
              lineHeight: 1.85,
              fontSize: { xs: "1rem", sm: "1.15rem" },
              letterSpacing: "0.005em",
            }}
          >
            Your digital space to capture thoughts, track emotions, and grow
            every day. JournalApp is designed to bring mindfulness,
            productivity, and positivity into your life.
          </Typography>
        </Box>

        {/* Content Section — original three-card layout preserved */}
        <Grid
          container
          spacing={4}
          alignItems="stretch"
          justifyContent="center"
        >
          {/* Mission */}
          <Grid item xs={12} sm={8} md={4}>
            <Card sx={glassCardSx}>
              <CardContent
                sx={{
                  p: 3.5,
                  flexGrow: 1,
                  "&:last-child": { pb: 3.5 },
                }}
              >
                <Box sx={iconBoxSx}>
                  <SpaRounded sx={{ fontSize: 30 }} />
                </Box>

                <Typography
                  variant="h5"
                  fontWeight={800}
                  gutterBottom
                  sx={{
                    letterSpacing: "-0.025em",
                    mb: 1.5,
                  }}
                >
                  Our Mission
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ lineHeight: 1.9, fontSize: "0.96rem" }}
                >
                  To help people reflect on their journey, one entry at a
                  time. Journaling builds awareness and clarity — we want to
                  make that simple and enjoyable.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Features */}
          <Grid item xs={12} sm={8} md={4}>
            <Card sx={glassCardSx}>
              <CardContent
                sx={{
                  p: 3.5,
                  flexGrow: 1,
                  "&:last-child": { pb: 3.5 },
                }}
              >
                <Box sx={iconBoxSx}>
                  <AutoAwesomeRounded sx={{ fontSize: 30 }} />
                </Box>

                <Typography
                  variant="h5"
                  fontWeight={800}
                  gutterBottom
                  sx={{
                    letterSpacing: "-0.025em",
                    mb: 1.5,
                  }}
                >
                  Features
                </Typography>

                <List dense disablePadding sx={{ textAlign: "left" }}>
                  {features.map((feature, index) => (
                    <ListItem
                      key={index}
                      disableGutters
                      alignItems="flex-start"
                      sx={{ py: 1 }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 32,
                          pt: 0.25,
                          color: "#8D7AB8",
                        }}
                      >
                        <CheckCircleRounded fontSize="small" />
                      </ListItemIcon>

                      <ListItemText
                        primary={feature}
                        slotProps={{
                          primary: {
                            sx: {
                              fontSize: "0.91rem",
                              lineHeight: 1.75,
                              color: "text.secondary",
                            },
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Why JournalApp */}
          <Grid item xs={12} sm={8} md={4}>
            <Card sx={glassCardSx}>
              <CardContent
                sx={{
                  p: 3.5,
                  flexGrow: 1,
                  "&:last-child": { pb: 3.5 },
                }}
              >
                <Box sx={iconBoxSx}>
                  <HandshakeRounded sx={{ fontSize: 30 }} />
                </Box>

                <Typography
                  variant="h5"
                  fontWeight={800}
                  gutterBottom
                  sx={{
                    letterSpacing: "-0.025em",
                    mb: 1.5,
                  }}
                >
                  Why JournalApp?
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ lineHeight: 1.9, fontSize: "0.96rem" }}
                >
                  We believe journaling is for everyone — whether you're a
                  student, a professional, or someone seeking mindfulness.
                  JournalApp is your safe space to write freely and grow.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box
          textAlign="center"
          mt={8}
          color="text.secondary"
          sx={{
            fontSize: "0.9rem",
            letterSpacing: "0.015em",
          }}
        >
          Built with{" "}
          <Box
            component="span"
            sx={{ color: "#C8899D", fontWeight: 700 }}
          >
            ♥
          </Box>{" "}
          by Raj Gour
        </Box>
      </Container>
    </Box>
  );
}

export default About;
