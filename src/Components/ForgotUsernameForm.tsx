
import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  EmailRounded,
  PersonSearchRounded,
  ArrowBackRounded,
  AutoAwesomeRounded,
} from "@mui/icons-material";
import { recoverUsername } from "../Services/AuthService";

interface ForgotUsernameFormProps {
  onBack: () => void;
}

const ForgotUsernameForm: React.FC<ForgotUsernameFormProps> = ({
  onBack,
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const result = await recoverUsername(email.trim());
      setMessage(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to process your request."
      );
    } finally {
      setLoading(false);
    }
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      transition: "all 0.2s ease",
      "& fieldset": {
        borderColor: "rgba(141, 122, 184, 0.25)",
      },
      "&:hover fieldset": {
        borderColor: "#8D7AB8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#8D7AB8",
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#8D7AB8",
    },
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2.5}>
        {/* Heading */}
        <Box textAlign="center">
          <Box
            sx={{
              width: 58,
              height: 58,
              mx: "auto",
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "19px",
              color: "#8D7AB8",
              bgcolor: "rgba(141, 122, 184, 0.12)",
              border: "1px solid rgba(141, 122, 184, 0.16)",
            }}
          >
            <PersonSearchRounded sx={{ fontSize: 30 }} />
          </Box>

          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.5px",
              color: "text.primary",
            }}
          >
            Forgot Username?
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "text.secondary",
              lineHeight: 1.8,
            }}
          >
            No worries! Enter the email address associated with your account
            to recover your username.
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={0.75}
            sx={{ mt: 1.5 }}
          >
            <AutoAwesomeRounded
              sx={{ fontSize: 16, color: "#C8899D" }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "#8D7AB8",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              LET'S GET YOU BACK
            </Typography>
          </Stack>
        </Box>

        {/* Feedback */}
        {message && (
          <Alert
            severity="success"
            sx={{
              borderRadius: "12px",
              alignItems: "center",
              overflowWrap: "anywhere",
            }}
          >
            {message}
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{
              borderRadius: "12px",
              alignItems: "center",
              overflowWrap: "anywhere",
            }}
          >
            {error}
          </Alert>
        )}

        {/* Email field */}
        <TextField
          fullWidth
          required
          type="email"
          label="Registered Email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setMessage("");
            setError("");
          }}
          disabled={loading}
          sx={fieldSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRounded
                    sx={{ color: "#8D7AB8", mr: 0.5 }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Recover button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading || !email.trim()}
          startIcon={!loading && <PersonSearchRounded />}
          sx={{
            py: 1.35,
            borderRadius: "14px",
            textTransform: "none",
            fontSize: "0.98rem",
            fontWeight: 750,
            bgcolor: "#8D7AB8",
            color: "#fff",
            boxShadow: "0 7px 18px rgba(141, 122, 184, 0.25)",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "#7965A5",
              boxShadow: "0 9px 22px rgba(141, 122, 184, 0.32)",
            },
            "&.Mui-disabled": {
              bgcolor: "rgba(141, 122, 184, 0.45)",
              color: "#fff",
            },
          }}
        >
          {loading ? "Please wait..." : "Recover Username"}
        </Button>

        {/* Back to login */}
        <Button
          fullWidth
          type="button"
          variant="text"
          onClick={onBack}
          disabled={loading}
          startIcon={<ArrowBackRounded />}
          sx={{
            py: 1,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            color: "#8D7AB8",
            "&:hover": {
              bgcolor: "rgba(141, 122, 184, 0.08)",
            },
          }}
        >
          Back to Login
        </Button>
      </Stack>
    </Box>
  );
};

export default ForgotUsernameForm;