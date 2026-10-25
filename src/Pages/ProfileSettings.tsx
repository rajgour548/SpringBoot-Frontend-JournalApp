
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import {
  TextField,
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

import {
  PersonRounded,
  SaveRounded,
  ArrowBackRounded,
  LockRounded,
  CheckCircleRounded,
  ErrorOutlineRounded,
} from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";

function ProfileSettings() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    actualName: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put("/user", formData);
      setMessage("Profile updated successfully!");

      setRedirecting(true);

      setTimeout(() => navigate("/home"), 1000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/home");
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
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#8D7AB8",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#8D7AB8",
    },
  };

  const glassPaperSx = {
    width: 400,
    maxWidth: "100%",
    boxSizing: "border-box",
    p: { xs: 3, sm: 4 },
    borderRadius: 5,
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
        ? "0 10px 30px -5px rgba(50, 40, 80, 0.07)"
        : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
  };

  // Redirecting screen
  if (redirecting) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          bgcolor: "background.default",
          px: 2,
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: (theme: any) =>
              theme.palette.mode === "light"
                ? "radial-gradient(circle, rgba(234, 226, 247, 0.65) 0%, rgba(255,255,255,0) 70%)"
                : "radial-gradient(circle, rgba(141, 122, 184, 0.12) 0%, rgba(0,0,0,0) 70%)",
            pointerEvents: "none",
          }}
        />

        <Paper
          sx={{
            ...glassPaperSx,
            width: 440,
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              mx: "auto",
              mb: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              bgcolor: "rgba(234, 226, 247, 0.75)",
              color: "#8D7AB8",
            }}
          >
            <SaveRounded sx={{ fontSize: 32 }} />
          </Box>

          <CircularProgress
            size={34}
            thickness={4}
            sx={{ color: "#8D7AB8", mb: 2 }}
          />

          <Typography
            variant="h6"
            fontWeight={800}
            sx={{ letterSpacing: "-0.025em" }}
          >
            Saving your changes
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, lineHeight: 1.8 }}
          >
            Redirecting you back to Home...
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
        px: 2,
        py: { xs: 4, sm: 5 },
      }}
    >
      {/* Ambient lavender background */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "-12%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: (theme: any) =>
            theme.palette.mode === "light"
              ? "radial-gradient(circle, rgba(234, 226, 247, 0.65) 0%, rgba(255,255,255,0) 70%)"
              : "radial-gradient(circle, rgba(141, 122, 184, 0.12) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <Paper
        sx={{
          ...glassPaperSx,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              width: 54,
              height: 54,
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
            }}
          >
            <PersonRounded sx={{ fontSize: 30 }} />
          </Box>

          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              letterSpacing: "-0.035em",
              mb: 1,
            }}
          >
            Update Profile
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            Keep your profile details up to date.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Full Name"
              name="actualName"
              value={formData.actualName}
              onChange={handleChange}
              autoComplete="name"
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <PersonRounded
                      sx={{
                        color: "#8D7AB8",
                        mr: 1,
                        fontSize: 21,
                      }}
                    />
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="New Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <LockRounded
                      sx={{
                        color: "#8D7AB8",
                        mr: 1,
                        fontSize: 21,
                      }}
                    />
                  ),
                },
              }}
            />

            <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                loading={loading}
                startIcon={<SaveRounded />}
                sx={{
                  borderRadius: 3,
                  py: 1.25,
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "0 8px 20px rgba(141, 122, 184, 0.2)",
                  "&:hover": {
                    boxShadow: "0 10px 24px rgba(141, 122, 184, 0.3)",
                  },
                }}
              >
                Save Changes
              </LoadingButton>

              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleCancel}
                disabled={loading}
                startIcon={<ArrowBackRounded />}
                sx={{
                  borderRadius: 3,
                  py: 1.25,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>

        {message && (
          <Box
            role="status"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              mt: 2.5,
              p: 1.5,
              borderRadius: 3,
              bgcolor: message.includes("successfully")
                ? "rgba(103, 153, 139, 0.12)"
                : "rgba(200, 100, 110, 0.10)",
              color: message.includes("successfully")
                ? "#67998B"
                : "#C05D6B",
            }}
          >
            {message.includes("successfully") ? (
              <CheckCircleRounded sx={{ fontSize: 20, mt: 0.15 }} />
            ) : (
              <ErrorOutlineRounded sx={{ fontSize: 20, mt: 0.15 }} />
            )}

            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              {message}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default ProfileSettings;
