import { useEffect, useState } from "react";
import { fetchHomeData, type HomeData } from "../Services/HomeServices";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";

export default function WeatherPage() {
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
      <Container sx={{ py: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  if (!data)
    return (
      <Container sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          Loading...
        </Typography>
      </Container>
    );

  const staticCards = [
    {
      title: "Track Your Mood",
      desc: "Log how you feel each day and track your emotions.",
      emoji: "😊",
    },
    {
      title: "Write Journal",
      desc: "Capture your thoughts and memories anytime.",
      emoji: "✍️",
    },
    {
      title: "Analyze Insights",
      desc: "Understand patterns in your mood and productivity.",
      emoji: "📊",
    },
    {
      title: "Grow & Reflect",
      desc: "Use your journal to grow emotionally and mentally.",
      emoji: "🌱",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Top Section: Dynamic Data */}
      <Card
        elevation={4}
        sx={{
          borderRadius: 3,
          mb: 6,
          textAlign: "center",
          p: { xs: 3, md: 5 },
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome, {data.actualName}
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Hi <strong>{data.actualName}</strong>! 🌟 <br />
          If you've opted for <strong>Sentiment Analysis</strong>, we'll send you a
          personalized report every week summarizing the average mood of your
          journal entries directly to <strong>{data.email}</strong>. Keep journaling
          and watch your insights grow! ✨
        </Typography>

        <Typography variant="h6" gutterBottom>
          {data.greeting}
        </Typography>
        <Typography variant="body1">
          <strong>Weather:</strong> {data.weatherDescriptions.join(", ")}
        </Typography>
        <Typography variant="body1">
          <strong>Feels Like:</strong> {data.feelsLike}°C
        </Typography>
      </Card>

      {/* Features Section */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          What JournalApp Does
        </Typography>
      </Box>

      {/* Responsive Scrollable Feature Cards */}
      <Stack
        direction="row"
        spacing={3}
        sx={{
          overflowX: "auto",
          pb: 2,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {staticCards.map((card, index) => (
          <Card
            key={index}
            elevation={3}
            sx={{
              minWidth: { xs: 250, sm: 280 },
              flex: "0 0 auto",
              borderRadius: 3,
              textAlign: "center",
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h3" component="div">
                {card.emoji}
              </Typography>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
