
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  PersonRounded,
  BadgeRounded,
  EmailRounded,
  LockRounded,
  PersonAddAlt1Rounded,
  AutoAwesomeRounded,
  LoginRounded,
} from "@mui/icons-material";
import { signupApi } from "../Services/AuthService";
import GoogleAuthPage from "../Pages/GoogleAuthPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    actualName: "",
    email: "",
    password: "",
    sentimentAnalysis: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Validation ---
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Enter a valid email address",
      }));
    }

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Use 8+ characters with uppercase, lowercase, a number and a special character.",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !form.actualName.trim() ||
      !form.userName.trim() ||
      !validateEmail(form.email) ||
      !validatePassword(form.password)
    ) {
      if (!validateEmail(form.email)) {
        setErrors((prev) => ({
          ...prev,
          email: "Enter a valid email address",
        }));
      }

      if (!validatePassword(form.password)) {
        setErrors((prev) => ({
          ...prev,
          password:
            "Use 8+ characters with uppercase, lowercase, a number and a special character.",
        }));
      }

      toast.error("Please check your details and fix the errors.", {
        icon: <FaExclamationCircle />,
        closeButton: false,
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: false,
        style: { fontWeight: "bold" },
      });

      return;
    }

    setLoading(true);

    try {
      await signupApi(form);

      toast.success("Signup successful!", {
        icon: <FaCheckCircle />,
        closeButton: false,
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: false,
        style: { fontWeight: "bold" },
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Please try again.";

      toast.error(`Signup failed. The user may already exist. ${message}`, {
        icon: <FaExclamationCircle />,
        closeButton: false,
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: false,
        style: { fontWeight: "bold" },
      });
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
    "& .MuiFormHelperText-root": {
      mx: 0.5,
    },
  };

  const adornmentSx = {
    color: "#8D7AB8",
    mr: 0.5,
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: { xs: 3, sm: 5 },
        bgcolor: "background.default",
      }}
    >
      {/* Ambient pastel background */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          width: { xs: 280, sm: 430 },
          height: { xs: 280, sm: 430 },
          top: "-100px",
          left: "-100px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(234, 226, 247, 0.7) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          width: { xs: 300, sm: 450 },
          height: { xs: 300, sm: 450 },
          bottom: "-120px",
          right: "-100px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(248, 225, 235, 0.6) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <Paper
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 470,
          p: { xs: 3, sm: 4.5 },
          borderRadius: { xs: "22px", sm: "28px" },
          bgcolor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.85)"
              : "rgba(22, 20, 30, 0.75)",
          backdropFilter: "blur(16px)",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(0, 0, 0, 0.05)"
              : "rgba(255, 255, 255, 0.08)",
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 10px 30px -5px rgba(50, 40, 80, 0.08)"
              : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
        }}
      >
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
              <PersonAddAlt1Rounded sx={{ fontSize: 30 }} />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.8px",
                fontSize: { xs: "1.7rem", sm: "2rem" },
                color: "text.primary",
              }}
            >
              Create Account
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: "text.secondary",
                lineHeight: 1.7,
              }}
            >
              Join us and start your journaling journey
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
                YOUR SPACE TO REFLECT
              </Typography>
            </Stack>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Full name"
                name="actualName"
                value={form.actualName}
                onChange={handleChange}
                required
                autoComplete="name"
                sx={fieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRounded sx={adornmentSx} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="User ID"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                required
                autoComplete="username"
                sx={fieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeRounded sx={adornmentSx} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="Email address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email}
                sx={fieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRounded sx={adornmentSx} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                error={!!errors.password}
                helperText={
                  errors.password ||
                  "At least 8 characters, including uppercase, lowercase, number and special character."
                }
                sx={fieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRounded sx={adornmentSx} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                startIcon={!loading && <PersonAddAlt1Rounded />}
                sx={{
                  mt: 1,
                  py: 1.4,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 750,
                  color: "#fff",
                  bgcolor: "#8D7AB8",
                  boxShadow: "0 7px 18px rgba(141, 122, 184, 0.25)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#7965A5",
                    boxShadow: "0 9px 22px rgba(141, 122, 184, 0.32)",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "rgba(141, 122, 184, 0.55)",
                    color: "#fff",
                  },
                }}
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 0.5,
                }}
              >
                <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  OR CONTINUE WITH
                </Typography>
                <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
              </Box>

              <GoogleAuthPage />

              <Typography
                variant="body2"
                textAlign="center"
                sx={{ pt: 0.5, color: "text.secondary" }}
              >
                Already have an account?{" "}
                <Link
                  component="button"
                  type="button"
                  underline="hover"
                  onClick={() => navigate("/login")}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.4,
                    verticalAlign: "middle",
                    fontWeight: 750,
                    color: "#8D7AB8",
                    "&:hover": { color: "#7965A5" },
                  }}
                >
                  <LoginRounded sx={{ fontSize: 16 }} />
                  Login
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Paper>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="light"
      />
    </Box>
  );
}

export default Signup;