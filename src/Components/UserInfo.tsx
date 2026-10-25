
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
  Box,
  ListItemIcon,
} from "@mui/material";

import {
  SettingsRounded,
  LogoutRounded,
} from "@mui/icons-material";

interface UserInfoProps {
  actualName: string;
  email: string;
}

function UserInfo({ actualName, email }: UserInfoProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
    handleClose();
  };

  const initial = actualName.trim().charAt(0).toUpperCase() || "?";

  return (
    <Box>
      {/* Avatar button */}
      <IconButton
        onClick={handleClick}
        aria-label="Open profile menu"
        aria-controls={open ? "user-profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          p: 0.5,
          border: "2px solid",
          borderColor: open ? "#8D7AB8" : "transparent",
          transition: "border-color 180ms ease",
          "&:hover": {
            bgcolor: "rgba(141, 122, 184, 0.10)",
          },
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            fontWeight: 800,
            fontSize: "1rem",
            color: "#FFFFFF",
            background: "linear-gradient(135deg, #A995D0 0%, #8D7AB8 100%)",
            boxShadow: "0 4px 12px rgba(141, 122, 184, 0.22)",
          }}
        >
          {initial}
        </Avatar>
      </IconButton>

      {/* Dropdown menu */}
      <Menu
        id="user-profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1.5,
              minWidth: 260,
              maxWidth: "calc(100vw - 32px)",
              overflow: "hidden",
              borderRadius: 4,
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.92)"
                  : "rgba(22, 20, 30, 0.94)",
              backdropFilter: "blur(18px)",
              border: "1px solid",
              borderColor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0.06)"
                  : "rgba(255, 255, 255, 0.09)",
              boxShadow: (theme) =>
                theme.palette.mode === "light"
                  ? "0 14px 38px rgba(50, 40, 80, 0.12)"
                  : "0 14px 38px rgba(0, 0, 0, 0.35)",
              backgroundImage: "none",
            },
          },
        }}
      >
        {/* User info header */}
        <Box
          sx={{
            px: 2,
            py: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              width: 44,
              height: 44,
              fontWeight: 800,
              color: "#FFFFFF",
              bgcolor: "#8D7AB8",
            }}
          >
            {initial}
          </Avatar>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              fontWeight={800}
              sx={{
                letterSpacing: "-0.02em",
                overflowWrap: "anywhere",
              }}
            >
              {actualName}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.25,
                fontSize: "0.78rem",
                overflowWrap: "anywhere",
              }}
            >
              {email}
            </Typography>
          </Box>
        </Box>

        <Divider
          sx={{
            borderColor: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(0, 0, 0, 0.06)"
                : "rgba(255, 255, 255, 0.08)",
          }}
        />

        {/* Profile settings */}
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/home/profile-settings");
          }}
          sx={{
            mx: 1,
            mt: 1,
            py: 1.25,
            borderRadius: 2.5,
            fontWeight: 600,
            transition: "background-color 160ms ease",
            "&:hover": {
              bgcolor: "rgba(141, 122, 184, 0.12)",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 38 }}>
            <SettingsRounded sx={{ color: "#8D7AB8" }} />
          </ListItemIcon>
          Profile Settings
        </MenuItem>

        {/* Logout */}
        <MenuItem
          onClick={handleLogout}
          sx={{
            mx: 1,
            mb: 1,
            py: 1.25,
            borderRadius: 2.5,
            fontWeight: 600,
            color: "#C05D6B",
            transition: "background-color 160ms ease",
            "&:hover": {
              bgcolor: "rgba(192, 93, 107, 0.10)",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 38 }}>
            <LogoutRounded sx={{ color: "#C05D6B" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserInfo;
