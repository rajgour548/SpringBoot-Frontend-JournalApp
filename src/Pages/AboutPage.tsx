// src/Pages/About.tsx
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
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { GridLegacy as Grid } from '@mui/material';

function About() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "primary.main" }}
        >
          About <span style={{ color: "#1976d2" }}>JournalApp</span>
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          maxWidth="700px"
          mx="auto"
        >
          Your digital space to capture thoughts, track emotions, and grow every
          day. JournalApp is designed to bring mindfulness, productivity, and
          positivity into your life.
        </Typography>
      </Box>

      {/* Content Section */}
      <Grid
        container
        spacing={4}
        alignItems="stretch"
        justifyContent="center" // ✅ centers cards when stacked
      >
        {/* Mission */}
        <Grid  item xs={12} sm={8} md={4}>
          <Card
            elevation={4}
            sx={{
              height: "100%",
              borderRadius: 3,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              maxWidth: 350, // ✅ keeps consistent width on center alignment
              margin: "0 auto",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" gutterBottom>
                🌱 Our Mission
              </Typography>
              <Typography color="text.secondary">
                To help people reflect on their journey, one entry at a time.
                Journaling builds awareness and clarity — we want to make that
                simple and enjoyable.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Features */}
        <Grid item xs={12} sm={8} md={4}>
          <Card
            elevation={4}
            sx={{
              height: "100%",
              borderRadius: 3,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              maxWidth: 350,
              margin: "0 auto",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" gutterBottom>
                ✨ Features
              </Typography>
              <List dense>
                {[
                  "Secure sign-up & login with Google OAuth or email",
                  "Create, edit, and delete journal entries anytime",
                  "Beautiful dashboard with real-time weather info",
                  "Sentiment insights to track your mood over time",
                ].map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Why JournalApp */}
        <Grid item xs={12} sm={8} md={4}>
          <Card
            elevation={4}
            sx={{
              height: "100%",
              borderRadius: 3,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              maxWidth: 350,
              margin: "0 auto",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" gutterBottom>
                🤝 Why JournalApp?
              </Typography>
              <Typography color="text.secondary">
                We believe journaling is for everyone — whether you're a student,
                a professional, or someone seeking mindfulness. JournalApp is
                your safe space to write freely and grow.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box textAlign="center" mt={8} color="text.secondary">
      Built with ❤️ by Raj Gour
      </Box>
    </Container>
  );
}

export default About;
