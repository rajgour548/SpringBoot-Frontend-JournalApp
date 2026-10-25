import { useEffect, useState } from "react";
import {
  fetchHomeData,
  type HomeData,
} from "../Services/HomeServices";
import {
  fetchDashboardStats,
  type DashboardStats,
} from "../Services/DashboardService";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

const features = [
  {
    emoji: "✍️",
    title: "Write freely",
    description: "Capture your thoughts, experiences, and little moments.",
    color: "#EAE2F7",
  },
  {
    emoji: "🌷",
    title: "Understand yourself",
    description: "Explore the emotions and patterns in your writing.",
    color: "#F8E5EB",
  },
  {
    emoji: "🌱",
    title: "Grow at your pace",
    description: "Make reflection a gentle part of your daily routine.",
    color: "#E0EFE6",
  },
  {
    emoji: "☁️",
    title: "Find your calm",
    description: "Create a little space to pause and reconnect.",
    color: "#E2EBF8",
  },
];

const moodColors: Record<string, string> = {
  POSITIVE: "#8D7AB8",
  NEUTRAL: "#D2AD70",
  NEGATIVE: "#C8899D",
};

const emotionColors = [
  "#EEE7F8",
  "#F8E7EC",
  "#E2EFE8",
  "#E4EBF8",
  "#F8EFD9",
];

// Base reusable Card Style for consistent alignment & depth
const cardBaseSx = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 5,
  boxSizing: "border-box",
  bgcolor: (theme: any) =>
    theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(22, 20, 30, 0.75)",
  backdropFilter: "blur(16px)",
  border: "1px solid",
  borderColor: (theme: any) =>
    theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.08)",
  boxShadow: (theme: any) =>
    theme.palette.mode === "light"
      ? "0 10px 30px -5px rgba(50, 40, 80, 0.04)"
      : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
};

const cardContentSx = {
  p: { xs: 3, sm: 3.5 },
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  "&:last-child": { pb: { xs: 3, sm: 3.5 } },
};

