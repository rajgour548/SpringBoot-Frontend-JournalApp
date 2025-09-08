import { Card, CardContent, Typography, Box, Stack } from "@mui/material";

interface WeatherInfoProps {
  greeting: string;
  weatherDescriptions: string[];
  feelsLike: number;
}

function WeatherInfo({ greeting, weatherDescriptions, feelsLike }: WeatherInfoProps) {
  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        p: 2,
        maxWidth: 500,
        mx: "auto",
        textAlign: "center",
        background: "linear-gradient(135deg, #42a5f5, #1976d2)",
        color: "white",
      }}
    >
      <CardContent>
        {/* Greeting with icon */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontWeight="bold">
            {greeting}
          </Typography>
          <span role="img" aria-label="sun" style={{ fontSize: "1.8rem" }}>
            🌞
          </span>
        </Stack>

        {/* Weather details */}
        <Box>
          <Typography variant="body1" mb={1}>
            <strong>Weather:</strong> {weatherDescriptions.join(", ")}
          </Typography>
          <Typography variant="body1">
            <strong>Feels Like:</strong> {feelsLike}°C
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WeatherInfo;
