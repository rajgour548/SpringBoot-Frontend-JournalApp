// src/components/GoogleLoginButton.tsx
import React from "react";
import {Box, Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { buildGoogleAuthUrl, openGooglePopup } from "../Services/googleAuthService";

const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    const googleUrl = buildGoogleAuthUrl();
    openGooglePopup(googleUrl);
  };

    return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <Button
        onClick={handleLogin}
        startIcon={<FcGoogle size={24} />}
        variant="outlined"
        fullWidth
        sx={{
          py: { xs: 1, sm: 1.3 },
          fontSize: { xs: "0.85rem", sm: "1rem" },
          borderRadius: 2,
          fontWeight: "bold",
          textTransform: "none",
          bgcolor: "#fff",
          color: "#000",
          borderColor: "#ddd",
          "&:hover": {
            bgcolor: "#f7f7f7",
            borderColor: "#ccc",
          },
        }}
      >
        Continue with Google
      </Button>
    </Box>
  );

};

export default GoogleLoginButton;
