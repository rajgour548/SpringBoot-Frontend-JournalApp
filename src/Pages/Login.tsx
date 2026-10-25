
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Link,
  Paper,
  Stack,
  InputAdornment,
} from "@mui/material";

import {
  LockRounded,
  PersonRounded,
  EmailRounded,
  VerifiedUserRounded,
  VpnKeyRounded,
  LoginRounded,
  ArrowBackRounded,
  AutoAwesomeRounded,
} from "@mui/icons-material";

import {
  loginUser,
  sendVerificationCode,
  verifyEmail,
  resetPassword,
} from "../Services/AuthService";

import { useNavigate } from "react-router-dom";
import GoogleAuthPage from "./GoogleAuthPage";
import ForgotUsernameForm from "../Components/ForgotUsernameForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [step, setStep] = useState<
    "login" | "email" | "verify" | "reset" | "forgotUsername"
  >("login");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(userName, password);
      localStorage.setItem("jwt", res.jwt);

      toast.success("Login successful!", {
        icon: <FaCheckCircle />,
        closeButton: false,
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        style: {
          fontWeight: "bold",
          color: "#67998B",
          borderRadius: "14px",
        },
      });

      setTimeout(() => navigate("/home"), 1500);
    } catch (err: any) {
      toast.error("Login failed : Invalid username or password. Please try again.", {
        icon: <FaExclamationCircle />,
        closeButton: false,
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        style: {
          fontWeight: "bold",
          color: "#C05D6B",
          borderRadius: "14px",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Forgot password flow
  const handleForgotPassword = () => {
    setError("");
    setEmail(userName || "");
    setStep("email");
  };

  const handleForgotUsername = () => {
    setError("");
    setStep("forgotUsername");
  };

  const handleSendCode = async () => {
    setError("");
    setLoading(true);

    try {
      await sendVerificationCode(email);

      toast.success("Verification code sent to your email!", {
        icon: <FaCheckCircle />,
        closeButton: false,
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        style: {
          fontWeight: "bold",
          color: "#67998B",
          borderRadius: "14px",
        },
      });

      setStep("verify");
    } catch (err: any) {
      toast.error("Failed to send code: " + err.message, {
        icon: <FaExclamationCircle />,
        closeButton: false,
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        style: {
          fontWeight: "bold",
          color: "#C05D6B",
          borderRadius: "14px",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);

    try {
      const token = (await verifyEmail(email, verificationCode)).trim();

      setResetToken(token);
      setStep("reset");

      toast.success("Email verified! Set your new password.", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (err: any) {
      toast.error("Verification failed: " + err.message, {
        position: "top-center",
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");

    if (newPassword.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const message = await resetPassword(resetToken, newPassword);

      toast.success(message, {
        position: "top-center",
        autoClose: 1000,
      });

      setNewPassword("");
      setConfirmPassword("");
      setResetToken("");
      setVerificationCode("");
      setEmail("");
      setStep("login");
    } catch (err: any) {
      toast.error("Password reset failed: " + err.message, {
        position: "top-center",
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setStep("login");
    setVerificationCode("");
    setEmail("");
    setResetToken("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      bgcolor: (theme: any) =>
        theme.palette.mode === "light"
          ? "rgba(255,255,255,0.65)"
          : "rgba(255,255,255,0.025)",
      transition: "background-color 180ms ease",
      "&:hover": {
        bgcolor: (theme: any) =>
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.95)"
            : "rgba(255,255,255,0.045)",
      },
      "&.Mui-focused": {
        bgcolor: "background.paper",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#8D7AB8",
        borderWidth: 1.5,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#8D7AB8",
    },
  };

  const primaryButtonSx = {
    py: 1.35,
    borderRadius: 3,
    fontWeight: 750,
    textTransform: "none" as const,
    fontSize: "0.95rem",
    bgcolor: "#8D7AB8",
    boxShadow: "0 8px 20px rgba(141,122,184,0.22)",
    "&:hover": {
      bgcolor: "#7C68A9",
      boxShadow: "0 10px 24px rgba(141,122,184,0.30)",
    },
    "&.Mui-disabled": {
      bgcolor: "rgba(141,122,184,0.45)",
      color: "#FFFFFF",
    },
  };

  const secondaryButtonSx = {
    py: 1.2,
    borderRadius: 3,
    fontWeight: 700,
    textTransform: "none" as const,
    borderColor: "rgba(141,122,184,0.55)",
    color: "#8D7AB8",
    "&:hover": {
      borderColor: "#8D7AB8",
      bgcolor: "rgba(141,122,184,0.08)",
    },
  };

  const linkSx = {
    color: (theme: any) =>
      theme.palette.mode === "light" ? "#8069AB" : "#C8B9E8",
    fontWeight: 700,
    cursor: "pointer",
    textDecorationColor: "rgba(141,122,184,0.35)",
    "&:hover": {
      color: "#A77DAD",
    },
  };

  const headerContent = {
    login: {
      title: "Welcome back",
      subtitle: "Sign in to revisit your thoughts and reflections.",
      icon: <LoginRounded sx={{ fontSize: 29 }} />,
    },
    email: {
      title: "Forgot password?",
      subtitle: "Enter your email address to receive a verification code.",
      icon: <EmailRounded sx={{ fontSize: 29 }} />,
    },
    verify: {
      title: "Verify your email",
      subtitle: "Enter the verification code sent to your email.",
      icon: <VerifiedUserRounded sx={{ fontSize: 29 }} />,
    },
    reset: {
      title: "Create a new password",
      subtitle: "Choose a strong password with at least 8 characters.",
      icon: <LockRounded sx={{ fontSize: 29 }} />,
    },
    forgotUsername: {
      title: "Recover your username",
      subtitle: "Follow the steps to recover your account details.",
      icon: <PersonRounded sx={{ fontSize: 29 }} />,
    },
  }[step];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
        px: 2,
        py: { xs: 4, sm: 6 },
      }}
    >
      {/* Ambient lavender glow */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "-12%",
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: 360, sm: 600 },
          height: { xs: 360, sm: 600 },
          borderRadius: "50%",
          background: (theme: any) =>
            theme.palette.mode === "light"
              ? "radial-gradient(circle, rgba(234,226,247,0.72) 0%, rgba(255,255,255,0) 70%)"
              : "radial-gradient(circle, rgba(141,122,184,0.16) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: { xs: 260, sm: 420 },
          height: { xs: 260, sm: 420 },
          borderRadius: "50%",
          background: (theme: any) =>
            theme.palette.mode === "light"
              ? "radial-gradient(circle, rgba(200,137,157,0.13) 0%, rgba(255,255,255,0) 70%)"
              : "radial-gradient(circle, rgba(200,137,157,0.08) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main authentication card */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 440,
          boxSizing: "border-box",
          p: { xs: 3, sm: 4.5 },
          borderRadius: 5,
          bgcolor: (theme: any) =>
            theme.palette.mode === "light"
              ? "rgba(255,255,255,0.85)"
              : "rgba(22,20,30,0.78)",
          backdropFilter: "blur(18px)",
          border: "1px solid",
          borderColor: (theme: any) =>
            theme.palette.mode === "light"
              ? "rgba(0,0,0,0.05)"
              : "rgba(255,255,255,0.08)",
          boxShadow: (theme: any) =>
            theme.palette.mode === "light"
              ? "0 18px 50px -12px rgba(50,40,80,0.12)"
              : "0 18px 50px -12px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            sx={{
              width: 62,
              height: 62,
              mx: "auto",
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              bgcolor: (theme: any) =>
                theme.palette.mode === "light"
                  ? "rgba(234,226,247,0.82)"
                  : "rgba(141,122,184,0.18)",
              color: "#8D7AB8",
            }}
          >
            {headerContent.icon}
          </Box>

          <Typography
            variant="h4"
            fontWeight={850}
            sx={{
              fontSize: { xs: "1.65rem", sm: "2rem" },
              letterSpacing: "-0.045em",
              mb: 1,
            }}
          >
            {headerContent.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, maxWidth: 320, mx: "auto" }}
          >
            {headerContent.subtitle}
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
            sx={{
              mb: 2,
              borderRadius: 3,
              bgcolor: "rgba(192,93,107,0.09)",
              alignItems: "center",
            }}
          >
            {error}
          </Alert>
        )}

        {/* Login */}
        {step === "login" && (
          <Stack spacing={2}>
            <TextField
              label="User ID"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="username"
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRounded sx={{ color: "#8D7AB8" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded sx={{ color: "#8D7AB8" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
              startIcon={<LoginRounded />}
              sx={{ ...primaryButtonSx, mt: 0.5 }}
            >
              {loading ? "Logging in..." : "Login"}
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
                color="text.secondary"
                fontWeight={600}
              >
                OR CONTINUE WITH
              </Typography>
              <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
            </Box>

            <GoogleAuthPage />

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              gap={0.8}
              sx={{ pt: 0.5 }}
            >
              <Link
                component="button"
                type="button"
                underline="hover"
                onClick={handleForgotUsername}
                sx={linkSx}
              >
                Forgot Username?
              </Link>

              <Typography color="text.disabled">·</Typography>

              <Link
                component="button"
                type="button"
                underline="hover"
                onClick={handleForgotPassword}
                sx={linkSx}
              >
                Forgot Password?
              </Link>
            </Stack>

            <Box
              sx={{
                mt: 1,
                pt: 2.5,
                borderTop: "1px solid",
                borderColor: "divider",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
                <Link
                  component="button"
                  type="button"
                  underline="hover"
                  onClick={() => navigate("/")}
                  sx={linkSx}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Stack>
        )}

        {/* Forgot username */}
        {step === "forgotUsername" && (
          <ForgotUsernameForm onBack={() => setStep("login")} />
        )}

        {/* Email for password reset */}
        {step === "email" && (
          <Stack spacing={2}>
            <TextField
              label="Email address"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRounded sx={{ color: "#8D7AB8" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSendCode}
              disabled={loading || !email}
              startIcon={<EmailRounded />}
              sx={primaryButtonSx}
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={handleCancel}
              disabled={loading}
              startIcon={<ArrowBackRounded />}
              sx={secondaryButtonSx}
            >
              Back to Login
            </Button>
          </Stack>
        )}

        {/* Verify email */}
        {step === "verify" && (
          <Stack spacing={2}>
            <TextField
              label="Verification code"
              variant="outlined"
              fullWidth
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              autoComplete="one-time-code"
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <VerifiedUserRounded sx={{ color: "#8D7AB8" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleVerify}
              disabled={loading || !verificationCode}
              startIcon={<VerifiedUserRounded />}
              sx={primaryButtonSx}
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={handleSendCode}
              disabled={loading}
              sx={secondaryButtonSx}
            >
              Resend Code
            </Button>

            <Button
              variant="text"
              fullWidth
              onClick={handleCancel}
              disabled={loading}
              startIcon={<ArrowBackRounded />}
              sx={{
                borderRadius: 3,
                color: "text.secondary",
                fontWeight: 650,
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
          </Stack>
        )}

        {/* Reset password */}
        {step === "reset" && (
          <Stack spacing={2}>
            <TextField
              label="New password"
              type="password"
              fullWidth
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded sx={{ color: "#8D7AB8" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Confirm new password"
              type="password"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded sx={{ color: "#8D7AB8" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              onClick={handleResetPassword}
              startIcon={<VpnKeyRounded />}
              sx={primaryButtonSx}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </Button>

            <Button
              fullWidth
              disabled={loading}
              onClick={handleCancel}
              startIcon={<ArrowBackRounded />}
              sx={{
                borderRadius: 3,
                color: "text.secondary",
                fontWeight: 650,
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
          </Stack>
        )}

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.7,
          }}
        >
          <AutoAwesomeRounded sx={{ fontSize: 15, color: "#8D7AB8" }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ letterSpacing: "0.02em" }}
          >
            A little space to reflect and grow
          </Typography>
        </Box>
      </Paper>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        newestOnTop
        theme="light"
      />
    </Box>
  );
};

export default Login;
