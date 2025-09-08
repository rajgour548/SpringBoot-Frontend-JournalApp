// src/pages/ProfileSettings.tsx
import { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import api from "../Services/api"; // your axios instance
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/user", formData); // backend endpoint
      setMessage("Profile updated successfully ✅");

      // show redirecting screen
      setRedirecting(true);

      setTimeout(() => navigate("/home"), 1000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  // Show redirecting screen
  if (redirecting) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
        <Typography variant="h6" mt={2}>
         Saving changes and Redirecting to Home...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Paper sx={{ p: 4, width: 400, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h5" gutterBottom>
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="actualName"
            value={formData.actualName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              loading={loading}
            >
              Save Changes
            </LoadingButton>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </Stack>
        </form>

        {message && (
          <Typography mt={2} color="secondary">
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default ProfileSettings;
