import { useEffect, useState } from "react";
import {
  getJournals,
  createJournal,
  updateJournal,
  deleteJournal,
  type JournalEntry,
  type Sentiment,
} from "../Services/JournalService";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Divider,
  Stack,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { GridLegacy as Grid } from "@mui/material";

export default function JournalPage() {
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [editing, setEditing] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sentiment, setSentiment] = useState<Sentiment>("NEUTRAL");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error"
  >("success");

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);

  const showMessage = (
    message: string,
    severity: "success" | "error" = "success"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const loadJournals = async () => {
    try {
      const data = await getJournals();
      setJournals(data);
    } catch (err) {
      console.error("Error loading journals", err);
      showMessage("No journals found", "error");
    }
  };

  useEffect(() => {
    loadJournals();
  }, []);

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    try {
      if (editing) {
        await updateJournal(editing.id, { title, content, sentiment });
        showMessage("Journal updated successfully!");
        setEditing(null);
      } else {
        await createJournal({ title, content, sentiment });
        showMessage("Journal added successfully!");
      }
      setTitle("");
      setContent("");
      setSentiment("NEUTRAL");
      loadJournals();
    } catch (err) {
      console.error(err);
      showMessage("Action failed!", "error");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditing(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setSentiment(entry.sentiment);
  };

  const handleDelete = async (id: string) => {
    setLoadingDeleteId(id);
    try {
      await deleteJournal(id);
      setJournals((prev) => prev.filter((j) => j.id !== id));
      showMessage("Journal deleted successfully!");
    } catch (err) {
      console.error(err);
      showMessage("Failed to delete journal", "error");
    } finally {
      setLoadingDeleteId(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        📓 My Journal
      </Typography>

      <Grid container spacing={4}>
        {/* Left side: Journal Form */}
        <Grid item xs={12} md={5}>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 3,
              borderRadius: 3,
              boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
              bgcolor: "background.paper",
              position: { md: "sticky" },
              top: { md: "80px" },
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {editing ? "✏️ Edit Journal" : "➕ Add New Journal"}
            </Typography>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <FormControl fullWidth>
              <InputLabel id="sentiment-label">Sentiment</InputLabel>
              <Select
                labelId="sentiment-label"
                value={sentiment}
                label="Sentiment"
                onChange={(e) => setSentiment(e.target.value as Sentiment)}
                required
              >
                <MenuItem value="POSITIVE">Positive</MenuItem>
                <MenuItem value="NEUTRAL">Neutral</MenuItem>
                <MenuItem value="NEGATIVE">Negative</MenuItem>
              </Select>
            </FormControl>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={loadingSubmit}
              sx={{ borderRadius: 2, py: 1.2 }}
            >
              {editing ? "Update Entry" : "Add Entry"}
            </LoadingButton>
              {editing && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setEditing(null);
            setTitle("");
            setContent("");
            setSentiment("NEUTRAL");
          }}
          sx={{ borderRadius: 2, py: 1.2, flex: 1 }}
        >
          Cancel
        </Button>
      )}
          </Box>
        </Grid>

        {/* Right side: Journal Entries */}
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              maxHeight: "80vh",
              overflowY: "auto",
              pl: 1,
              "&::-webkit-scrollbar": { width: "8px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#bbb",
                borderRadius: "4px",
              },
            }}
          >
            {journals.map((entry) => (
              <Card
                key={entry.id}
                sx={{
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: "0px 4px 16px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      textAlign="center"
                      sx={{ flexGrow: 1 }}
                    >
                      {entry.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 2 }}
                    >
                      {new Date(entry.date).toLocaleDateString()}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: "#555", mt: 1, mb: 2 }}
                  >
                    {entry.content}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color:
                        entry.sentiment === "POSITIVE"
                          ? "success.main"
                          : entry.sentiment === "NEGATIVE"
                          ? "error.main"
                          : "text.secondary",
                    }}
                  >
                    Sentiment: {entry.sentiment}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEdit(entry)}
                  >
                    Edit
                  </Button>
                  <LoadingButton
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    loading={loadingDeleteId === entry.id}
                    onClick={() => handleDelete(entry.id)}
                  >
                    Delete
                  </LoadingButton>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