export default function WeatherPage() {
  const [data, setData] = useState<HomeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dashboardStats, setDashboardStats] =
    useState<DashboardStats | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadHomeData = async () => {
      try {
        const result = await fetchHomeData();
        if (active) setData(result);
      } catch (err: unknown) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading your home page."
          );
        }
      }
    };

    loadHomeData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadDashboardStats = async () => {
      try {
        const stats = await fetchDashboardStats();
        if (active) setDashboardStats(stats);
      } catch (err) {
        console.error("Failed to load dashboard statistics:", err);
      } finally {
        if (active) setDashboardLoading(false);
      }
    };

    loadDashboardStats();

    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ borderRadius: 4, fontWeight: 500 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <CircularProgress size={52} thickness={3.5} sx={{ color: "primary.main" }} />
          <Typography color="text.secondary" fontWeight={500} variant="body1">
            Preparing your personal space...
          </Typography>
        </Stack>
      </Container>
    );
  }

  const stats = dashboardStats;

  const statCards = [
    {
      label: "Journal entries",
      value: stats?.totalEntries ?? "—",
      emoji: "📚",
      accent: "#8D7AB8",
      helper: "Your collection of thoughts",
    },
    {
      label: "This month",
      value: stats?.entriesThisMonth ?? "—",
      emoji: "🗓️",
      accent: "#67998B",
      helper: "Entries written this month",
    },
    {
      label: "Most frequent mood",
      value:
        stats?.overallMood === "NO_DATA"
          ? "Not yet available"
          : (stats?.overallMood ?? "—"),
      emoji: "💗",
      accent: "#C8899D",
      helper: "Based on analyzed entries",
    },
    {
      label: "Writing streak",
      value: stats ? `${stats.currentStreak} days` : "—",
      emoji: "✨",
      accent: "#C69B57",
      helper: "Consecutive writing days",
    },
  ];

  const moodEntries = Object.entries(stats?.moodDistribution ?? {});
  const totalAnalyzedEntries = moodEntries.reduce(
    (sum, [, count]) => sum + count,
    0
  );

  const emotionEntries = Object.entries(stats?.frequentEmotions ?? {})
    .sort((a, b) => b[1] - a[1]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: { xs: 8, md: 12 },
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Ambient Glows */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: -150,
          right: "5%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background: (theme) =>
            theme.palette.mode === "light"
              ? "radial-gradient(circle, rgba(234, 226, 247, 0.6) 0%, rgba(255,255,255,0) 70%)"
              : "radial-gradient(circle, rgba(141, 122, 184, 0.08) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 3, sm: 5, md: 7 },
          px: { xs: 2.5, sm: 4 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack spacing={{ xs: 4, md: 6 }}>
          {/* Welcome Banner */}
          <Card
            elevation={0}
            sx={{
              ...cardBaseSx,
              position: "relative",
              overflow: "hidden",
              borderRadius: { xs: 5, md: 6 },
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, #F5EFFC 0%, #FDF8FA 50%, #F2F7F4 100%)"
                  : "linear-gradient(135deg, rgba(32, 28, 42, 0.9) 0%, rgba(20, 20, 28, 0.95) 100%)",
            }}
          >
            <CardContent
              sx={{
                p: { xs: 3.5, sm: 5, md: 6 },
                "&:last-child": { pb: { xs: 3.5, sm: 5, md: 6 } },
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                spacing={4}
              >
                <Box sx={{ maxWidth: 620, minWidth: 0 }}>
                  <Chip
                    label="YOUR PERSONAL SPACE"
                    size="small"
                    sx={{
                      mb: 2.5,
                      fontWeight: 800,
                      letterSpacing: 1.2,
                      fontSize: "0.68rem",
                      bgcolor: "rgba(141, 122, 184, 0.15)",
                      color: "primary.main",
                      borderRadius: 2,
                      px: 0.5,
                      py: 0.2,
                    }}
                  />

                  <Typography
                    component="h1"
                    fontWeight={800}
                    sx={{
                      fontSize: { xs: "2.25rem", sm: "2.85rem", md: "3.25rem" },
                      lineHeight: 1.15,
                      letterSpacing: "-0.035em",
                    }}
                  >
                    A little space{" "}
                    <Box
                      component="span"
                      sx={{
                        background: "linear-gradient(135deg, #8D7AB8 0%, #C8899D 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                      }}
                    >
                      just for you.
                    </Box>
                  </Typography>

                  <Typography
                    sx={{
                      mt: 2,
                      lineHeight: 1.8,
                      color: "text.secondary",
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                      fontWeight: 400,
                    }}
                  >
                    Welcome back,{" "}
                    <Box component="span" fontWeight={700} color="text.primary">
                      {data.actualName}
                    </Box>
                    . Take a breath, reflect on your journey, and celebrate the
                    little things that make you who you are.
                  </Typography>
                </Box>

                <Box
                  aria-hidden="true"
                  sx={{
                    alignSelf: { xs: "flex-start", sm: "center" },
                    width: { xs: 88, md: 112 },
                    height: { xs: 88, md: 112 },
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "28px",
                    bgcolor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 0.9)"
                        : "rgba(255, 255, 255, 0.05)",
                    border: "1px solid",
                    borderColor: (theme) =>
                      theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0.1)",
                    fontSize: { xs: "2.75rem", md: "3.5rem" },
                    boxShadow: "0 20px 40px rgba(100, 80, 140, 0.08)",
                  }}
                >
                  🌿
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Statistics Grid */}
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                component="h2"
                variant="h5"
                fontWeight={800}
                sx={{ letterSpacing: "-0.02em" }}
              >
                Your journey so far
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Small reflections can add up to meaningful growth.
              </Typography>
            </Box>

            {dashboardLoading ? (
              <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
                <CircularProgress size={36} thickness={4} />
              </Box>
            ) : (
              <Grid container spacing={2.5} alignItems="stretch">
                {statCards.map((item) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    key={item.label}
                    sx={{ display: "flex", minWidth: 0 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        ...cardBaseSx,
                        "&:hover": {
                          transform: "translateY(-4px)",
                          borderColor: item.accent,
                          boxShadow: `0 16px 32px -8px ${item.accent}25`,
                        },
                      }}
                    >
                      <CardContent sx={cardContentSx}>
                        {/* Header: Label & Emoji Icon */}
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          spacing={1}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={600}
                            noWrap
                          >
                            {item.label}
                          </Typography>

                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              flexShrink: 0,
                              borderRadius: "14px",
                              bgcolor: `${item.accent}15`,
                              display: "grid",
                              placeItems: "center",
                              fontSize: "1.2rem",
                            }}
                          >
                            {item.emoji}
                          </Box>
                        </Stack>

                        {/* Middle & Bottom: Value & Helper text aligned identically */}
                        <Box
                          sx={{
                            mt: 3,
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            fontWeight={800}
                            sx={{
                              color: "text.primary",
                              fontSize:
                                item.label === "Most frequent mood"
                                  ? { xs: "1.2rem", sm: "1.3rem" }
                                  : "2.1rem",
                              lineHeight: 1.15,
                              letterSpacing: "-0.03em",
                              wordBreak: "break-word",
                            }}
                          >
                            {item.value}
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 1.5, fontWeight: 500, lineHeight: 1.4 }}
                          >
                            {item.helper}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          {/* Mood and Emotion Insights */}
          {!dashboardLoading && stats && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography
                  component="h2"
                  variant="h5"
                  fontWeight={800}
                  sx={{ letterSpacing: "-0.02em" }}
                >
                  Your emotional landscape
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Gentle insights from the feelings in your writing.
                </Typography>
              </Box>

              <Grid container spacing={3} alignItems="stretch">
                {/* Mood distribution */}
                <Grid item xs={12} md={6} sx={{ display: "flex", minWidth: 0 }}>
                  <Card elevation={0} sx={cardBaseSx}>
                    <CardContent sx={cardContentSx}>
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            flexShrink: 0,
                            borderRadius: "14px",
                            bgcolor: "rgba(141, 122, 184, 0.12)",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "1.25rem",
                          }}
                        >
                          🎨
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: "-0.01em" }}>
                            Mood distribution
                          </Typography>
                          <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            Your analyzed journal sentiments
                          </Typography>
                        </Box>
                      </Stack>

                      <Box sx={{ mt: 2, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        {totalAnalyzedEntries === 0 ? (
                          <Box sx={{ py: 4, textAlign: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                              Your mood insights will appear here as your journal entries are analyzed.
                            </Typography>
                          </Box>
                        ) : (
                          <Stack spacing={3}>
                            {moodEntries.map(([mood, count]) => {
                              const percentage = (count / totalAnalyzedEntries) * 100;
                              const color = moodColors[mood] ?? "primary.main";

                              return (
                                <Box key={mood}>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    spacing={1}
                                    sx={{ mb: 1 }}
                                  >
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                      <Box
                                        sx={{
                                          width: 10,
                                          height: 10,
                                          borderRadius: "50%",
                                          bgcolor: color,
                                          boxShadow: `0 0 10px ${color}`,
                                        }}
                                      />
                                      <Typography variant="body2" fontWeight={700}>
                                        {mood.charAt(0) + mood.slice(1).toLowerCase()}
                                      </Typography>
                                    </Stack>

                                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                      {count} · {Math.round(percentage)}%
                                    </Typography>
                                  </Stack>

                                  <LinearProgress
                                    variant="determinate"
                                    value={percentage}
                                    sx={{
                                      height: 10,
                                      borderRadius: 5,
                                      bgcolor: (theme) =>
                                        theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)",
                                      "& .MuiLinearProgress-bar": {
                                        borderRadius: 5,
                                        bgcolor: color,
                                      },
                                    }}
                                  />
                                </Box>
                              );
                            })}
                          </Stack>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Frequent emotions */}
                <Grid item xs={12} md={6} sx={{ display: "flex", minWidth: 0 }}>
                  <Card elevation={0} sx={cardBaseSx}>
                    <CardContent sx={cardContentSx}>
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            flexShrink: 0,
                            borderRadius: "14px",
                            bgcolor: "rgba(200, 137, 157, 0.12)",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "1.25rem",
                          }}
                        >
                          💗
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: "-0.01em" }}>
                            Frequent emotions
                          </Typography>
                          <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            Feelings identified in your entries
                          </Typography>
                        </Box>
                      </Stack>

                      {emotionEntries.length === 0 ? (
                        <Box sx={{ py: 4, flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Typography variant="body2" color="text.secondary">
                            Your emotion insights will appear here as your journals are analyzed.
                          </Typography>
                        </Box>
                      ) : (
                        <Grid container spacing={1.5} sx={{ mt: 1 }} alignItems="stretch">
                          {emotionEntries.map(([emotion, count], index) => (
                            <Grid item xs={6} sm={4} key={emotion} sx={{ display: "flex" }}>
                              <Box
                                sx={{
                                  width: "100%",
                                  p: 2,
                                  borderRadius: 4,
                                  bgcolor: (theme) =>
                                    theme.palette.mode === "light"
                                      ? emotionColors[index % emotionColors.length]
                                      : "rgba(255, 255, 255, 0.03)",
                                  border: "1px solid",
                                  borderColor: (theme) =>
                                    theme.palette.mode === "light"
                                      ? "rgba(0,0,0,0.03)"
                                      : "rgba(255,255,255,0.05)",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  transition: "transform 0.2s ease",
                                  "&:hover": {
                                    transform: "translateY(-3px)",
                                  },
                                }}
                              >
                                <Typography variant="body2" fontWeight={750} sx={{ textTransform: "capitalize" }}>
                                  {emotion.replace(/_/g, " ").toLowerCase()}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mt: 1 }}>
                                  {count} {count === 1 ? "entry" : "entries"}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}



          {/* Closing Note */}
          <Card
            elevation={0}
            sx={{
              ...cardBaseSx,
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.6)"
                  : "rgba(22, 20, 30, 0.4)",
              textAlign: "center",
              py: 2,
            }}
          >
            <CardContent sx={cardContentSx}>
              <Typography sx={{ fontSize: "1.8rem", mb: 1 }}>🌸</Typography>
              <Typography fontWeight={800} variant="subtitle1" sx={{ mb: 0.75 }}>
                Progress, not perfection.
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  maxWidth: 600,
                  mx: "auto",
                  lineHeight: 1.8,
                }}
              >
                Mood and emotion insights are AI-generated estimates based on
                your writing, not diagnoses. Your journal is a space to reflect
                honestly and grow at your own pace.
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}