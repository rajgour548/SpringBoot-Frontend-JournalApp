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
} from "@mui/material";

interface UserInfoProps {
  actualName: string;
  userName: string;
  email: string;
}

function UserInfo({ actualName,userName, email }: UserInfoProps) {
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

  return (
    <Box>
      {/* Avatar button */}
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          {actualName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: 2,
          },
        }}
      >
        {/* User info header */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography fontWeight="bold">{actualName}</Typography>
          <Typography variant="body2" color="text.secondary">
            Email : {email}
          </Typography>
           <Typography variant="body2" color="text.secondary">
            User Id : {userName}
          </Typography>
        </Box>

        <Divider />

        {/* Actions */}
        <MenuItem  onClick={() => {
    handleClose();
    navigate("/home/profile-settings");
  }}>Profile Settings</MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserInfo;
