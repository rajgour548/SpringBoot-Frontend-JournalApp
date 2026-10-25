
import { useEffect, useState } from "react";
import {
  getJournals,
  createJournal,
  updateJournal,
  deleteJournal,
  type JournalEntry,
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
  Snackbar,
  Alert,
  Divider,
  Stack,
} from "@mui/material";

import {
  Edit,
  Delete,
  MenuBookRounded,
  AddRounded,
  AutoStoriesRounded,
} from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import { GridLegacy as Grid } from "@mui/material";

export default function JournalPage() {
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [editing, setEditing] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
        await updateJournal(editing.id, { title, content });
        showMessage("Journal updated successfully!");
        setEditing(null);
      } else {
        await createJournal({ title, content });
        showMessage("Journal added successfully!");
      }

      setTitle("");
      setContent("");
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

  const glassCardSx = {
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
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      bgcolor: (theme: any) =>
        theme.palette.mode === "light"
          ? "rgba(255, 255, 255, 0.65)"
          : "rgba(255, 255, 255, 0.025)",
      transition: "background-color 180ms ease",
      "&:hover": {
        bgcolor: (theme: any) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.045)",
      },
      "&.Mui-focused": {
        bgcolor: "background.paper",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#8D7AB8",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#8D7AB8",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, sm: 4 },
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient lavender background */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: -150,
          right: "5%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background: (theme: any) =>
            theme.palette.mode === "light"
              ? "radial-gradient(circle, rgba(234, 226, 247, 0.6) 0%, rgba(255,255,255,0) 70%)"
              : "radial-gradient(circle, rgba(141, 122, 184, 0.10) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Page heading */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.25,
              mb: 1,
            }}
          >
            <MenuBookRounded
              sx={{
                fontSize: 34,
                color: "#8D7AB8",
              }}
            />

            <Typography
              component="h1"
              variant="h4"
              fontWeight={800}
              sx={{
                letterSpacing: "-0.04em",
                fontSize: { xs: "1.9rem", sm: "2.4rem" },
              }}
            >
              My Journal
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              lineHeight: 1.8,
              letterSpacing: "0.01em",
            }}
          >
            A little space to reflect, remember, and grow.
          </Typography>
        </Box>

        {/* Original two-column layout preserved */}
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
                gap: 2.5,
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: 5,
                ...glassCardSx,
                position: { md: "sticky" },
                top: { md: "80px" },
              }}
            >
              <Box sx={{ mb: 0.5 }}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 3,
                      bgcolor: (theme: any) =>
                        theme.palette.mode === "light"
                          ? "rgba(234, 226, 247, 0.75)"
                          : "rgba(141, 122, 184, 0.18)",
                      color: "#8D7AB8",
                    }}
                  >
                    {editing ? (
                      <Edit sx={{ fontSize: 22 }} />
                    ) : (
                      <AddRounded sx={{ fontSize: 25 }} />
                    )}
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={800}
                      sx={{ letterSpacing: "-0.025em" }}
                    >
                      {editing ? "Edit Journal" : "Add New Journal"}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.25, lineHeight: 1.7 }}
                    >
                      Let your thoughts find a place to settle.
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={fieldSx}
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
                sx={fieldSx}
              />

              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                loading={loadingSubmit}
                sx={{
                  borderRadius: 3,
                  py: 1.3,
                  fontWeight: 700,
                  textTransform: "none",
                  letterSpacing: "0.01em",
                  boxShadow: "0 8px 20px rgba(141, 122, 184, 0.2)",
                  "&:hover": {
                    boxShadow: "0 10px 24px rgba(141, 122, 184, 0.3)",
                  },
                }}
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
                  }}
                  sx={{
                    borderRadius: 3,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
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
                pr: 1,
                pb: 1,
                "&::-webkit-scrollbar": { width: "8px" },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(141, 122, 184, 0.35)",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "rgba(141, 122, 184, 0.6)",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {journals.map((entry) => (
                <Card
                  key={entry.id}
                  sx={{
                    mb: 3,
                    borderRadius: 4,
                    ...glassCardSx,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: (theme: any) =>
                        theme.palette.mode === "light"
                          ? "0 16px 32px -8px rgba(80, 60, 120, 0.12)"
                          : "0 16px 32px -8px rgba(0, 0, 0, 0.4)",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={750}
                        sx={{
                          flexGrow: 1,
                          minWidth: 0,
                          overflowWrap: "anywhere",
                          letterSpacing: "-0.025em",
                          lineHeight: 1.45,
                        }}
                      >
                        {entry.title}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          ml: 1,
                          flexShrink: 0,
                          pt: 0.5,
                          whiteSpace: "nowrap",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {new Date(entry.date).toLocaleDateString()}
                      </Typography>
                    </Stack>

                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{
                        color: "text.secondary",
                        mt: 2,
                        mb: 2,
                        lineHeight: 1.85,
                        letterSpacing: "0.005em",
                        whiteSpace: "pre-wrap",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {entry.content}
                    </Typography>

                    <Divider
                      sx={{
                        my: 1,
                        borderColor: "divider",
                      }}
                    />
                  </CardContent>

                  <CardActions
                    sx={{
                      justifyContent: "flex-end",
                      px: 2.5,
                      pb: 2,
                      pt: 0,
                    }}
                  >
                    <Button
                      size="small"
                      startIcon={<Edit sx={{ fontSize: 18 }} />}
                      onClick={() => handleEdit(entry)}
                      sx={{
                        borderRadius: 2.5,
                        textTransform: "none",
                        fontWeight: 700,
                        letterSpacing: "0.01em",
                      }}
                    >
                      Edit
                    </Button>

                    <LoadingButton
                      size="small"
                      color="error"
                      startIcon={<Delete sx={{ fontSize: 18 }} />}
                      loading={loadingDeleteId === entry.id}
                      onClick={() => handleDelete(entry.id)}
                      sx={{
                        borderRadius: 2.5,
                        textTransform: "none",
                        fontWeight: 700,
                        letterSpacing: "0.01em",
                      }}
                    >
                      Delete
                    </LoadingButton>
                  </CardActions>
                </Card>
              ))}

              {journals.length === 0 && (
                <Box
                  sx={{
                    ...glassCardSx,
                    borderRadius: 4,
                    p: 4,
                    textAlign: "center",
                  }}
                >
                  <AutoStoriesRounded
                    sx={{
                      fontSize: 38,
                      color: "#8D7AB8",
                      mb: 1,
                    }}
                  />

                  <Typography fontWeight={750} sx={{ letterSpacing: "-0.02em" }}>
                    Your journal starts here
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, lineHeight: 1.8 }}
                  >
                    Add your first entry using the form, and it will appear here.
                  </Typography>
                </Box>
              )}
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
            sx={{
              width: "100%",
              borderRadius: 3,
              boxShadow: "0 8px 28px rgba(40, 30, 60, 0.12)",
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
