
import React from "react";
import { Box, Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import {
  buildGoogleAuthUrl,
  openGooglePopup,
} from "../Services/googleAuthService";

const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    const googleUrl = buildGoogleAuthUrl();
    openGooglePopup(googleUrl);
  };

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <Button
        onClick={handleLogin}
        startIcon={<FcGoogle size={22} />}
        variant="outlined"
        fullWidth
        sx={{
          py: { xs: 1.15, sm: 1.35 },
          px: 2,
          fontSize: { xs: "0.9rem", sm: "0.98rem" },
          borderRadius: "14px",
          fontWeight: 700,
          textTransform: "none",
          color: "text.primary",
          bgcolor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(255, 255, 255, 0.04)",
          borderColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(141, 122, 184, 0.25)"
              : "rgba(255, 255, 255, 0.16)",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(234, 226, 247, 0.35)"
                : "rgba(141, 122, 184, 0.12)",
            borderColor: "#8D7AB8",
            boxShadow: "0 5px 16px rgba(141, 122, 184, 0.12)",
          },
          "&:active": {
            transform: "scale(0.99)",
          },
        }}
      >
        Continue with Google
      </Button>
    </Box>
  );
};

export default GoogleLoginButton;